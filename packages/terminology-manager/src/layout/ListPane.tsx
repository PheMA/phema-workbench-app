import React from "react";

import {
  Classes,
  Icon,
  Intent,
  ITreeNode,
  Position,
  Tooltip,
  Tree,
} from "@blueprintjs/core";

import { R4 } from "@ahryman40k/ts-fhir-types";

// const testBundle = require("./bundle.test.json");

interface ListPaneProps {
  bundle: R4.IBundle;
}

const bundleToTreeNodes = (bundle: R4.IBundle): ITreeNode[] => {
  const nodes: ITreeNode[] = [];

  bundle?.entry?.forEach((entry) => {
    nodes.push({
      id: entry.resource?.id,
      label: entry.resource?.name,
      icon: "th",
    });
  });

  return nodes;
};

const ListPane: React.FC<ListPaneProps> = ({ bundle }) => {
  const nodes = bundleToTreeNodes(bundle);

  return (
    <div className="terminologyManager__window__listPane">
      <div className="terminologyManager__window__listPane__title">
        Value Sets
      </div>
      <Tree
        contents={nodes}
        // onNodeClick={this.handleNodeClick}
        // onNodeCollapse={this.handleNodeCollapse}
        // onNodeExpand={this.handleNodeExpand}
        // className={Classes.ELEVATION_0}
      />
    </div>
  );
};

export { ListPane };
