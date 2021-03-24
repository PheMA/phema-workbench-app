import { R4 } from "@ahryman40k/ts-fhir-types";
import { v4 as uuidv4 } from 'uuid';

const extractCqlFromLibrary = (
    library: R4.ILibrary
): string => {
    const content = library?.content.find(c => {
        return c.contentType === "text/cql";
    });

    return atob(content.data);
}

const newEmptyLibrary = () => {
    return {
        "resourceType": "Library",
        "id": uuidv4(),
        "version": "1.0.0",
        "content": [{
            "contentType": "text/cql",
            data: btoa(`/**
 * PhEMA Phenotype
 *
 * Name : Unnamed
 * ID   : 
 * Url  : 
 */
library "Unnamed" version '1.0.0'

using FHIR version '4.0.0'

include FHIRHelpers version '4.0.0' called FHIRHelpers

context Patient

define "Test":
    true`)
        }]
    }
}

export { extractCqlFromLibrary, newEmptyLibrary }