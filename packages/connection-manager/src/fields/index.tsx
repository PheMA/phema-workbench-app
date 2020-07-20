import React, { useState } from "react";

import { v4 as uuid } from "uuid";

import {
  Classes,
  Tooltip,
  Button,
  ControlGroup,
  Intent,
  RadioGroup,
  Radio,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";

import { Connection, Parameter } from "../module";

interface BaseFieldProps {
  id: string;
  value: string;
  helperText: string;
  label: string;
  labelInfo: string;
  placeholder: string;
  onChange: (e: Event) => void;
}

const BaseField: React.FC<BaseFieldProps> = ({
  id,
  value,
  helperText,
  label,
  labelInfo,
  placeholder,
  onChange,
}) => {
  return (
    <FormGroup
      helperText={helperText}
      label={label}
      labelFor={id}
      labelInfo={labelInfo}
    >
      <InputGroup
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  );
};

interface FieldProps {
  connection: Connection;
  setConnection: (connection: Connection) => void;
}

enum AuthType {
  NONE = "none",
  BASIC = "basic",
  OAUTH = "auth",
}

const basicTokenToUserPass = (basicToken) => {
  if (!basicToken) {
    return {
      user: undefined,
      pass: undefined,
    };
  }

  const decoded = atob(basicToken);
  const tokens = decoded.split(":");

  return {
    user: tokens[0],
    pass: tokens[1],
  };
};

const userPassToBasicToken = (user, pass) => {
  return btoa(`${user}:${pass}`);
};

const UserPass = ({ user, pass, onChange }) => {
  return (
    <div className="authUserPass">
      <FormGroup label="Username" labelInfo="(required)" labelFor="basic-user">
        <InputGroup
          id="basic-user"
          placeholder="Username"
          value={user}
          onChange={(e) => {
            onChange(e.target.value, pass);
          }}
        />
      </FormGroup>
      <FormGroup label="Password" labelInfo="(required)" labelFor="basic-pass">
        <InputGroup
          id="basic-pass"
          placeholder="Password"
          value={pass}
          type="password"
          onChange={(e) => {
            onChange(user, e.target.value);
          }}
        />
      </FormGroup>
    </div>
  );
};

const AccessToken = ({ token, onChange }) => {
  return (
    <div className="authAccessToken">
      <FormGroup
        label="Access Token"
        labelInfo="(required)"
        labelFor="bearer-token"
      >
        <InputGroup
          id="bearer-token"
          placeholder="access_token"
          value={token}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </FormGroup>
    </div>
  );
};

export const AuthFieldGroup: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  const getAuthType = (connection) => {
    if (!connection?.auth) {
      return AuthType.NONE;
    } else if (connection?.auth?.hasOwnProperty("basic")) {
      return AuthType.BASIC;
    } else if (connection?.auth?.hasOwnProperty("oauth")) {
      return AuthType.OAUTH;
    } else {
      throw new Error("Unknown authentication type");
    }
  };

  const handleChange = (authType, token) => {
    if (authType === AuthType.NONE) {
      const newConnection = Object.assign({}, connection, {
        auth: AuthType.NONE,
      });

      delete newConnection.auth;

      setConnection(newConnection);
    } else if (authType === AuthType.BASIC) {
      setConnection(
        Object.assign({}, connection, {
          auth: {
            basic: token,
          },
        })
      );
    } else if (authType === AuthType.OAUTH) {
      setConnection(
        Object.assign({}, connection, {
          auth: {
            oauth: token,
          },
        })
      );
    } else {
      throw new Error("Unknown authentication type");
    }
  };

  let authFields = null;

  if (getAuthType(connection) === AuthType.BASIC) {
    const { user, pass } = basicTokenToUserPass(connection?.auth?.basic);

    authFields = (
      <UserPass
        user={user || ""}
        pass={pass || ""}
        onChange={(user, pass) => {
          handleChange(AuthType.BASIC, userPassToBasicToken(user, pass));
        }}
      />
    );
  } else if (getAuthType(connection) === AuthType.OAUTH) {
    authFields = (
      <AccessToken
        token={connection?.auth?.oauth || ""}
        onChange={(token) => {
          handleChange(AuthType.OAUTH, token);
        }}
      />
    );
  }

  return (
    <FormGroup
      helperText="Server authentication configuration"
      label="Authentication"
      labelFor="auth"
      labelInfo="(optional)"
    >
      <RadioGroup
        onChange={(e) => {
          handleChange(e.target.value, undefined);
        }}
        selectedValue={getAuthType(connection)}
        inline={true}
      >
        <Radio label="None" value={AuthType.NONE} />
        <Radio label="Basic" value={AuthType.BASIC} />
        <Radio label="OAuth" value={AuthType.OAUTH} />
      </RadioGroup>
      {authFields}
    </FormGroup>
  );
};

export const ConnectionNameField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="connection-name"
      value={connection.name}
      helperText="Connection name"
      label="Name"
      labelInfo="(optional)"
      placeholder="Connection name"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            name: event.target.value,
          })
        );
      }}
    />
  );
};

