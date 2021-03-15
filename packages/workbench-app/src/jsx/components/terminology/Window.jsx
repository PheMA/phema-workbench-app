import React from "react";

import { TerminologyManager } from "@phema/terminology-manager";

const TerminologyManagerWindow = ({ connections, id, bundle, saveTerminologyBundle }) => {
  return (
    <TerminologyManager
      id={id}
      bundle={bundle}
      fhirServerConnections={connections.fhir}
      saveTerminologyBundle={saveTerminologyBundle}
    />
  );
};

export { TerminologyManagerWindow };
