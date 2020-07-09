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

const execute = (setResult, connections, library) => (connectionId) => {
  const connection = connections.cql.find((conn) => conn.id == connectionId);

  const phemaWorkbenchApi = new PhemaWorkbenchApi();

  const params = [{ name: "code", value: library }, ...connection.otherProps];

  const body = buildParametersResource(params);

  phemaWorkbenchApi
    .runCQL(connection.url, body, { "Content-Type": "application/json" })
    .then((result) => {
      setResult(result);
    })
    .catch((e) => {
      console.log("Error", e);
    });
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