export const FhirBaseUrlField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="fhir-base-url"
      value={connection.fhirBaseUrl}
      helperText="The base URL of the FHIR server"
      label="FHIR Base URL"
      labelInfo="(required)"
      placeholder="http://workbench.phema.science/fhir"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            fhirBaseUrl: event.target.value,
          })
        );
      }}
    />
  );
};

export const WorkbenchEndpointField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="workbench-endpoint"
      value={connection.url}
      helperText="The PhEMA Workbench API endpoint for the service"
      label="Workbench Endpoint"
      labelInfo="(required)"
      placeholder="http://workbench.phema.science/api/v1/omop/cohortdefinition"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            url: event.target.value,
          })
        );
      }}
    />
  );
};

export const OmopWebApiUrlField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="omop-webapi-url"
      value={connection.webApiUrl}
      helperText="The OMOP WebAPI Base URL"
      label="OMOP WebAPI URL"
      labelInfo="(required)"
      placeholder="http://ompo.phema.science/WebAPI"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            webApiUrl: event.target.value,
          })
        );
      }}
    />
  );
};

export const OmopWebApiSourceField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="omop-webapi-source"
      value={connection.source}
      helperText="The OMOP WebAPI Source"
      label="OMOP WebAPI Source"
      labelInfo="(required)"
      placeholder="OHDSI-CDMV5"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            source: event.target.value,
          })
        );
      }}
    />
  );
};

export const WorkbenchCodePropertyField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="workbench-code-property"
      value={connection.codeProperty}
      helperText="The field in the request payload to put the CQL source code"
      label="Code Property"
      labelInfo="(required)"
      placeholder="code"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            codeProperty: event.target.value,
          })
        );
      }}
    />
  );
};

export const WorkbenchStatementNameField: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <BaseField
      id="workbench-code-property"
      value={connection.statementName}
      helperText="The CQL define statement to use as the phenotype definition"
      label="CQL Statement Name"
      labelInfo="(required)"
      placeholder="In Initial Population"
      onChange={(event) => {
        setConnection(
          Object.assign({}, connection, {
            statementName: event.target.value,
          })
        );
      }}
    />
  );
};

interface ParameterFieldGroupProps {
  parameter: Parameter;
  index: number;
  removeParameter: (index: number) => void;
  connection: Connnection;
  setConnection: (connection: Connection) => void;
}

const ParameterFieldGroup: React.FC<ParameterFieldGroupProps> = ({
  parameter,
  index,
  removeParameter,
  connection,
  setConnection,
}) => {
  return (
    <div key={parameter.id} className="connectionParameter">
      <FormGroup label="Name" labelInfo="(required)">
        <InputGroup
          id={`${parameter.id}-name`}
          placeholder="Property name"
          value={parameter.name}
          onChange={(e) => {
            const thisProp = connection.parameters.find(
              (p) => p.id === parameter.id
            );
            thisProp.name = e.target.value;
            setConnection(Object.assign({}, connection));
          }}
        />
      </FormGroup>
      <FormGroup label="Value" labelInfo="(required)">
        <InputGroup
          id={`${parameter.id}-value`}
          placeholder="Parameter value"
          value={parameter.value}
          onChange={(e) => {
            const thisProp = connection.parameters.find(
              (p) => p.id === parameter.id
            );
            thisProp.value = e.target.value;
            setConnection(Object.assign({}, connection));
          }}
        />
      </FormGroup>
      <div className="connectionParameter__button">
        <Button
          minimal={true}
          icon="cross"
          onClick={() => removeParameter(index)}
        />
      </div>
    </div>
  );
};

export const ParametersFieldGroup: React.FC<FieldProps> = ({
  connection,
  setConnection,
}) => {
  return (
    <FormGroup
      helperText="Other parameters to include in the request"
      label="Additional Parameters"
      labelInfo="(optional)"
    >
      {connection.parameters?.map((parameter, index) => (
        <ParameterFieldGroup
          key={parameter.id}
          parameter={parameter}
          index={index}
          removeParameter={(idx) => {
            connection.parameters.splice(idx, 1);
            setConnection(Object.assign({}, connection));
          }}
          connection={connection}
          setConnection={setConnection}
        />
      ))}
      <Button
        intent={Intent.PRIMARY}
        minimal={true}
        icon="plus"
        onClick={() => {
          connection.parameters.push({
            id: uuid(),
            name: "",
            value: "",
          });
          setConnection(Object.assign({}, connection));
        }}
      >
        Add
      </Button>
    </FormGroup>
  );
};

interface SaveCancelButtonGroupProps {
  connection: Connection;
  validConnection: (connection: Connection) => boolean;
  saveConnection: (connection: Connection) => void;
  setModalOpen: (open: boolean) => void;
}

export const SaveCancelButtonGroup: React.RC<SaveCancelButtonGroupProps> = ({
  connection,
  validConnection,
  saveConnection,
  setModalOpen,
}) => {
  return (
    <>
      <Button
        onClick={() => {
          setModalOpen(false);
        }}
      >
        Cancel
      </Button>
      <Button
        disabled={!validConnection(connection)}
        icon="floppy-disk"
        intent={Intent.PRIMARY}
        onClick={() => {
          saveConnection(connection);
          setModalOpen(false);
        }}
      >
        Save
      </Button>
    </>
  );
};
