import React, { useState } from "react";

import { HTMLSelect } from "@blueprintjs/core";

import { TerminologyManager } from "@phema/terminology-manager";
import { Toolbar } from "@phema/workbench-common";

const ConnectionSelector = ({ label, connections, selected, setSelected }) => {
  const options = connections.fhir.map((conn) => {
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

const TerminologyManagerWindow = ({ connections }) => {
  const [selectedSource, setSelectedSource] = useState(undefined);
  const [selectedTarget, setSelectedTarget] = useState(undefined);

  const rightChildren = (
    <>
      <ConnectionSelector
        label="Source: "
        connections={connections}
        selected={selectedSource}
        setSelected={setSelectedSource}
      />
      <ConnectionSelector
        label="Target: "
        connections={connections}
        selected={selectedTarget}
        setSelected={setSelectedTarget}
      />
    </>
  );

  const findFhirConnection = (uuid) => {
    let found;

    connections.fhir.forEach((connection) => {
      if (connection.id === uuid) {
        found = connection;
      }
    });

    return found;
  };

  return (
    <div className="terminologyManager__wrapper">
      <Toolbar
        title="TERMINOLOGY MANAGER"
        className="terminologyManager__toolbar"
        rightChildren={rightChildren}
      />
      <div className="terminologyManager__wrapper__pane">
        <TerminologyManager
          terminologySourceServer={findFhirConnection(selectedSource)}
          terminologyTargetServer={findFhirConnection(selectedTarget)}
        />
      </div>
    </div>
  );
};

export { TerminologyManagerWindow };
