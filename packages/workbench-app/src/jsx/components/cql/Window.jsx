import React, { useState } from "react";
import SplitPane from "react-split-pane";

import PhemaWorkbenchApi from "../../../api/phema-workbench";
import { CqlEditor } from "@phema/cql-editor";
import { Header, CqlResult } from ".";

const buildParametersResource = (params) => {
  let resource = {
    resourceType: "Parameters",
    parameter: [],
  };

  params.forEach((param) => {
    resource.parameter.push({
      name: param.name,
      valueString: param.value,
    });
  });

  return resource;
};

const getConnectionType = (connections, uuid) => {
  let found = undefined;

  Object.keys(connections).forEach((key) => {
    connections[key].forEach((connection) => {
      if (connection.id === uuid) {
        found = found || key;
      }
    });
  });

  return found;
};

const getConnection = (connections, uuid) => {
  let found = undefined;

  function searchList(connections, uuid) {
    let connection = connections.find((connection) => connection.id === uuid);

    if (connection) {
      return connection;
    }
  }

  Object.keys(connections).forEach((key) => {
    if (connections[key]?.length > 0) {
      found = found || searchList(connections[key], uuid);
    }
  });

  return found;
};

const execute = (setResult, connections, library) => (connectionId, patientId) => {
  const connectionType = getConnectionType(connections, connectionId);
  const connection = getConnection(connections, connectionId);

  const phemaWorkbenchApi = new PhemaWorkbenchApi();

  if (connectionType === "fhir") {
    const params = [{ name: "code", value: library }, ...connection.parameters];

    if (patientId) {
      params.push({ name: "patientId", value: patientId });
    }

    const body = buildParametersResource(params);

    phemaWorkbenchApi
      .runCQL(connection.fhirBaseUrl, body, {
        "Content-Type": "application/json",
      })
      .then((result) => {
        setResult(result);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  } else {
    let body;

    if (connectionType === "omop") {
      body = {
        [connection.codeProperty]: library,
        name: connection.statementName,
        omopServerUrl: connection.webApiUrl,
        source: connection.source,
      };
    } else {
      body = {
        [connection.codeProperty]: library,
        name: connection.statementName,
      };
    }

    connection.parameters.forEach((parameter) => {
      body[parameter.name] = parameter.value;
    });

    phemaWorkbenchApi
      .run(connection.url, body, {
        "Content-Type": "application/json",
      })
      .then((result) => {
        setResult(result);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }
};

const CqlWindow = (props) => {
  const { scriptId, resized, connections, saveLibrary, library } = props;

  const [result, setResult] = useState(undefined);

  const width = result ? "50%" : "100%";

  return (
    <div className="cqlWindow__wrapper">
      <Header
        connections={connections}
        execute={execute(setResult, connections, library)}
      />
      <div className="cqlWindow__wrapper__pane">
        <SplitPane
          split="vertical"
          defaultSize={width}
          className="cqlWindow__splitpane"
          onDragFinished={resized}
        >
          <CqlEditor
            scriptId={scriptId}
            saveLibrary={saveLibrary}
            library={library}
          />
          <CqlResult result={result} />
        </SplitPane>
      </div>
    </div>
  );
};

export default CqlWindow;
