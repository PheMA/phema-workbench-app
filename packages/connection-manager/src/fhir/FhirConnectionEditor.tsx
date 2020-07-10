import React, { useState } from "react";

import { Classes } from "@blueprintjs/core";

import { v4 as uuid } from "uuid";
import { FHIRConnection } from "../module";
import {
  ConnectionNameField,
  FhirBaseUrlField,
  ParametersFieldGroup,
  SaveCancelButtonGroup,
} from "../";

const validConnection = (fhirConnection) => {
  let valid = !!fhirConnection.fhirBaseUrl;

  fhirConnection.parameters.forEach((parameter) => {
    valid = valid && !!parameter.name && !!parameter.value;
  });

  return valid;
};

interface FhirConnectionEditorProps {
  connection?: FHIRConnection;
  saveConnection: (connection: FHIRConnection) => void;
  setModalOpen: (open: boolean) => void;
}

const FhirConnectionEditor: React.FC<FhirConnectionEditorProps> = ({
  connection,
  saveConnection,
  setModalOpen,
}) => {
  const initialState = connection
    ? connection
    : {
        name: "",
        id: uuid(),
        fhirBaseUrl: "",
        parameters: [],
      };

  const [fhirConnection, setfhirConnection] = useState(initialState);

  return (
    <>
      <div className={Classes.DIALOG_BODY}>
        <ConnectionNameField
          connection={fhirConnection}
          setConnection={setfhirConnection}
        />

        <FhirBaseUrlField
          connection={fhirConnection}
          setConnection={setfhirConnection}
        />

        <ParametersFieldGroup
          connection={fhirConnection}
          setConnection={setfhirConnection}
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <SaveCancelButtonGroup
            connection={fhirConnection}
            validConnection={validConnection}
            saveConnection={saveConnection}
            setModalOpen={setModalOpen}
          />
        </div>
      </div>
    </>
  );
};

export default FhirConnectionEditor;
