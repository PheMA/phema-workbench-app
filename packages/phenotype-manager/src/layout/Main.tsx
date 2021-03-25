import React, { useEffect } from "react";
import SplitPane from "react-split-pane";
import Logger from "@phema/workbench-logger";
import {
  findPotentialEntryPoints,
  preparePhenotypeComposition,
  setComposition,
} from "@phema/phenotype-utils";

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

export const preparePhenotypeBundle = ({ bundle, log }) => {
  // Find the entry points
  const potentialEntryPoints = findPotentialEntryPoints({ bundle });
  let entryPoint = null;

  let composition = null;

  if (potentialEntryPoints.length === 1) {
    entryPoint = potentialEntryPoints[0];

    log(`Setting entry point to library ${entryPoint}`);
  } else if (potentialEntryPoints.length > 1) {
    entryPoint = potentialEntryPoints[0];

    log(`WARNING: Multiple entry points found. Using library ${entryPoint}`);
  } else {
    log('ERROR: No entry point found. Create a define statement called "Case"');
  }

  if (entryPoint !== null) {
    // Create the Composition
    composition = preparePhenotypeComposition({
      bundle,
      entryPointId: entryPoint,
    });
  }

  // Add the Composition
  setComposition({ bundle, composition });

  return bundle;
};

const Main = ({ inputBundle, connections, repoUrl }) => {
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
