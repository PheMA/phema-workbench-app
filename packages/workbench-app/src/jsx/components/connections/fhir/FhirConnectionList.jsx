import React from "react";

import {
  Icon,
  HTMLTable,
  Popover,
  PopoverInteractionKind,
} from "@blueprintjs/core";

const FhirConnectionSummary = (props) => {
  const { connection } = props;

  const propertyRows = connection.otherProps.map((prop, index) => (
    <tr key={`${prop.name}-${index}`}>
      <td>{prop.name}</td>
      <td>{prop.value}</td>
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
            <td>Connection URL</td>
            <td>{connection.url}</td>
          </tr>
          {propertyRows}
        </tbody>
      </HTMLTable>
    </div>
  );
};

const FhirConnectionListItem = (props) => {
  const { connection, index } = props;

  const displayName = connection.name || connection.url;

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
      <span className="fhirConnectionList__item__url">{connection.url}</span>
    </div>
  );
};

const FhirConnectionList = (props) => {
  const { connections } = props;

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
