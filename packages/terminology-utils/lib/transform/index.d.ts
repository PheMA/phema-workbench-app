import { R4 } from "@ahryman40k/ts-fhir-types";
import { omopVocabularies } from "./omopVocabularies";
interface OmopConceptSetToFhirValueSetParameters {
    conceptSetId: string;
    conceptSet: any[];
}
declare const omopConceptSetToFhirValueSet: ({ conceptSetId, conceptSet, }: OmopConceptSetToFhirValueSetParameters) => R4.IValueSet;
export { omopConceptSetToFhirValueSet, omopVocabularies };
