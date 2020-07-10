import React, { useState } from "react";
import SplitPane from "react-split-pane";

import { ConnectionManager } from "@phema/connection-manager";

import Phenotypes from "../phenotypes/Phenotypes.jsx";
import Connections from "../connections/Connections.jsx";
import Details from "../details/Details.jsx";
import ExecutionLog from "../log/ExecutionLog";

const resized = () => {
  document
    .getElementById("phemaWorkbenchMain")
    .dispatchEvent(new Event("phema-workbench-resized"));
};

const Main = (props) => {
  const {
    localForage,
    cqlScripts,
    terminologyManagers,
    selectedTab,
    saveLibrary,
  } = props;

  const [connections, setConnections] = useState(undefined);

  return (
    <div id="phemaWorkbenchMain" className="main">
      <SplitPane
        split="vertical"
        defaultSize={"25%"}
        maxSize={-50}
        className="primary"
        onDragFinished={resized}
      >
        <SplitPane
          split="horizontal"
          defaultSize={"35%"}
          maxSize={-50}
          onDragFinished={resized}
        >
          <Phenotypes localForage={localForage} />
          {/* <Connections
            localForage={localForage}
            setConnections={setConnections}
          /> */}
          <ConnectionManager
            connections={connections}
            setConnections={setConnections}
          />
        </SplitPane>
        <SplitPane
          split="horizontal"
          defaultSize={"65%"}
          maxSize={-50}
          onDragFinished={resized}
        >
          <Details
            saveLibrary={saveLibrary}
            tabs={[...cqlScripts, ...terminologyManagers]}
            selectedTab={selectedTab}
            resized={resized}
            connections={connections}
          />
          <ExecutionLog />
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default Main;
