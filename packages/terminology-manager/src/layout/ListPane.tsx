import React from "react";

import {
  Classes,
  Icon,
  Intent,
  ITreeNode,
  Button,
  Position,
  Tooltip,
  Tree,
} from "@blueprintjs/core";

import { R4 } from "@ahryman40k/ts-fhir-types";

// const testBundle = require("./bundle.test.json");

interface ListPaneProps {
  bundle: R4.IBundle;
  removeResourceFromBundle: (index: number) => void;
}

const bundleToTreeNodes = (
  bundle: R4.IBundle,
  resourceType: string,
  removeResourceFromBundle: (index: number) => void
): ITreeNode[] => {
  const nodes: ITreeNode[] = [];

  bundle?.entry?.forEach((entry, index) => {
    if (entry.resource?.resourceType === resourceType) {
      nodes.push({
        id: entry.resource?.id,
        label: entry.resource?.name,
        icon: "th",
        secondaryLabel: (
          <Button
            minimal
            icon="trash"
            onClick={() => removeResourceFromBundle(index)}
          />
        ),
      });
    }
  });

  return nodes;
};

const ListPane: React.FC<ListPaneProps> = ({
  bundle,
  removeResourceFromBundle,
}) => {
  const valueSetNodes = bundleToTreeNodes(
    bundle,
    "ValueSet",
    removeResourceFromBundle
  );
  const codeSystemNodes = bundleToTreeNodes(
    bundle,
    "CodeSystem",
    removeResourceFromBundle
  );

  return (
    <div className="terminologyManager__window__listPane">
      <div className="terminologyManager__window__listPane__title">
        Code Systems
      </div>
      <div className="terminologyManager__window__listPane__tree">
        <Tree
          contents={codeSystemNodes}
          // onNodeClick={this.handleNodeClick}
          // onNodeCollapse={this.handleNodeCollapse}
          // onNodeExpand={this.handleNodeExpand}
          // className={Classes.ELEVATION_0}
        />
      </div>
      <div className="terminologyManager__window__listPane__title">
        Value Sets
      </div>

      <div className="terminologyManager__window__listPane__tree">
        <Tree
          contents={valueSetNodes}
          // onNodeClick={this.handleNodeClick}
          // onNodeCollapse={this.handleNodeCollapse}
          // onNodeExpand={this.handleNodeExpand}
          // className={Classes.ELEVATION_0}
        />
      </div>
    </div>
  );
};

export { ListPane };
