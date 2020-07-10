import React from "react";

import {
  Icon,
  HTMLTable,
  Popover,
  PopoverInteractionKind,
} from "@blueprintjs/core";
import { FHIRServerConfig } from "@phema/terminology-manager";

const FhirConnectionSummary = ({ connection }) => {
  const propertyRows = connection.parameters?.map((parameter, index) => (
    <tr key={`${parameter.name}-${index}`}>
      <td>{parameter.name}</td>
      <td>{parameter.value}</td>
    </tr>
  ));

  return (
    <div className="fhirConnectionSummary">
      <HTMLTable>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FHIR Base URL</td>
            <td>{connection.fhirBaseUrl}</td>
          </tr>
          {propertyRows}
        </tbody>
      </HTMLTable>
    </div>
  );
};

const FhirConnectionListItem = ({ connection, index }) => {
  const displayName = connection.name || connection.fhirBaseUrl;

  return (
    <div key={connection.id} className="fhirConnectionList__item">
      <span className="fhirConnectionList__item__name">
        <Icon icon="database" />
        <Popover
          interactionKind={PopoverInteractionKind.HOVER}
          content={<FhirConnectionSummary connection={connection} />}
        >
          <a href="#">{displayName}</a>
        </Popover>
      </span>
      <span className="fhirConnectionList__item__url">
        {connection.fhirBaseUrl}
      </span>
    </div>
  );
};

interface FhirConnectionListProps {
  connections: FHIRServerConfig[];
}

const FhirConnectionList: React.FC<FhirConnectionListProps> = ({
  connections,
}) => {
  return connections.map((connection, index) => (
    <div key={connection.id} className="fhirConnectionList">
      <FhirConnectionListItem
        key={connection.id}
        connection={connection}
        index={index}
      />
    </div>
  ));
};

export default FhirConnectionList;
