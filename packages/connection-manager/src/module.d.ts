import { FHIRConnection } from "@phema/fhir-utils";

export enum ConnectionType {
  I2B2 = "i2b2",
  OMOP = "omop",
  FHIR = "fhir",
  WORKBENCH = "workbench",
}

export interface OMOPParameter {
  id: string;
  name: string;
  value: string;
}

export interface OMOPConnection extends Connection {
  url: string;
  webApiUrl: string;
  source: string;
  codeProperty: string;
  statementName: string;
  parameters?: OMOPParameter[];
}

export interface I2B2Connection extends Connection {
  i2b2BaseUrl: string;
}

export interface WorkbenchConnection extends Connection {
  url: string;
  codeProperty: string;
  statementName: string;
  parameters?: Parameter[];
}

export interface Connections {
  i2b2: I2B2Connection[];
  fhir: FHIRConnection[];
  omop: OMOPConnection[];
  workbench: WorkbenchConnection[];
}
