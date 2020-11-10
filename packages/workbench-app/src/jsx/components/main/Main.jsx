import React, { useState, useEffect } from "react";
import SplitPane from "react-split-pane";

import { emptyConfig, ConnectionManager } from "@phema/connection-manager";
import { PhenotypeRepository } from "@phema/phenotype-repository";

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

  useEffect(() => {
    const fetchConnections = async () => {
      localForage.getItem("connections").then((connections) => {
        if (connections) {
          setConnections(connections);
        } else {
          setConnections(emptyConfig());
        }
      });
    };

    fetchConnections();
  }, []);

  useEffect(() => {
    localForage.setItem("connections", connections).then(() => {
      console.log("Connections saved.");
    });
  }, [connections]);

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
          <PhenotypeRepository localForage={localForage} />
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
