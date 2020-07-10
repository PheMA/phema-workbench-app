import { v4 as uuid } from "uuid";

const defaultFHIRConnections = () => {
  const port = window.location.port ? `:${window.location.port}` : "";

  return [
    {
      name: "PhEMA Workbench FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}${port}/fhir`,
      otherProps: [],
    },
    {
      name: "Local FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}:8080/cqf-ruler-r4/fhir`,
      otherProps: [],
    },
    {
      name: "Workbench Docker FHIR Server",
      id: uuid(),
      fhirBaseUrl: `${window.location.protocol}//${window.location.hostname}:4321/fhir`,
      otherProps: [],
    },
    // {
    //   name: "PhEMA ELM Translator Service",
    //   id: uuid(),
    //   url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/elm`,
    //   codeProperty: "code",
    //   otherProps: [],
    // },
    // {
    //   name: "PhEMA OMOP Cohort Definition Service",
    //   id: uuid(),
    //   url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition`,
    //   codeProperty: "code",
    //   otherProps: [
    //     {
    //       id: uuid(),
    //       name: "omopServerUrl",
    //       value: "http://omop.phema.science/WebAPI/",
    //     },
    //     {
    //       id: uuid(),
    //       name: "name",
    //       value: "In Initial Population",
    //     },
    //     {
    //       id: uuid(),
    //       name: "source",
    //       value: "OHDSI-CDMV5",
    //     },
    //   ],
    // },
    // {
    //   name: "PhEMA OMOP Cohort Report Service",
    //   id: uuid(),
    //   url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition/report`,
    //   codeProperty: "code",
    //   otherProps: [
    //     {
    //       id: uuid(),
    //       name: "omopServerUrl",
    //       value: "http://omop.phema.science/WebAPI/",
    //     },
    //     {
    //       id: uuid(),
    //       name: "name",
    //       value: "In Initial Population",
    //     },
    //     {
    //       id: uuid(),
    //       name: "source",
    //       value: "OHDSI-CDMV5",
    //     },
    //   ],
    // },
    // {
    //   name: "PhEMA OMOP Cohort Definition SQL Service",
    //   id: uuid(),
    //   url: `${window.location.protocol}//${window.location.hostname}${port}/api/v1/omop/cohortdefinition/sql`,
    //   codeProperty: "code",
    //   otherProps: [
    //     {
    //       id: uuid(),
    //       name: "omopServerUrl",
    //       value: "http://omop.phema.science/WebAPI/",
    //     },
    //     {
    //       id: uuid(),
    //       name: "name",
    //       value: "In Initial Population",
    //     },
    //     {
    //       id: uuid(),
    //       name: "source",
    //       value: "OHDSI-CDMV5",
    //     },
    //     {
    //       id: uuid(),
    //       name: "targetDialect",
    //       value: "postgresql",
    //     },
    //   ],
    // },
  ];
};

const emptyConfig = () => {
  return {
    i2b2: [],
    omop: [],
    fhir: defaultFHIRConnections(),
    workbench: [],
  };
};

export { emptyConfig };
