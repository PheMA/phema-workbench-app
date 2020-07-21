import { R4 } from "@ahryman40k/ts-fhir-types";

interface GetParameters {
  fhirConnection: FHIRConnection;
  resourceType: string;
  resourceId: string;
}

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

  return fetch(url, { headers }).then((res) => res.json());
}

export { get };
