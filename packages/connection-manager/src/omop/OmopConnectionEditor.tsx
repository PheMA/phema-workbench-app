import React, { useState } from "react";

import { Classes } from "@blueprintjs/core";

import { v4 as uuid } from "uuid";
import { OMOPConnection } from "../module.d";

import {
  ConnectionNameField,
  WorkbenchEndpointField,
  ParametersFieldGroup,
  SaveCancelButtonGroup,
  OmopWebApiUrlField,
  OmopWebApiSourceField,
  WorkbenchCodePropertyField,
  WorkbenchStatementNameField,
} from "../";

const validConnection = (omopConnection: OMOPConnection) => {
  let valid =
    !!omopConnection.url &&
    !!omopConnection.webApiUrl &&
    !!omopConnection.source &&
    !!omopConnection.codeProperty &&
    !!omopConnection.statementName;

  omopConnection.parameters.forEach((parameter) => {
    valid = valid && !!parameter.name && !!parameter.value;
  });

  return valid;
};

interface OMOPConnectionEditorProps {
  connection?: OMOPConnection;
  saveConnection: (connection: OMOPConnection) => void;
  setModalOpen: (open: boolean) => void;
}

const OmopConnectionEditor: React.FC<OMOPConnectionEditorProps> = ({
  connection,
  saveConnection,
  setModalOpen,
}) => {
  const initialState = connection
    ? connection
    : {
        name: "",
        id: uuid(),
        url: "",
        webApiUrl: "",
        codeProperty: "",
        statementName: "",
        parameters: [],
      };

  const [OMOPConnection, setOMOPConnection] = useState(initialState);

  return (
    <>
      <div className={Classes.DIALOG_BODY}>
        <ConnectionNameField
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />

        <WorkbenchEndpointField
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />

        <OmopWebApiUrlField
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />

        <OmopWebApiSourceField
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />

        <WorkbenchCodePropertyField
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />

        <WorkbenchStatementNameField
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />

        <ParametersFieldGroup
          connection={OMOPConnection}
          setConnection={setOMOPConnection}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <SaveCancelButtonGroup
            connection={OMOPConnection}
            validConnection={validConnection}
            saveConnection={saveConnection}
            setModalOpen={setModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default OmopConnectionEditor;
