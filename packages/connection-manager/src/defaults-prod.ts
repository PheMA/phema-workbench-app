import { v4 as uuid } from "uuid";

const defaultFHIRConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    {
      name: "PhEMA Workbench FHIR Server",
      id: uuid(),
      fhirBaseUrl: `https://workbench.phema.science:4321/fhir`,
      parameters: [],
    }
  ];
};

const defaultOMOPConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    // COHORT DEFINITION
    {
      name: "PhEMA Workbench Cohort Definition Report Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/omop/cohortdefinition/report`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    // SQL
    {
      name: "PhEMA Workbench OMOP SQL Service (Postgres)",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [{ name: "targetDialect", value: "postgresql" }],
    },
    {
      name: "PhEMA Workbench OMOP SQL Service (SQL Server)",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [{ name: "targetDialect", value: "sql server" }],
    }
  ];
};

const defaultWorkbenchConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    // ELM TRANSLATION
    {
      name: "PhEMA Workbench ELM Translator Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/elm`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    // GRAPHVIZ
    {
      name: "PhEMA Workbench Graphviz Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    }
  ];
};

const emptyConfig = () => {
  return {
    i2b2: [],
    omop: defaultOMOPConnections(),
    fhir: defaultFHIRConnections(),
    workbench: defaultWorkbenchConnections(),
  };
};

export { emptyConfig };
