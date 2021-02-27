import { FhirConnectionEditor } from "./fhir";
import { OmopConnectionEditor } from "./omop";
import { WorkbenchConnectionEditor } from "./workbench";

import { ConnectionManager } from "./ConnectionManager";
import { ConnectionContainer } from "./ConnectionContainer";
import { ConnectionList } from "./ConnectionList";

import { emptyConfig } from "./defaults";

import Logger from "@phema/workbench-logger";
const log = Logger.prefixLogger("connection-manager");

import {
  ConnectionNameField,
  FhirBaseUrlField,
  WorkbenchEndpointField,
  ParametersFieldGroup,
  SaveCancelButtonGroup,
  OmopWebApiUrlField,
  OmopWebApiSourceField,
  WorkbenchCodePropertyField,
  WorkbenchStatementNameField,
  AuthFieldGroup,
} from "./fields";

export {
  ConnectionContainer,
  ConnectionManager,
  FhirConnectionEditor,
  OmopConnectionEditor,
  WorkbenchConnectionEditor,
  ConnectionList,
  emptyConfig,
  // fields
  ConnectionNameField,
  FhirBaseUrlField,
  WorkbenchEndpointField,
  ParametersFieldGroup,
  SaveCancelButtonGroup,
  OmopWebApiUrlField,
  OmopWebApiSourceField,
  WorkbenchCodePropertyField,
  WorkbenchStatementNameField,
  AuthFieldGroup,
  log
};
