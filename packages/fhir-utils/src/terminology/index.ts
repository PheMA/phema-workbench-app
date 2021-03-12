import { R4 } from "@ahryman40k/ts-fhir-types";

import { FHIRUtils, FHIRConnection } from "../";

interface ExpandParameters {
  fhirConnection: FHIRConnection;
  valueSetId: string;
}

async function expand({
  fhirConnection,
  valueSetId,
}: ExpandParameters): Promise<R4.IValueSet> {
  const headers = {
    Accept: "application/json",
  };

  if (fhirConnection.auth) {
    if (fhirConnection.auth.basic) {
      headers["Authorization"] = `Basic ${fhirConnection.auth.basic}`;
    } else if (fhirConnection.auth.oauth) {
      headers["Authorization"] = `Bearer ${fhirConnection.auth.oauth}`;
    }
  }

  const url = `${fhirConnection.fhirBaseUrl}/ValueSet/${valueSetId}/$expand`;

  return fetch(url, { headers }).then((res) => res.json());
}

interface ExtractValueSetDependenciesParameters {
  fhirConnection: FHIRConnection;
  valueSet: R4.IValueSet;
}

async function extractValueSetDependencies({
  fhirConnection,
  valueSet,
}: ExtractValueSetDependenciesParameters): Promise<
  (R4.IValueSet | R4.ICodeSystem)[]
> {
  const dependencies = new Set<string>();

  // collect dependencies
  valueSet?.compose?.include?.forEach((entry) => {
    if (entry.valueSet) {
      entry.valueSet.forEach((valueSetUrl) => {
        let url = valueSetUrl;

        // magic to support proxying, and because VSAC doesn't
        // support the URL search parameter 🙄
        if (!valueSetUrl.startsWith(fhirConnection.fhirBaseUrl)) {
          const components = valueSetUrl.split("/");

          url = `${fhirConnection.fhirBaseUrl}/ValueSet/${components.pop()}`;
        }

        dependencies.add(url);
      });
    } else if (entry.system) {
      const queryString = new URLSearchParams();

      queryString.set("system", entry.system);

      if (entry.version) {
        queryString.set("version", entry.version);
      }

      // sort by date so we pick the latest
      queryString.set("_sort", "-date");

      dependencies.add(
        `${fhirConnection.fhirBaseUrl}/CodeSystem?${queryString.toString()}`
      );
    }
  });

  // fetch dependencies
  const dependencyResponses = await Promise.allSettled(
    [...dependencies].map((url) => FHIRUtils.fetch({ fhirConnection, url }))
  );

  const dependencyResources = [];

  for (let i = 0; i < dependencyResponses.length; i++) {
    const response = dependencyResponses[i];

    if (response.status === "fulfilled") {
      const resource = response.value;

      if ((resource as R4.IValueSet).resourceType === "ValueSet") {
        // We retrieved a ValueSet resource directly
        dependencyResources.push(resource);

        // Recursively add value set dependencies
        const recursiveDeps = await extractValueSetDependencies({
          fhirConnection,
          valueSet: resource as R4.IValueSet,
        });

        dependencyResources.push(...recursiveDeps);
      } else if ((resource as R4.IBundle).resourceType === "Bundle") {
        const bundle = resource as R4.IBundle;

        if (bundle.entry) {
          // We search for a code system by name (and maybe version)
          dependencyResources.push(bundle.entry[0]?.resource);
        }
      }
    } else {
      console.warn("Error retrieving ValueSet dependency");
    }
  }

  return dependencyResources;
}

// the following functions could be in bundle utils?

interface BundleContainsValueSetParameters {
  bundle: R4.IBundle;
  valueSet: R4.IValueSet;
}

function bundleContainsValueSet({
  bundle,
  valueSet,
}: BundleContainsValueSetParameters): boolean {
  return bundle?.entry?.some((entry) => {
    if (!entry.resource || entry.resource?.resourceType !== "ValueSet") {
      return false;
    }

    const resource = entry.resource;

    // first try url
    if (valueSet?.url && resource.url) {
      return resource.url === valueSet.url;
    }

    // next try identifier
    if (valueSet?.identifier && valueSet?.identifier[0]) {
      if (resource.identifier && resource.identifier[0]) {
        // should check system here too
        if (valueSet?.identifier[0].value === resource.identifier[0].value) {
          return true;
        }
      }
    }

    // finally try id
    // NB: This isn't actually spec compliant
    if (valueSet?.id) {
      if (valueSet?.id == resource.id) {
        return true;
      } else {
        if (resource.identifier && resource.identifier[0]) {
          if (resource.identifier[0].value.includes(valueSet?.id)) {
            return true;
          }
        }
      }
    }

    return false;
  });
}

interface BundleContainsCodeSystemParameters {
  bundle: R4.IBundle;
  codeSystem: R4.ICodeSystem;
}

function bundleContainsCodeSystem({
  bundle,
  codeSystem,
}: BundleContainsCodeSystemParameters): boolean {
  return bundle?.entry?.some((entry) => {
    const resource = entry.resource;

    if (
      resource.resourceType === "CodeSystem" &&
      resource.url === codeSystem.url
    ) {
      return true;
    }
  });
}

interface ValueSetItem {
  code: string;
  display?: string;
  system?: string;
  version?: string;
}

function valueSetToCodeArray(
  valueSet: R4.IValueSet
): ValueSetItem[] {
  const codes = [];

  valueSet?.compose?.include.forEach(include => {
    include?.concept?.forEach(concept => {
      codes.push({
        code: concept.code,
        display: concept.display,
        system: include.system,
        version: include.version
      })
    });
  });

  return codes;
}

export {
  expand,
  extractValueSetDependencies,
  bundleContainsValueSet,
  bundleContainsCodeSystem,
  valueSetToCodeArray
};
