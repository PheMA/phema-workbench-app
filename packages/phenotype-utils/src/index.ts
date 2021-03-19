export const emptyPhenotype = () => {
    return {
        resourceType: "Bundle",
        entry: []
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

export const preparePhenotypeComposition = ({ bundle, entryPointId }) => {
    console.log("meh");
}