import { v4 as uuid } from "uuid";

const defaultFHIRConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    {
      name: "PhEMA Workbench FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}${port}/fhir`,
      parameters: [],
    },
    {
      name: "Local FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}:8080/cqf-ruler-r4/fhir`,
      parameters: [],
    },
    {
      name: "Workbench Docker FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}:4321/fhir`,
      parameters: [],
    },
  ];
};

const defaultOMOPConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    {
      name: "PhEMA OMOP Cohort Definition Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "In Initial Population",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "PhEMA OMOP Cohort Report Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition/report`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "In Initial Population",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
    {
      name: "PhEMA OMOP Cohort Definition SQL Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition/sql`,
      codeProperty: "code",
      webApiUrl: "http://omop.phema.science/WebAPI/",
      statementName: "In Initial Population",
      source: "OHDSI-CDMV5",
      parameters: [],
    },
  ];
};

const defaultWorkbenchConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    {
      name: "PhEMA ELM Translator Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/elm`,
      codeProperty: "code",
      statementName: "In Initial Population",
      parameters: [],
    },
    {
      name: "PhEMA Graphviz Service",
      id: uuid(),
      url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "In Initial Population",
      parameters: [],
    },
    {
      name: "Local Docker ELM Translator Service",
      id: uuid(),
      url: `http://localhost:4321/api/v1/elm`,
      codeProperty: "code",
      statementName: "In Initial Population",
      parameters: [],
    },
    {
      name: "Local Docker Graphviz Service",
      id: uuid(),
      url: `http://localhost:4321/api/v1/elm/graph`,
      codeProperty: "code",
      statementName: "In Initial Population",
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
