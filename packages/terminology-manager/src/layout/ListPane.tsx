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

interface NodeLabelProps {
  title: string;
  subtitle: string;
}

const NodeLabel: React.FC<NodeLabelProps> = ({ title, subtitle }) => {
  return (
    <div className="terminologyManager__listPane__node">
      <div className="terminologyManager__listPane__node__title">{title}</div>
      <div className="terminologyManager__listPane__node__subtitle">
        {subtitle}
      </div>
    </div>
  );
};

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
    const subtitle =
      resourceType === "CodeSystem"
        ? entry.resource?.url || entry.resource?.id
        : entry.resource?.id || entry.resource?.url;

    if (entry.resource?.resourceType === resourceType) {
      nodes.push({
        id: entry.resource?.id,
        label: <NodeLabel title={entry.resource?.name} subtitle={subtitle} />,
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
