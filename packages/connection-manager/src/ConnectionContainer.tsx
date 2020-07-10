import React from "react";

import { Tabs, Tab } from "@blueprintjs/core";

import { FhirConnectionList } from "./index";

import "./ConnectionManager.scss";

interface ConnectionContainerProps {
  selectedTab: string;
  setSelectedTab: (uuid: string) => void;
  connections: Connections;
}

const ConnectionPanel: React.FC = () => {
  return null;
};

const ConnectionContainer: React.FC<ConnectionContainerProps> = ({
  selectedTab,
  setSelectedTab,
  connections,
}) => {
  return (
    <div className="connectionContainer">
      <Tabs
        id="connections"
        selectedTabId={selectedTab}
        onChange={setSelectedTab}
        large
      >
        <Tab id="i2b2" title="i2b2" disabled panel={<ConnectionPanel />} />
        <Tab id="omop" title="OMOP" panel={<ConnectionPanel />} />
        <Tab
          id="fhir"
          title="FHIR"
          panel={<FhirConnectionList connections={connections.fhir} />}
        />
        <Tab id="workbench" title="Workbench" panel={<ConnectionPanel />} />
      </Tabs>
    </div>
  );
};

export { ConnectionContainer };
