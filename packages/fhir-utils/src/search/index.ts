import { R4 } from "@ahryman40k/ts-fhir-types";
import { FHIRConnection } from "../connection";

interface SearchParameters {
  fhirConnection: FHIRConnection;
  resourceType: string;
  parameters: {
    [parameter: string]: string;
  };
}

async function search({
  fhirConnection,
  resourceType,
  parameters,
}: SearchParameters): Promise<R4.IBundle> {
  const queryString = new URLSearchParams();

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

  Object.keys(parameters).forEach((key) => {
    if (parameters[key]) {
      queryString.set(key, parameters[key]);
    }
  });

  const url = `${
    fhirConnection.fhirBaseUrl
  }/${resourceType}?${queryString.toString()}`;

  return fetch(url, { headers }).then((res) => res.json());
}

export { search };
