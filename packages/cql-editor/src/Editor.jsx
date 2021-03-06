import React from "react";

import * as monaco from "monaco-editor";
import { v4 as uuid } from "uuid";

import * as CqlMonarch from "./monarch-cql";

import "./styles.scss";

const defaultCQL = () => {
  return `using FHIR version '4.0.0'

valueset "Diabetes": '2.16.840.1.113883.3.464.1003.103.12.1001'

context Patient

define "In Initial Population":
  ["Condition": "Diabetes"] C
`;
};

class CqlEditor extends React.Component {
  componentDidMount() {
    this.initMonaco();

    document
      .getElementById("phemaWorkbenchMain")
      .addEventListener("phema-workbench-resized", () => {
        this.editor.layout();
      });

    // Save the initial value
    this.props.saveLibrary(this.props.scriptId, this.editor.getValue());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scriptId !== this.props.scriptId) {
      this.editor.setValue(this.props.library);
    }

    this.editor.layout();
  }

  initMonaco() {
    monaco.languages.register({ id: "cql" });

    monaco.languages.setMonarchTokensProvider("cql", CqlMonarch);

    self.MonacoEnvironment = {
      getWorkerUrl: function (moduleId, label) {
        return "./editor.worker.js";
      },
    };

    const content = this.props.library ? this.props.library : defaultCQL();

    this.editor = monaco.editor.create(
      document.getElementById(`cqlEditor__container-${this.containerId}`),
      {
        value: content,
        language: "cql",
        automaticLayout: true
      }
    );

    this.editor.onKeyUp(() => {
      this.props.saveLibrary(this.props.scriptId, this.editor.getValue());
    });
  }

  render() {
    const { scriptId } = this.props;

    if (!this.containerId) {
      this.containerId = scriptId ? scriptId : uuid();
    }

    return (
      <div className="cqlEditor">
        <div
          id={`cqlEditor__container-${this.containerId}`}
          className="cqlEditor__editor"
        />
      </div>
    );
  }
}

export default CqlEditor;