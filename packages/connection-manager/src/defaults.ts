import { v4 as uuid } from "uuid";

const defaultFHIRConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    {
      name: "Prod Workbench FHIR Server",
      id: uuid(),
      fhirBaseUrl: `https://workbench.phema.science:4321/fhir`,
      parameters: [],
    },
    {
      name: "PhEMA Workbench FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}${port}/fhir`,
      parameters: [],
    },
    {
      name: "Local FHIR Server",
      id: uuid(),
      fhirBaseUrl: `http://localhost:8080/cqf-ruler-r4/fhir`,
      parameters: [],
    },
    {
      name: "Local Docker FHIR Server",
      id: uuid(),
      fhirBaseUrl: `https://workbench.local.phema.science:4321/fhir`,
      parameters: [],
    },
  ];
};

const defaultOMOPConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    // COHORT DEFINITION
    {
      name: "Prod OMOP Cohort Definition Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/omop/cohortdefinition`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "PhEMA OMOP Cohort Definition Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "Local Docker OMOP Cohort Definition Service",
      id: uuid(),
      url: `https://workbench.local.phema.science:4321/api/v1/omop/cohortdefinition`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "Local Dev OMOP Cohort Definition Service",
      id: uuid(),
      url: `http://localhost:8083/api/v1/omop/cohortdefinition`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    // COHORT REPORT
    {
      name: "Prod OMOP Cohort Report Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/omop/cohortdefinition/report`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "PhEMA OMOP Cohort Report Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition/report`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "Local Docker Cohort Report Service",
      id: uuid(),
      url: `https://workbench.local.phema.science:4321/api/v1/omop/cohortdefinition/report`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "Local Dev Cohort Report Service",
      id: uuid(),
      url: `http://localhost:8083/api/v1/omop/cohortdefinition/report`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    // SQL
    {
      name: "Prod OMOP Cohort Definition SQL Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [{ name: "targetDialect", value: "postgresql" }],
    },
    {
      name: "PhEMA OMOP Cohort Definition SQL Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [{ name: "targetDialect", value: "postgresql" }],
    },
    {
      name: "Local Docker Cohort Definition SQL Service",
      id: uuid(),
      url: `https://workbench.local.phema.science:4321/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [{ name: "targetDialect", value: "postgresql" }],
    },
    {
      name: "Local Dev Cohort Definition SQL Service",
      id: uuid(),
      url: `http:localhost:8083/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "Case",
      source: "OHDSI-CDMV5",
      parameters: [{ name: "targetDialect", value: "postgresql" }],
    }
  ];
};

const defaultWorkbenchConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    // ELM TRANSLATION
    {
      name: "Prod ELM Translator Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/elm`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    {
      name: "PhEMA ELM Translator Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/elm`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    {
      name: "Local Docker ELM Translator Service",
      id: uuid(),
      url: `https://workbench.local.phema.science:4321/api/v1/elm`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    {
      name: "Local Dev ELM Translator Service",
      id: uuid(),
      url: `http://localhost:8083/api/v1/elm`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    // GRAPHVIZ
    {
      name: "Prod Graphviz Service",
      id: uuid(),
      url: `https://workbench.phema.science:4321/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    {
      name: "PhEMA Graphviz Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    {
      name: "Local Docker Graphviz Service",
      id: uuid(),
      url: `https://workbench.local.phema.science:4321/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
    {
      name: "Local Dev Graphviz Service",
      id: uuid(),
      url: `http://localhost:8083/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "Case",
      parameters: [],
    },
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
