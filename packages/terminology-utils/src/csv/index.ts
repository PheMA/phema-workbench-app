import Papa from "papaparse";

import { R4 } from "@ahryman40k/ts-fhir-types";

import { TransformUtils } from "../";

const OMOP_CONCEPT_SET_COLUMNS = [
  "Concept Set ID",
  "Name",
  "Concept ID",
  "Concept Code",
  "Concept Name",
  "Domain",
  "Vocabulary",
  "Standard Concept",
  "Concept Class ID",
  "Exclude",
  "Descendants",
  "Mapped",
];

const REQUIRED_OMOP_CONCEPT_SET_COLUMNS = [
  "Concept Set ID",
  "Name",
  "Concept Code",
  "Concept Name",
  "Vocabulary",
];

interface ValidateOmopConceptSetCsvParameters {
  csv: File | string;
}

const validateOmopConceptSetCsv = async ({
  csv,
}: ValidateOmopConceptSetCsvParameters) => {
  return new Promise((resolve, reject) => {
    const complete = (result, file) => {
      if (result.errors.length > 0) {
        reject(result.errors);
      } else {
        const headers = result.data[0];

        // check for required headers
        REQUIRED_OMOP_CONCEPT_SET_COLUMNS.forEach((header) => {
          if (!headers.includes(header)) {
            reject(`"${header}" header missing`);
          }
        });

        resolve(result.data);
      }
    };

    Papa.parse(csv, { complete, skipEmptyLines: "greedy" });
  });
};

interface OmopCsvToValueSetsParameters {
  csv: File | string;
}

const getOmopValueSetId = (valueSetId: string) => {
  return `omop-concept-set-${valueSetId}`;
};

const omopCsvToValueSets = async ({
  csv,
}: OmopCsvToValueSetsParameters): Promise<R4.IValueSet[]> => {
  return validateOmopConceptSetCsv({ csv }).then((data: any[]) => {
    const conceptIdIdx = data[0].indexOf("Concept Set ID");

    const codeSystems = {};

    // partition data in CSV by concept set id
    for (let i = 1; i < data.length; i++) {
      if (!codeSystems[getOmopValueSetId(data[i][conceptIdIdx])]) {
        codeSystems[getOmopValueSetId(data[i][conceptIdIdx])] = [data[0]];
      } else {
        codeSystems[getOmopValueSetId(data[i][conceptIdIdx])].push(data[i]);
      }
    }

    const valueSets = [];

    Object.keys(codeSystems).forEach((conceptSetId) => {
      valueSets.push(
        TransformUtils.omopConceptSetToFhirValueSet({
          conceptSetId,
          conceptSet: codeSystems[conceptSetId],
        })
      );
    });

    return valueSets;
  });
};

export { validateOmopConceptSetCsv, omopCsvToValueSets };
