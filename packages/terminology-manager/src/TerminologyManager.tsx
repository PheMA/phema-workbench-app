import React from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";

enum AuthType {
  Basic = "Basic",
  Bearer = "Bearer",
}

interface AuthConfig {
  type: AuthType;
  token: string;
}

interface FHIRServerConfig {
  fhirBaseUrl: string;
  auth?: AuthConfig;
}

interface TerminologyManagerProps {
  terminologyBundle?: R4.IBundle;
  terminologyServer: FHIRServerConfig;
  vsacServer?: FHIRServerConfig;
  onSave: (bundle: R4.IBundle) => void;
}

const TerminologyManager: React.FC<TerminologyManagerProps> = ({
  terminologyBundle,
  terminologyServer,
  vsacServer,
  onSave,
}) => {
  return <div>Terminology Manager</div>;
};

export { TerminologyManager };
