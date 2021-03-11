import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Classes,
  Icon,
  Intent,
  ITreeNode,
  Button,
  Position,
  Tooltip,
  Tree,
  Toaster,
} from "@blueprintjs/core";

import { R4 } from "@ahryman40k/ts-fhir-types";

import "./ListPane.scss";

interface NodeLabelProps {
  title: string;
  subtitle: string;
}

const NodeLabel: React.FC<NodeLabelProps> = ({ title, subtitle }) => {
  return (
    <div className={`listPane__node`}>
      <div className={`listPane__node__title`}>{title}</div>
      <div className={`listPane__node__subtitle`}>{subtitle}</div>
    </div>
  );
};

const bundleToTreeNodes = (
  bundle: R4.IBundle,
  resourceType: string,
  removeResourceFromBundle: (index: number, id?: string) => void,
  itemIcon,
  selectedId,
  toaster: Toaster
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
        icon: itemIcon || "th",
        isSelected: selectedId === entry.resource?.id,
        secondaryLabel: (
          <div className={`listPane__node__actions`}>
            <Tooltip content="Copy resource to clipboard">
              <CopyToClipboard
                text={JSON.stringify(entry.resource, " ", 2)}
                onCopy={() => {
                  toaster.show({
                    message: `${resourceType} ${entry.resource?.name} copied to clipboard`,
                    intent: Intent.SUCCESS,
                    icon: "tick",
                  });
                }}
              >
                <Button minimal icon="clipboard" />
              </CopyToClipboard>
            </Tooltip>
            <Tooltip content="Remove from bundle">
              <Button
                minimal
                icon="trash"
                onClick={() =>
                  removeResourceFromBundle(index, entry.resource?.id)
                }
              />
            </Tooltip>
          </div>
        ),
      });
    }
  });

  return nodes;
};

interface ListPaneProps {
  bundle: R4.IBundle;
  removeResourceFromBundle: (index: number) => void;
  itemIcon: string;
  selectedId: string;
  hideTitles: boolean;
  resourceTypes: string[];
  titles: string[];
  toaster: Toaster;
  onNodeClick: (any) => void;
}

const ListPane: React.FC<ListPaneProps> = ({
  bundle,
  removeResourceFromBundle,
  itemIcon,
  selectedId,
  hideTitles,
  resourceTypes,
  titles,
  toaster,
  onNodeClick,
}) => {
  const types = resourceTypes ? resourceTypes : ["ValueSet", "CodeSystem"];
  const headers = titles ? titles : ["Value Sets", "Code Systems"];

  const groups = [];

  types.forEach((type, idx) => {
    groups.push({
      title: headers[idx],
      nodes: bundleToTreeNodes(
        bundle,
        type,
        removeResourceFromBundle,
        itemIcon,
        selectedId,
        toaster
      ),
    });
  });

  let trees;

  trees = groups.map((group, idx) => {
    const title = !hideTitles ? (
      <div className={`listPane__title`}>{group.title}</div>
    ) : undefined;

    return (
      <div className={`listPane__tree`} key={idx}>
        {title}
        <div className={`listPane__tree`}>
          <Tree onNodeClick={onNodeClick} contents={group.nodes} />
        </div>
      </div>
    );
  });

  return <div className={`listPane`}>{trees}</div>;
};

export default ListPane;
