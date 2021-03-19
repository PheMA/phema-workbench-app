import React, { useState } from "react";
import SplitPane from "react-split-pane";

import PhemaWorkbenchApi from "../workbench-api/phema-workbench";
import { CqlEditor } from "@phema/cql-editor";
import { Header, CqlResult } from ".";
import { OperationUtils } from "@phema/fhir-utils";

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

const execute = (setResult, connections, library, log) => (connectionId, patientId) => {
  const connectionType = getConnectionType(connections, connectionId);
  const connection = getConnection(connections, connectionId);

  const phemaWorkbenchApi = new PhemaWorkbenchApi();

  if (connectionType === "fhir") {
    const params = [{ name: "code", value: library }, ...connection.parameters];

    if (patientId) {
      params.push({ name: "patientId", value: patientId });
    }

    const body = OperationUtils.buildParametersResource(params);

    phemaWorkbenchApi
      .runCQL(connection.fhirBaseUrl, body, {
        "Content-Type": "application/json",
      })
      .then((result) => {
        setResult(result);
      })
      .catch((e) => {
        log(`Error: ${e}`);
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
        log(`Error: ${e}`);
      });
  }
};


/**
 * If an external execute function is given, run that, and set the result
 * accordingly 
 */
const externalExecute = (setResult, connections, library, externalExecFunc, log) => (connectionId, patientId) => {
  const connectionType = getConnectionType(connections, connectionId);
  const connection = getConnection(connections, connectionId);

  externalExecFunc({ library, connection, connectionType, patientId }).then((result) => {
    console.log("setting result to ", result);

    setResult(result);
  })
    .catch((e) => {
      log(`Error: ${e}`);
    });
}

const CqlWindow = (props) => {
  const { scriptId, resized, connections, saveLibrary, library, externalExecFunc, log } = props;

  const [result, setResult] = useState(undefined);

  const width = result ? "50%" : "100%";

  const execFunc = externalExecFunc
    ? externalExecute(setResult, connections, library, externalExecFunc, log)
    : execute(setResult, connections, library, log);

  return (
    <div className="cqlWindow__wrapper">
      <Header
        connections={connections}
        execute={execFunc}
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
