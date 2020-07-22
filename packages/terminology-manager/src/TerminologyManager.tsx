import React, { useState } from "react";

import { Button, Tooltip } from "@blueprintjs/core";

import {
  Toolbar,
  ConnectionSelector as CommonConnectionSelector,
} from "@phema/workbench-common";

import { R4 } from "@ahryman40k/ts-fhir-types";
import { ListPane, ActionPane } from "./index";

import "./TerminologyManager.scss";
import { ActionType } from "./layout/ActionPane";

import { TerminologyUtils, BundleUtils } from "@phema/fhir-utils";

interface TerminologyManagerProps {
  terminologyBundle?: R4.IBundle;
  fhirServerConnections: FHIRConnection[];
  onSave: (bundle: R4.IBundle) => void;
}

interface ConnectionSelectorProps {
  label: string;
  connections: FHIRConnection[];
  selected: string;
  setSelected: (uuid: string) => void;
}

const ConnectionSelector: React.FC<ConnectionSelectorProps> = ({
  label,
  connections,
  selected,
  setSelected,
}) => {
  return (
    <div className="terminologyManager__backend__selector">
      {label}
      <CommonConnectionSelector
        connections={connections}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

const TerminologyManager: React.FC<TerminologyManagerProps> = ({
  terminologyBundle,
  fhirServerConnections,
  onSave,
}) => {
  const [bundle, setBundle] = useState<R4.IBundle>(
    terminologyBundle || {
      resourceType: "Bundle",
      type: "batch",
      entry: [],
    }
  );

  const [selectedSource, setSelectedSource] = useState(undefined);
  const [selectedTarget, setSelectedTarget] = useState(undefined);
  const [currentAction, setCurrentAction] = useState(ActionType.UPLOAD);

  const addValueSetBundle = (valueSet) => {
    if (TerminologyUtils.bundleContainsValueSet({ bundle, valueSet })) {
      return;
    }

    let newBundle = BundleUtils.addResourceToBundle({
      bundle,
      resource: valueSet,
    });

    TerminologyUtils.extractValueSetDependencies({
      fhirConnection: findFhirConnection(selectedSource),
      valueSet,
    })
      .then((deps) => {
        console.log("DEPENDENCIES", deps);

        deps.forEach((dep) => {
          if (dep.resourceType === "ValueSet") {
            if (
              TerminologyUtils.bundleContainsValueSet({ bundle, valueSet: dep })
            ) {
              return;
            }
          } else if (dep.resourceType === "CodeSystem") {
            if (
              TerminologyUtils.bundleContainsCodeSystem({
                bundle,
                codeSystem: dep,
              })
            ) {
              return;
            }
          } else {
            throw new Error("Unknown dependency type");
          }

          newBundle = BundleUtils.addResourceToBundle({
            bundle: newBundle,
            resource: dep,
          });
        });
      })
      .then(() => {
        setBundle(newBundle);
      });
  };

  const removeResourceFromBundle = (index) => {
    const newBundle = BundleUtils.removeResourceFromBundle({ bundle, index });

    setBundle(newBundle);
  };

  const leftChildren = (
    <>
      <Button
        className="bp3-minimal"
        icon="upload"
        text="Upload"
        onClick={() => setCurrentAction(ActionType.UPLOAD)}
      />
      <Tooltip
        content="Select source connection to search"
        disabled={!!selectedSource}
      >
        <Button
          className="bp3-minimal"
          icon="search"
          text="Search"
          disabled={!selectedSource}
          onClick={() => setCurrentAction(ActionType.SEARCH)}
        />
      </Tooltip>
      <Tooltip
        content="Select target connection to save"
        disabled={!!selectedTarget}
      >
        <Button
          className="bp3-minimal"
          icon="floppy-disk"
          text="Save"
          disabled={!selectedTarget}
          onClick={() => {
            console.log("[terminology-manager] Clicked save.");
            onSave(bundle);
          }}
        />
      </Tooltip>
      <Button
        className="bp3-minimal"
        icon="download"
        text="Download"
        onClick={() => {
          const download = (filename, content) => {
            var element = document.createElement("a");
            element.setAttribute(
              "href",
              "data:application/json;charset=utf-8," +
                encodeURIComponent(content)
            );
            element.setAttribute("download", filename);

            element.style.display = "none";
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
          };

          //download("Terminology.bundle.json", JSON.stringify(bundle, " ", 2));

          console.log(bundle);
        }}
      />
    </>
  );

  const rightChildren = (
    <>
      <ConnectionSelector
        label="Source: "
        connections={fhirServerConnections}
        selected={selectedSource}
        setSelected={setSelectedSource}
      />
      <ConnectionSelector
        label="Target: "
        connections={fhirServerConnections}
        selected={selectedTarget}
        setSelected={setSelectedTarget}
      />
    </>
  );

  const findFhirConnection = (uuid) => {
    return fhirServerConnections.find((connection) => connection.id === uuid);
  };

  return (
    <div className="terminologyManager__wrapper">
      <Toolbar
        title="TERMINOLOGY MANAGER"
        className="terminologyManager__toolbar"
        leftChildren={leftChildren}
        rightChildren={rightChildren}
      />
      <div className="terminologyManager__window">
        <ListPane
          bundle={bundle}
          removeResourceFromBundle={removeResourceFromBundle}
        />
        <ActionPane
          action={currentAction}
          fhirConnection={findFhirConnection(selectedSource)}
          terminologyBundle={bundle}
          addValueSetToBundle={addValueSetBundle}
        />
      </div>
    </div>
  );
};

export { TerminologyManager, TerminologyManagerProps };
