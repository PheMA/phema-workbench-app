import React, { useState } from "react";

import {
  Classes,
  Tooltip,
  Button,
  ControlGroup,
  Intent,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import { v4 as uuid } from "uuid";
import { FHIRServerConnection } from "../module";

const otherProperty = (
  parameter,
  index,
  removeParameter,
  fhirServerConnection,
  setfhirServerConnection
) => {
  return (
    <div key={parameter.id} className="fhirServerParameter">
      <FormGroup label="Name" labelInfo="(required)">
        <InputGroup
          id={`${parameter.id}-name`}
          placeholder="Property name"
          value={parameter.name}
          onChange={(e) => {
            const thisProp = fhirServerConnection.parameters.find(
              (p) => p.id === parameter.id
            );
            thisProp.name = e.target.value;
            setfhirServerConnection(Object.assign({}, fhirServerConnection));
          }}
        />
      </FormGroup>
      <FormGroup label="Value" labelInfo="(required)">
        <InputGroup
          id={`${parameter.id}-value`}
          placeholder="Parameter value"
          value={parameter.value}
          onChange={(e) => {
            const thisProp = fhirServerConnection.parameters.find(
              (p) => p.id === parameter.id
            );
            thisProp.value = e.target.value;
            setfhirServerConnection(Object.assign({}, fhirServerConnection));
          }}
        />
      </FormGroup>
      <div className="fhirServerParameter__button">
        <Button
          minimal={true}
          icon="cross"
          onClick={() => removeParameter(index)}
        />
      </div>
    </div>
  );
};

const validConfig = (fhirServerConnection) => {
  let valid = !!fhirServerConnection.fhirBaseUrl;

  fhirServerConnection.parameters.forEach((parameter) => {
    valid = valid && !!parameter.name && !!parameter.value;
  });

  return valid;
};

interface FhirConnectionEditorProps {
  connection?: FHIRServerConnection;
  saveConnection: (connection: FHIRServerConnection) => void;
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

  const [fhirServerConnection, setfhirServerConnection] = useState(
    initialState
  );

  return (
    <>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          helperText="Connection name"
          label="Name"
          labelFor="fhir-server-base-url"
          labelInfo="(optional)"
        >
          <InputGroup
            id="fhir-connection-url"
            placeholder="Connection name"
            value={fhirServerConnection.name}
            onChange={(event) => {
              setfhirServerConnection(
                Object.assign({}, fhirServerConnection, {
                  name: event.target.value,
                })
              );
            }}
          />
        </FormGroup>

        <FormGroup
          helperText="The base URL of the FHIR server"
          label="FHIR Base URL"
          labelFor="fhir-server-base-url"
          labelInfo="(required)"
        >
          <InputGroup
            id="fhir-base-url"
            placeholder="http://workbench.phema.science/fhir"
            value={fhirServerConnection.fhirBaseUrl}
            onChange={(event) => {
              setfhirServerConnection(
                Object.assign({}, fhirServerConnection, {
                  fhirBaseUrl: event.target.value,
                })
              );
            }}
          />
        </FormGroup>

        <FormGroup
          helperText="Other parameters to include in the Parameters resource"
          label="Additional Parameters"
          labelInfo="(optional)"
        >
          {fhirServerConnection.parameters.map((parameter, index) =>
            otherProperty(
              parameter,
              index,
              (idx) => {
                fhirServerConnection.parameters.splice(idx, 1);
                setfhirServerConnection(
                  Object.assign({}, fhirServerConnection)
                );
              },
              fhirServerConnection,
              setfhirServerConnection
            )
          )}
          <Button
            intent={Intent.PRIMARY}
            minimal={true}
            icon="plus"
            onClick={() => {
              fhirServerConnection.parameters.push({
                id: uuid(),
                name: "",
                value: "",
              });
              setfhirServerConnection(Object.assign({}, fhirServerConnection));
            }}
          >
            Add
          </Button>
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!validConfig(fhirServerConnection)}
            icon="floppy-disk"
            intent={Intent.PRIMARY}
            onClick={() => {
              saveConnection(fhirServerConnection);
              setModalOpen(false);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default FhirConnectionEditor;
