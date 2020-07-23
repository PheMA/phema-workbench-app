import { R4 } from "@ahryman40k/ts-fhir-types";

interface GetParameters {
  fhirConnection: FHIRConnection;
  resourceType: string;
  resourceId: string;
}

// get a resource by id
async function get({
  fhirConnection,
  resourceType,
  resourceId,
}: GetParameters): Promise<R4.IResource> {
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

  const url = `${fhirConnection.fhirBaseUrl}/${resourceType}/${resourceId}`;

  return global.fetch(url, { headers }).then((res) => res.json());
}

interface FetchParameters {
  fhirConnection: FHIRConnection;
  url: string;
  method?: string;
  body?: object;
}

// simple wrapper around fetch to set headers
async function fetch({
  fhirConnection,
  url,
  method,
  body,
}: FetchParameters): Promise<R4.IResource> {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (fhirConnection.auth) {
    if (fhirConnection.auth.basic) {
      headers["Authorization"] = `Basic ${fhirConnection.auth.basic}`;
    } else if (fhirConnection.auth.oauth) {
      headers["Authorization"] = `Bearer ${fhirConnection.auth.oauth}`;
    }
  }

  if (body && method === "GET") {
    throw new Error("Cannot perform GET with body");
  }

  const config = {
    headers,
    method: method || "GET",
    body: JSON.stringify(body),
  };

  return global.fetch(url, config).then((res) => res.json());
}

interface SubmitBundleParameters {
  fhirConnection: FHIRConnection;
  bundle: R4.IBundle;
}

async function submitBundle({
  fhirConnection,
  bundle,
}: SubmitBundleParameters): Promise<R4.IBundle> {
  return fetch({
    fhirConnection,
    url: fhirConnection.fhirBaseUrl,
    method: "POST",
    body: bundle,
  }) as Promise<R4.IBundle>;
}

export { get, fetch, submitBundle };
