import React from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";

import { FHIRServerConfig, UploadPane, DetailsPane, SearchPane } from "..";

enum ActionType {
  DETAILS,
  SEARCH,
  UPLOAD,
}

interface ActionPaneProps {
  action: ActionType;
  valueset?: R4.IValueSet;
  fhirServerConfig?: FHIRServerConfig;
}

const ActionPane: React.FC<ActionPaneProps> = ({
  action,
  resource,
  fhirConnection,
}) => {
  switch (action) {
    case ActionType.DETAILS:
      return <DetailsPane resource={resource} />;
    case ActionType.SEARCH:
      return <SearchPane />;
    default:
      return <UploadPane />;
  }
};

export { ActionPane, ActionType, ActionPaneProps };
