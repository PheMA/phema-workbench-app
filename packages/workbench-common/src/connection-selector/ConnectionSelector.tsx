import React, { useState } from "react";

import { Button, Menu, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

interface ConnectionSelectorProps {
  onChange: (selected: Connection) => void;
  connections: Connections | Connection[];
}

function getDisplay(connections: Connections | Connection[], uuid: string) {
  if (!uuid) {
    return "Select connection...";
  }

  function searchList(connections: Connection[], uuid: string) {
    let connection = connections.find((connection) => connection.id === uuid);

    if (connection) {
      return connection.name || connection.url || connection.fhirBaseUrl;
    }
  }

  let found = undefined;

  if (typeof connections === "object" && !(connections instanceof Array)) {
    Object.keys(connections).forEach((key) => {
      if (connections[key]?.length > 0) {
        found = found || searchList(connections[key], uuid);
      }
    });

    if (!!found) {
      return found;
    }
  } else {
    const found = searchList(connections, uuid);

    if (!!found) {
      return found;
    }
  }

  return "Unknown connection";
}

const ConnectionSelector: React.FC<ConnectionSelectorProps> = ({
  selected,
  setSelected,
  connections,
}) => {
  // Select<T> is a generic component to work with your data types.
  // In TypeScript, you must first obtain a non-generic reference:
  const ConnectionSelect = Select.ofType<Connection>();

  const itemListRenderer = (connnections: Connections | Connection[]) => {
    let items = [];
    if (!connections) {
      return (
        <Menu>
          <MenuItem disabled={true} text="No connections" />
        </Menu>
      );
    } else if (
      typeof connections === "object" &&
      !(connections instanceof Array)
    ) {
      Object.keys(connections).forEach((key) => {
        if (connections[key]?.length > 0) {
          items.push(
            <li className="bp3-menu-header" key={key}>
              <h6 className="bp3-heading">{key}</h6>
            </li>
          );

          connections[key].forEach((connection) => {
            items.push(
              <MenuItem
                key={connection.id}
                text={
                  connection.name || connection.url || connection.fhirBaseUrl
                }
                onClick={() => {
                  setSelected(connection.id);
                }}
              />
            );
          });
        }
      });
    } else {
      items = connections.map((connection) => (
        <MenuItem
          key={connection.id}
          text={connection.name || connection.url || connection.fhirBaseUrl}
          onClick={() => {
            setSelected(connection.id);
          }}
        />
      ));
    }

    return <Menu>{items}</Menu>;
  };

  return (
    <ConnectionSelect
      filterable={false}
      items={connections}
      itemListRenderer={itemListRenderer}
      noResults={<MenuItem disabled={true} text="No connections" />}
    >
      <Button
        text={getDisplay(connections, selected) || "Select connection..."}
        minimal
        rightIcon="double-caret-vertical"
      />
    </ConnectionSelect>
  );
};

export default ConnectionSelector;
