import React, { useState, useEffect } from "react";
import SplitPane from "react-split-pane";
import _ from "lodash";

import { emptyConfig, ConnectionManager } from "@phema/connection-manager";
import { PhenotypeRepository } from "@phema/phenotype-repository";

import Details from "../details/Details.jsx";
import Logger from "@phema/workbench-logger";

const resized = () => {
  document
    .getElementById("phemaWorkbenchMain")
    .dispatchEvent(new Event("phema-workbench-resized"));
};

const windowResized = () => {
  resized();
}

window.onresize = _.debounce(windowResized, 1000);

const Main = (props) => {
  const {
    localForage,
    cqlScripts,
    terminologyManagers,
    saveTerminologyBundle,
    phenotypeManagers,
    selectedTab,
    setSelectedTab,
    saveLibrary,
    addPhenotypeManager
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
    localForage.setItem("connections", connections);
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
          <PhenotypeRepository importFunc={addPhenotypeManager} />
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
          className="logger_pane"
        >
          <Details
            saveLibrary={saveLibrary}
            saveTerminologyBundle={saveTerminologyBundle}
            tabs={[...cqlScripts, ...terminologyManagers, ...phenotypeManagers]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            resized={resized}
            connections={connections}
          />
          <Logger />
        </SplitPane>
      </SplitPane>
    </div>
  );
};

export default Main;
