import React from "react";

import {
  Icon,
  HTMLTable,
  Popover,
  PopoverInteractionKind,
} from "@blueprintjs/core";

import { Connection } from "./module";

const ConnectionSummary = ({ connection, summaryMap }) => {
  const propertyRows = connection.parameters?.map((parameter, index) => (
    <tr key={`${parameter.name}-${index}`}>
      <td>{parameter.name}</td>
      <td>{parameter.value}</td>
    </tr>
  ));

  const summaryRows = summaryMap.map?.map(
    ({ fieldName, fieldTitle, transform }) => (
      <tr key={fieldName}>
        <td>{fieldTitle}</td>
        <td>
          {transform ? transform(connection[fieldName]) : connection[fieldName]}
        </td>
      </tr>
    )
  );

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
          {summaryRows}
          {propertyRows}
        </tbody>
      </HTMLTable>
    </div>
  );
};

interface SummaryMapItem {
  fieldName: string;
  fieldTitle: string;
}

interface SummaryMap {
  map: SummaryMapItem[];
}

interface ConnectionListItemProps {
  connection: Connection;
  index: number;
  urlField: string;
  summaryMap: SummaryMap;
}

const ConnectionListItem: React.Fc<ConnectionListItemProps> = ({
  connection,
  index,
  urlField,
  summaryMap,
}) => {
  const displayName = connection.name || connection[urlField];

  return (
    <div key={connection.id} className="connectionList__item">
      <span className="connectionList__item__name">
        <Icon icon="database" />
        <Popover
          interactionKind={PopoverInteractionKind.HOVER}
          content={
            <ConnectionSummary
              connection={connection}
              summaryMap={summaryMap}
            />
          }
        >
          <a href="#">{displayName}</a>
        </Popover>
      </span>
      <span className="connectionList__item__url">{connection[urlField]}</span>
    </div>
  );
};

interface ConnectionListProps {
  connections: Connection[];
  summaryMap: SummaryMap;
  urlField: string;
}

const ConnectionList: React.FC<ConnectionListProps> = ({
  connections,
  summaryMap,
  urlField,
}) => {
  return connections.map((connection, index) => (
    <div key={connection.id} className="connectionList">
      <ConnectionListItem
        key={connection.id}
        connection={connection}
        index={index}
        summaryMap={summaryMap}
        urlField={urlField || "url"}
      />
    </div>
  ));
};

export { ConnectionList };
