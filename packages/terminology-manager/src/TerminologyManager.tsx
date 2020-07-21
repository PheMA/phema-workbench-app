import React, { useState } from "react";

import { Button, Tooltip } from "@blueprintjs/core";

import {
  Toolbar,
  ConnectionSelector as CommonConnectionSelector,
} from "@phema/workbench-common";

import { R4 } from "@ahryman40k/ts-fhir-types";
import { ListPane, ActionPane } from "./index";

import "./TerminologyManager.scss";
import { ActionType } from "./pane/ActionPane";

interface TerminologyManagerProps {
  terminologyBundle?: R4.IBundle;
  fhirServerConnections: FHIRConnection[];
  onSave: (bundle: R4.IBundle) => void;
}

interface ConnectionSelectorProps {
  label: string;
  connections: FHIRConnection[];
  selected: string;
  setSelected: (uuid: string) => void;
}

const ConnectionSelector: React.FC<ConnectionSelectorProps> = ({
  label,
  connections,
  selected,
  setSelected,
}) => {
  return (
    <div className="terminologyManager__backend__selector">
      {label}
      <CommonConnectionSelector
        connections={connections}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

const TerminologyManager: React.FC<TerminologyManagerProps> = ({
  terminologyBundle,
  fhirServerConnections,
  onSave,
}) => {
  const [bundle, setBundle] = useState<R4.IBundle>(
    terminologyBundle || {
      resourceType: "Bundle",
      entry: [],
    }
  );

  const [selectedSource, setSelectedSource] = useState(undefined);
  const [selectedTarget, setSelectedTarget] = useState(undefined);
  const [currentAction, setCurrentAction] = useState(ActionType.UPLOAD);

  const addValueSetToBundle = (valueSet) => {
    const newBundle = Object.assign({}, bundle);

    newBundle.entry.push({
      resource: valueSet,
    });

    setBundle(newBundle);
  };

  const leftChildren = (
    <>
      <Button
        className="bp3-minimal"
        icon="upload"
        text="Upload"
        onClick={() => setCurrentAction(ActionType.UPLOAD)}
      />
      <Tooltip
        content="Select source connection to search"
        disabled={!!selectedSource}
      >
        <Button
          className="bp3-minimal"
          icon="search"
          text="Search"
          disabled={!selectedSource}
          onClick={() => setCurrentAction(ActionType.SEARCH)}
        />
      </Tooltip>
      <Tooltip
        content="Select target connection to save"
        disabled={!!selectedTarget}
      >
        <Button
          className="bp3-minimal"
          icon="floppy-disk"
          text="Save"
          disabled={!selectedTarget}
          onClick={() => {
            console.log("[terminology-manager] Clicked save.");
            onSave(bundle);
          }}
        />
      </Tooltip>
    </>
  );

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
    return fhirServerConnections.find((connection) => connection.id === uuid);
  };

  return (
    <div className="terminologyManager__wrapper">
      <Toolbar
        title="TERMINOLOGY MANAGER"
        className="terminologyManager__toolbar"
        leftChildren={leftChildren}
        rightChildren={rightChildren}
      />
      <div className="terminologyManager__window">
        <ListPane bundle={bundle} />
        <ActionPane
          action={currentAction}
          fhirConnection={findFhirConnection(selectedSource)}
          addValueSetToBundle={addValueSetToBundle}
        />
      </div>
    </div>
  );
};

export { TerminologyManager, TerminologyManagerProps };
