import React from "react";
import ReactJson from "react-json-view";

import { NonIdealState } from "@blueprintjs/core";
import { PhenotypeVisualizer } from "@phema/phenotype-visualizer";

import SqlResult from "./SqlResult";

const CqlResult = (props) => {
  const { result } = props;

  if (result == undefined) {
    return null;
  }

  if (!result.ok) {
    return (
      <NonIdealState
        icon="error"
        title={`Response code ${result.body.status}`}
        description={result.body.statusText}
      />
    );
  }

  let resultComp;
  if (result.type === "json") {
    if (result.body.templateSql) {
      resultComp = <SqlResult sql={result.body.templateSql} />;
    } else {
      resultComp = (
        <ReactJson
          displayObjectSize={false}
          displayDataTypes={false}
          src={result.body}
        />
      );
    }
  } else if (result.type === "graphviz") {
    resultComp = <PhenotypeVisualizer dotsrc={result.body} />;
  } else {
    resultComp = <div>{result.value}</div>;
  }

  return <div className="cqlResults">{resultComp}</div>;
};

export default CqlResult;
