import { R4 } from "@ahryman40k/ts-fhir-types";

import slugify from "slugify";

import { omopVocabularies } from "./omopVocabularies";

const PHEMA_WORKBENCH_VALUESET_PREFIX =
  "https://workbench.phema.science/fhir/ValueSet";
const PHEMA_WORKBENCH_CODESYSTEM_PREFIX =
  "https://workbench.phema.science/fhir/CodeSystem";

const getCodeSystemUrl = (vocabularyName: string) => {
  const vocabulary = omopVocabularies.find((vocab) => {
    return vocab.omopVocabularyId == vocabularyName;
  });

  if (!vocabulary) {
    return PHEMA_WORKBENCH_CODESYSTEM_PREFIX + "/omop-unknown-vocabulary";
  } else if (vocabulary.fhirCanonicalUrl) {
    return vocabulary.fhirCanonicalUrl;
  } else {
    return `${PHEMA_WORKBENCH_CODESYSTEM_PREFIX}/${slugify(
      vocabulary.omopVocabularyId
    )}`;
  }
};

interface OmopConceptSetToFhirValueSetParameters {
  conceptSetId: string;
  conceptSet: any[]; // TODO: create this type
}

const omopConceptSetToFhirValueSet = ({
  conceptSetId,
  conceptSet,
}: OmopConceptSetToFhirValueSetParameters): R4.IValueSet => {
  const valueSet: R4.IValueSet = {
    resourceType: "ValueSet",
  };

  const nameIdx = conceptSet[0].indexOf("Name");
  const conceptCodeIdx = conceptSet[0].indexOf("Concept Code");
  const conceptNameIdx = conceptSet[0].indexOf("Concept Name");
  const vocabularyIdx = conceptSet[0].indexOf("Vocabulary");

  // if we are dealing with the conceptSetExpression CSV file, we need to
  // add explicit excludes
  const excludeIdx = conceptSet[0].indexOf("Exclude");

  valueSet.id = conceptSetId; // this will like get ignored
  valueSet.url = `${PHEMA_WORKBENCH_VALUESET_PREFIX}/${conceptSetId}`;
  valueSet.status = R4.ValueSetStatusKind._active;

  valueSet.name = conceptSet[1][nameIdx];
  valueSet.publisher = "PhEMA Workbench OMOP Concept Set Transformer";

  const codeLists = {};
  const excludedLists = {};

  for (let i = 1; i < conceptSet.length; i++) {
    let conceptSetEntry = conceptSet[i];

    const codeableConcept = {
      code: conceptSetEntry[conceptCodeIdx],
      display: conceptSetEntry[conceptNameIdx],
    };

    const codeSystemUrl = getCodeSystemUrl(conceptSetEntry[vocabularyIdx]);

    if (excludeIdx != -1 && conceptSetEntry[excludeIdx] === "true") {
      // exclude concept
      if (!excludedLists[codeSystemUrl]) {
        excludedLists[codeSystemUrl] = [codeableConcept];
      } else {
        excludedLists[codeSystemUrl].push(codeableConcept);
      }
    } else {
      // include concept
      if (!codeLists[codeSystemUrl]) {
        codeLists[codeSystemUrl] = [codeableConcept];
      } else {
        codeLists[codeSystemUrl].push(codeableConcept);
      }
    }
  }

  valueSet.compose = { include: [] };

  Object.keys(codeLists).forEach((system) => {
    valueSet.compose.include.push({
      system,
      concept: codeLists[system],
    });
  });

  if (Object.keys(excludedLists).length > 0) {
    debugger;

    valueSet.compose.exclude = [];

    Object.keys(excludedLists).forEach((system) => {
      valueSet.compose.exclude.push({
        system,
        concept: codeLists[system],
      });
    });
  }

  return valueSet;
};

export { omopConceptSetToFhirValueSet, omopVocabularies };
