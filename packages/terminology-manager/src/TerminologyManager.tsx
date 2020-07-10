import React, { useState } from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";
import { ListPane, ActionPane } from "./index";

import "./TerminologyManager.scss";

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
  fhirServerConnections: FHIRServerConfig[];
  onSave: (bundle: R4.IBundle) => void;
}

interface ConnectionSelectorProps {
  label: string;
  connections: FHIRServerConfig[];
  selected: string;
  setSelected: (uuid: string) => void;
}

const ConnectionSelector: React.FC<ConnectionSelectorProps> = ({
  label,
  connections,
  selected,
  setSelected,
}) => {
  const options = connections.map((conn) => {
    const name = conn.name ? conn.name : conn.url;

    return (
      <option key={conn.id} value={conn.id}>
        {name}
      </option>
    );
  });

  return (
    <div className="terminologyManager__backend__selector">
      {label}
      <HTMLSelect
        className="bp3-minimal"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      >
        <option>Select backend...</option>
        {options}
      </HTMLSelect>
    </div>
  );
};

const TerminologyManager: React.FC<TerminologyManagerProps> = ({
  terminologyBundle,
  fhirServerConnections,
  onSave,
}) => {
  const [selectedSource, setSelectedSource] = useState(undefined);
  const [selectedTarget, setSelectedTarget] = useState(undefined);

  const rightChildren = (
    <>
      <ConnectionSelector
        label="Source: "
        connections={fhirServerConnections}
        selected={selectedSource}
        setSelected={setSelectedSource}
      />
      <ConnectionSelector
        label="Target: "
        connections={fhirServerConnections}
        selected={selectedTarget}
        setSelected={setSelectedTarget}
      />
    </>
  );

  const findFhirConnection = (uuid) => {
    let found;

    fhirServerConnections.forEach((connection) => {
      if (connection.id === uuid) {
        found = connection;
      }
    });

    return found;
  };

  console.log("fhirServerConnections", fhirServerConnections);

  const bundle: R4.IBundle = terminologyBundle || {
    resourceType: "Bundle",
    entry: [],
  };

  return (
    <div className="terminologyManager">
      <ListPane bundle={bundle} />
      <ActionPane />
    </div>
  );
};

export {
  TerminologyManager,
  AuthType,
  AuthConfig,
  FHIRServerConfig,
  TerminologyManagerProps,
};
