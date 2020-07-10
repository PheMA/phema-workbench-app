import React, { useState } from "react";

import { Classes } from "@blueprintjs/core";

import { v4 as uuid } from "uuid";
import { WorkbenchConnection } from "../module.d";

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

const validConnection = (workbenchConnection: WorkbenchConnection) => {
  let valid =
    !!workbenchConnection.url &&
    !!workbenchConnection.codeProperty &&
    !!workbenchConnection.statementName;

  workbenchConnection.parameters.forEach((parameter) => {
    valid = valid && !!parameter.name && !!parameter.value;
  });

  return valid;
};

interface WorkbenchConnectionEditorProps {
  connection?: WorkbenchConnection;
  saveConnection: (connection: WorkbenchConnection) => void;
  setModalOpen: (open: boolean) => void;
}

const WorkbenchConnectionEditor: React.FC<WorkbenchConnectionEditorProps> = ({
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

export default WorkbenchConnectionEditor;
