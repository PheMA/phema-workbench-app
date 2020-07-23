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
  resource: R4.IResource;
  method?: string;
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
      method: method || "POST",
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

interface CollectErrorMessagesParamaters {
  bundle: R4.IBundle;
}

const collectErrorMessages = ({
  bundle,
}: CollectErrorMessagesParamaters): string[] => {
  const messages = [];

  if (!bundle?.entry) {
    return messages;
  }

  bundle.entry.forEach((entry) => {
    if (entry.response?.outcome) {
      entry.response?.outcome.issue?.forEach((issue) => {
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
