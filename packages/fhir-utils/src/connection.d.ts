export interface AuthConfig {
  basic?: string;
  oauth?: string;
}

export interface Connection {
  id: string;
  name?: string;
}

export interface Parameter {
  id: string;
  name: string;
  value: string;
}

export interface FHIRServerParameter {
  id: string;
  name: string;
  valueString: string;
}

export interface FHIRConnection extends Connection {
  fhirBaseUrl: string;
  auth?: AuthConfig;
  parameters?: FHIRServerParameter[];
}
