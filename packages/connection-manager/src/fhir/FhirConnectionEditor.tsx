import React, { useState } from "react";

import { Classes } from "@blueprintjs/core";

import { v4 as uuid } from "uuid";
import { FHIRConnection } from "../module";
import {
  ConnectionNameField,
  FhirBaseUrlField,
  ParametersFieldGroup,
  SaveCancelButtonGroup,
  AuthFieldGroup,
} from "../";

const validConnection = (fhirConnection) => {
  let valid = !!fhirConnection.fhirBaseUrl;

  fhirConnection.parameters.forEach((parameter) => {
    valid = valid && !!parameter.name && !!parameter.value;
  });

  if (fhirConnection?.auth?.hasOwnProperty("basic")) {
    // validate basic token

    try {
      const decoded = atob(fhirConnection.auth.basic);
      const tokens = decoded.split(":");

      if (tokens.length !== 2) {
        valid = false;
      } else {
        valid = valid && tokens[0].length > 0 && tokens[1].length > 0;
      }
    } catch {
      valid = false;
    }
  }

  if (fhirConnection?.auth?.hasOwnProperty("oauth")) {
    // validate oauth token

    valid =
      valid &&
      fhirConnection.auth.oauth &&
      fhirConnection.auth.oauth.length > 0;
  }

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

  const [fhirConnection, setFhirConnection] = useState(initialState);

  return (
    <>
      <div className={Classes.DIALOG_BODY}>
        <ConnectionNameField
          connection={fhirConnection}
          setConnection={setFhirConnection}
        />

        <FhirBaseUrlField
          connection={fhirConnection}
          setConnection={setFhirConnection}
        />

        <AuthFieldGroup
          connection={fhirConnection}
          setConnection={setFhirConnection}
        />

        <ParametersFieldGroup
          connection={fhirConnection}
          setConnection={setFhirConnection}
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
