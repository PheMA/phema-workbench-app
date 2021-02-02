import { R4 } from "@ahryman40k/ts-fhir-types";
interface ValidateOmopConceptSetCsvParameters {
    csv: File | string;
}
declare const validateOmopConceptSetCsv: ({ csv, }: ValidateOmopConceptSetCsvParameters) => Promise<unknown>;
interface OmopCsvToValueSetsParameters {
    csv: File | string;
}
declare const omopCsvToValueSets: ({ csv, }: OmopCsvToValueSetsParameters) => Promise<R4.IValueSet[]>;
export { validateOmopConceptSetCsv, omopCsvToValueSets };
