import React from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";

import { FHIRServerConfig, UploadPane, DetailsPane, SearchPane } from "..";

import "./layout.scss";

enum ActionType {
  DETAILS,
  SEARCH,
  UPLOAD,
}

interface ActionPaneProps {
  action: ActionType;
  valueset?: R4.IValueSet;
  fhirServerConfig?: FHIRServerConfig;
  addValueSetToBundle?: (resource: R4.IValueSet) => void;
}

const ActionPane: React.FC<ActionPaneProps> = ({
  action,
  resource,
  fhirConnection,
  addValueSetToBundle,
}) => {
  switch (action) {
    case ActionType.DETAILS:
      return <DetailsPane resource={resource} />;
    case ActionType.SEARCH:
      return (
        <SearchPane
          fhirConnection={fhirConnection}
          addValueSetToBundle={addValueSetToBundle}
        />
      );
    default:
      return <UploadPane />;
  }
};

export { ActionPane, ActionType, ActionPaneProps };
