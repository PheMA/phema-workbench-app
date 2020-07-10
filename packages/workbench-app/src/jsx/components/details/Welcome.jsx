import React from "react";

const Welcome = (props) => (
  <div className="welcome">
    <span className="welcome__title">
      <h2>Welcome to the PhEMA Workbench</h2>
    </span>
    <div>
      There are a few things you can do to get started running a phenotype:
      <ol>
        <li>Add an OMOP or FHIR connection</li>
        <li>Create a new CQL script</li>
      </ol>
    </div>
  </div>
);

export default Welcome;
