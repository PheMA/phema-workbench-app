export const buildParametersResource = (params) => {
    let resource = {
        resourceType: "Parameters",
        parameter: [],
    };

    params.forEach((param) => {
        resource.parameter.push({
            name: param.name,
            valueString: param.value,
        });
    });

    return resource;
};