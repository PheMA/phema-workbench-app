import { R4 } from "@ahryman40k/ts-fhir-types";

const extractCqlFromLibrary = (
    library: R4.ILibrary
): string => {
    const content = library?.content.find(c => {
        return c.contentType === "text/cql";
    });

    return atob(content.data);
}

export { extractCqlFromLibrary }