import React, { useEffect } from "react";
import SplitPane from "react-split-pane";
import Logger from "@phema/workbench-logger";

import { useSetRecoilState } from "recoil";
import { bundleAtom } from "../state/atoms";

import Left from "../layout/Left";
import Right from "../layout/Right";

const log = Logger.prefixLogger("phenotype-manager");

const resized = () => {
  document
    .getElementById("phemaWorkbenchMain")
    .dispatchEvent(new Event("phema-workbench-resized"));
};

const Main = ({ inputBundle, connections, repoUrl }) => {
  console.debug("MAIN RENDER");

  const setBundle = useSetRecoilState(bundleAtom);

  useEffect(() => {
    setBundle(inputBundle);
    log("Phenotype Manager initialized");
  }, []);

  return (
    <div className="phenotypeManager">
      <SplitPane
        split="vertical"
        defaultSize={"20%"}
        maxSize={-50}
        className="primary"
        onDragFinished={resized}
      >
        <Left log={log} />
        <Right log={log} connections={connections} repoUrl={repoUrl} />
      </SplitPane>
    </div>
  );
};

export default Main;
