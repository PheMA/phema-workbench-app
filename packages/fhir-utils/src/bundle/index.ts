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

interface AddResourceToBundleParameters {
  bundle: R4.IBundle;
  resource: R4.IResourceList;
  method?: R4.Bundle_RequestMethodKind;
  url?: string;
}

const addResourceToBundle = ({
  bundle,
  resource,
  method,
  url,
}: AddResourceToBundleParameters): R4.IBundle => {
  const newBundle: R4.IBundle = Object.assign({}, bundle);

  if (!newBundle.entry) {
    newBundle.entry = [];
  }

  newBundle.entry.push({
    resource,
    request: {
      method: method || R4.Bundle_RequestMethodKind._post,
      url: url || resource.resourceType,
    },
  });

  return newBundle;
};

interface RemoveResourceFromBundleParameters {
  bundle: R4.IBundle;
  index: number;
}

const removeResourceFromBundle = ({
  bundle,
  index,
}: RemoveResourceFromBundleParameters): R4.IBundle => {
  const newBundle: R4.IBundle = Object.assign({}, bundle);

  if (!newBundle.entry) {
    return newBundle;
  }

  newBundle.entry.splice(index, 1);

  return newBundle;
};

interface CollectErrorMessagesParameters {
  bundle: R4.IBundle;
}

const collectErrorMessages = ({
  bundle,
}: CollectErrorMessagesParameters): string[] => {
  const messages = [];

  if (!bundle?.entry) {
    return messages;
  }

  bundle.entry.forEach((entry) => {
    if (entry.response) {
      const response: R4.IBundle_Response = entry.response;

      (response.outcome as R4.IOperationOutcome)?.issue?.forEach((issue) => {
        issue.diagnostics && messages.push(issue.diagnostics);
      });
    }
  });

  return messages;
};

export {
  extractResources,
  addResourceToBundle,
  removeResourceFromBundle,
  collectErrorMessages,
};
