import React, { useState, useEffect } from "react";

import { Dialog } from "@blueprintjs/core";

import { ActionHeader } from "@phema/workbench-common";

import { emptyConfig } from "./defaults";

import { log } from "./index";

import {
  FhirConnectionEditor,
  OmopConnectionEditor,
  WorkbenchConnectionEditor,
  ConnectionContainer,
} from "./index";

import { Connection, Connections, ConnectionType } from "./module.d";

interface ConnectionEditorProps {
  selectedTab: string;
  setModalOpen: (open: boolean) => void;
  saveConnection: (connection: Connection) => void;
}

function connectionSaver(
  type: ConnectionType,
  newConnection: Connection,
  connections: Connections,
  setConnectionsInternal: (connections: Connections) => void
): void {
  log(`Saving connection ${newConnection.name || newConnection.id}`);

  const newConnections = Object.assign({}, connections);

  newConnections[type].push(newConnection);

  setConnectionsInternal(newConnections);
}

const ConnectionEditor: React.FC<ConnectionEditorProps> = ({
  selectedTab,
  setModalOpen,
  connectionsInternal,
  setConnectionsInternal,
}) => {
  switch (selectedTab) {
    case ConnectionType.FHIR:
      return (
        <FhirConnectionEditor
          setModalOpen={setModalOpen}
          saveConnection={(connection) => {
            connectionSaver(
              ConnectionType.FHIR,
              connection,
              connectionsInternal,
              setConnectionsInternal
            );
          }}
        />
      );
    case ConnectionType.OMOP:
      return (
        <OmopConnectionEditor
          setModalOpen={setModalOpen}
          saveConnection={(connection) => {
            connectionSaver(
              ConnectionType.OMOP,
              connection,
              connectionsInternal,
              setConnectionsInternal
            );
          }}
        />
      );
    case ConnectionType.WORKBENCH:
      return (
        <WorkbenchConnectionEditor
          setModalOpen={setModalOpen}
          saveConnection={(connection) => {
            connectionSaver(
              ConnectionType.WORKBENCH,
              connection,
              connectionsInternal,
              setConnectionsInternal
            );
          }}
        />
      );
    default:
      return null;
  }
};

interface ConnectionManagerProps {
  connections: Connections;
  setConnections: (connections: Connections) => void;
}

const ConnectionManager: React.FC<ConnectionManagerProps> = ({
  connections,
  setConnections,
}) => {
  if (!connections) {
    return null;
  }

  const [modalOpen, setModalOpen] = useState(false);

  const [connectionsInternal, setConnectionsInternal] = useState(connections);

  const [selectedTab, setSelectedTab] = useState(ConnectionType.FHIR);

  useEffect(() => {
    setConnections(connectionsInternal);

    log(
      `Loaded ${connectionsInternal.i2b2.length} i2b2, ${connectionsInternal.fhir.length} fhir, ${connectionsInternal.omop.length} omop, and ${connectionsInternal.workbench.length} workbench connections`
    );
  }, [connectionsInternal]);

  return (
    <>
      <div className="connections">
        <ActionHeader
          title="Remote Connections"
          addAction={() => {
            log("Adding new connection");
            setModalOpen(true);
          }}
          addText="Add"
        />
        <ConnectionContainer
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          connections={connections}
        />
        <Dialog
          isOpen={modalOpen}
          title={`ADD ${selectedTab.toUpperCase()} CONNECTION`}
          style={{ width: "800px" }}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <ConnectionEditor
            selectedTab={selectedTab}
            setModalOpen={setModalOpen}
            connectionsInternal={connectionsInternal}
            setConnectionsInternal={setConnectionsInternal}
          />
        </Dialog>
      </div>
    </>
  );
};

export { ConnectionManager };
