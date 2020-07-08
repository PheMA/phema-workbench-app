import { R4 } from "@ahryman40k/ts-fhir-types";

const extractResources = (
  bundle: R4.IBundle,
  resourceTypes: string[]
): R4.IDomainResource[] => {
  const resources: R4.IDomainResource[] = [];

  bundle.entry?.forEach((entry) => {
    if (resourceTypes?.includes(entry?.resource?.resourceType)) {
      resources.push(entry.resource);
    }
  });

  return resources;
};

export { extractResources };
