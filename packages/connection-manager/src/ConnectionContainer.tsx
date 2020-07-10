import React from "react";

import { Tabs, Tab } from "@blueprintjs/core";

import {
  FhirConnectionList,
  OmopConnectionList,
  WorkbenchConnectionList,
  ConnectionList,
} from "./index";

import "./ConnectionManager.scss";

interface ConnectionContainerProps {
  selectedTab: string;
  setSelectedTab: (uuid: string) => void;
  connections: Connections;
}

const ConnectionPanel: React.FC = () => {
  return null;
};

const fhirSummaryMap = {
  map: [{ fieldName: "fhirBaseUrl", fieldTitle: "FHIR Base URL" }],
};

const omopSummaryMap = {
  map: [
    { fieldName: "url", fieldTitle: "Workbench API Endpoint" },
    { fieldName: "webApiUrl", fieldTitle: "OMOP WebAPI URL" },
    { fieldName: "source", fieldTitle: "OMOP WebAPI Source" },
    { fieldName: "codeProperty", fieldTitle: "Code Property" },
    { fieldName: "statementName", fieldTitle: "CQL Statement Name" },
  ],
};

const workbenchSummaryMap = {
  map: [
    { fieldName: "url", fieldTitle: "Workbench API Endpoint" },
    { fieldName: "codeProperty", fieldTitle: "Code Property" },
    { fieldName: "statementName", fieldTitle: "CQL Statement Name" },
  ],
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
        <Tab
          id="omop"
          title="OMOP"
          panel={
            <ConnectionList
              connections={connections.omop}
              summaryMap={omopSummaryMap}
            />
          }
        />
        <Tab
          id="fhir"
          title="FHIR"
          panel={
            <ConnectionList
              connections={connections.fhir}
              summaryMap={fhirSummaryMap}
              urlField="fhirBaseUrl"
            />
          }
        />
        <Tab
          id="workbench"
          title="Workbench"
          panel={
            <ConnectionList
              connections={connections.workbench}
              summaryMap={workbenchSummaryMap}
            />
          }
        />
      </Tabs>
    </div>
  );
};

export { ConnectionContainer };
