import React from "react";

import { TerminologyManager } from "@phema/terminology-manager";

const TerminologyManagerWindow = ({ connections }) => {
  return (
    <TerminologyManager
      fhirServerConnections={connections.fhir}
      onSave={(bundle) => console.log("Saving terminology bundle:", bundle)}
    />
  );
};

export { TerminologyManagerWindow };
