export enum ConnectionType {
  I2B2 = "i2b2",
  OMOP = "omop",
  FHIR = "fhir",
  WORKBENCH = "workbench",
}

export enum AuthType {
  Basic = "Basic",
  Bearer = "Bearer",
}

export interface AuthConfig {
  type: AuthType;
  token: string;
}

export interface Connection {
  id: string;
  name?: string;
}

export interface FHIRServerParameter {
  name: string;
  valueString: string;
}

export interface FHIRServerConnection extends Connection {
  fhirBaseUrl: string;
  auth?: AuthConfig;
  parameters?: FHIRServerParameter[];
}

export interface OMOPConnection extends Connection {
  omopBaseUrl: string;
}

export interface I2B2Connection extends Connection {
  i2b2BaseUrl: string;
}

export interface WorkbenchConnection extends Connection {
  endpoint: string;
}

export interface Connections {
  i2b2: I2B2Connection[];
  fhir: FHIRServerConnection[];
  omop: OMOPConnection[];
  workbench: WorkbenchConnection[];
}
