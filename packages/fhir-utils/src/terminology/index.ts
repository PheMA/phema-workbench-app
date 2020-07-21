import { R4 } from "@ahryman40k/ts-fhir-types";

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

export { expand };
