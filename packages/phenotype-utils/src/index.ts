import { v4 as uuidv4 } from 'uuid';

export const emptyPhenotype = () => {
    return {
        resourceType: "Bundle",
        entry: []
    }
}

export const emptyComposition = () => {
    return {
        resourceType: "Composition",
        id: uuidv4(),
        status: "preliminary",
        type: {
            coding: [
                {
                    system: "http://ncimeta.nci.nih.gov",
                    code: "C166209"
                }
            ]
        },
        section: []
    }
}

export const extractIdFromLibrary = ({ library }) => {
    const regex = /library\s*"?([a-zA-Z\.\-0-9]+)/;

    // This is imperfect, because the statement could be commented out
    const id = library.match(regex)[1];

    if (!id) {
        throw new Error("No library identifier found")
    }

    return id;
}

export const findPotentialEntryPoints = ({ bundle }) => {
    const entryPoints = [];

    bundle?.entry?.forEach(entry => {
        if (entry?.resource?.resourceType === "Library") {
            const cqlContent = entry?.resource?.content.find(content => content.contentType === "text/cql");
            const cql = atob(cqlContent.data);
            const regex = /define\s*"?case"?/i;

            if (cql.match(regex) !== null) {
                entryPoints.push(entry?.resource?.id)
            }
        }
    });

    return entryPoints;
}

export const preparePhenotypeComposition = ({ bundle, entryPointId }) => {
    const composition = emptyComposition();

    bundle?.entry?.forEach(entry => {
        if (entry?.resource?.id === entryPointId) {
            composition.section.push({
                title: "Phenotype Entry Point",
                text: {
                    div: "The CQL library containing the phenotype 'Case' definition. The referenced Binary resource contains phenotype metadata from PheKB."
                },
                entry: [{
                    reference: `Library/${entryPointId}`
                }]
            })
        } else if (entry?.resource?.resourceType === "Library") {
            composition.section.push({
                title: `Dependent library: ${entry?.resource?.id}`,
                text: {
                    div: "Library that the main phenotype entry point or another dependency depends on"
                },
                entry: [{
                    reference: `Library/${entryPointId}`
                }]
            })
        } else if (entry?.resource?.resourceType === "ValueSet") {
            composition.section.push({
                title: `Dependent value set: ${entry?.resource?.id}`,
                text: {
                    div: "Value set that the main phenotype entry point or one of its dependencies uses"
                },
                entry: [{
                    reference: `Library/${entryPointId}`
                }]
            })
        }
    });

    return composition;
}

export const updateLibrary = ({ bundle, libraryId, cql }) => {
    bundle?.entry?.forEach(entry => {
        if (entry?.resource?.id === libraryId) {
            // Clear all previous content
            entry.resource.content = [];

            // Add the next cql
            entry.resource.content.push({
                "contentType": "text/cql",
                data: btoa(cql)
            })
        }
    });
}

export const setComposition = ({ bundle, composition }) => {
    // First remove any other compositions
    const newEntries = [];

    bundle?.entry?.forEach(entry => {
        if (entry?.resource?.resourceType !== "Composition") {
            newEntries.push(entry);
        }
    })

    if (composition !== null) {
        // Then add the given composition
        newEntries.push({
            resource: composition,
            request: {
                method: "PUT",
                url: `Composition/${composition?.id}`
            }
        });
    }

    bundle.entry = newEntries;
}