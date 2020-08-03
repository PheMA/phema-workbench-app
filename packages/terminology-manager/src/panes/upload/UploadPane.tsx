import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import JSZip from "jszip";

import { R4 } from "@ahryman40k/ts-fhir-types";
import { CSVUtils } from "@phema/terminology-utils";

import "./UploadPane.scss";
import { TerminologyToaster } from "../../TerminologyToaster";
import { Intent, Spinner } from "@blueprintjs/core";

interface UnsupportedFilesProps {
  filenames: string[];
}

const UnsupportedFiles: React.RC<UnsupportedFilesProps> = ({ filenames }) => {
  const items = filenames.map((filename) => <li key={filename}>{filename}</li>);

  return (
    <div>
      The following files are not supported:
      <ul>{items}</ul>
    </div>
  );
};

interface ProcessUploadedFilesParameters {
  acceptedFiles: File[];
  addValueSetToBundle: (valueSet: R4.IValueSet, callback: any) => Promise<void>;
  fhirConnection: FHIRConnection;
}

interface TryProcessCsvParameters {
  file: File | string;
  fhirConnection: FHIRConnection;
  addValueSetToBundle: (valueSet: R4.IValueSet, callback: any) => Promise<void>;
}

const tryProcessCsv = async ({
  file,
  fhirConnection,
  addValueSetToBundle,
}): Promise<void> => {
  return CSVUtils.omopCsvToValueSets({ csv: file })
    .then((valueSets) => {
      const promises = [];

      for (let i = 0; i < valueSets.length; i++) {
        let p = addValueSetToBundle(valueSets[i], fhirConnection)
          .then(() => {
            TerminologyToaster.show({
              message: `Successfully imported value set "${valueSets[i].name}"`,
              intent: Intent.SUCCESS,
              icon: "tick",
            });
          })
          .catch((err) => {
            console.error(err);

            let message;

            if (typeof err === "string") {
              message = `Failed to import ${valueSets[i].name}: ${err}.`;
            } else if (err instanceof Error) {
              message = `Failed to import ${valueSets[i].name}: ${err.message}.`;
            } else {
              `Failed to import ${valueSets[i].name}`;
            }

            TerminologyToaster.show({
              message,
              intent: Intent.DANGER,
              icon: "warning-sign",
            });
          });

        promises.push(p);
      }

      return Promise.allSettled(promises);
    })
    .catch((err) => {
      const message =
        typeof err === "string"
          ? `Failed to import ${file.name}: ${err}.`
          : `Failed to import ${file.name}`;

      TerminologyToaster.show({
        message,
        intent: Intent.DANGER,
        icon: "warning-sign",
      });

      console.log(err);
    });
};

const processUploadedFiles = async ({
  acceptedFiles,
  addValueSetToBundle,
  fhirConnection,
}: ProcessUploadedFilesParameters): Promise<void> => {
  const promises = [];

  const unsupportedFiles: string[] = [];

  acceptedFiles.forEach((file) => {
    if (file.name.endsWith("zip") || file.type === "application/zip") {
      let p = new Promise((resolve, reject) => {
        JSZip.loadAsync(file).then((zip) => {
          let foundMappedConcepts = false;

          zip.forEach((relativePath, zipEntry) => {
            if (relativePath === "mappedConcepts.csv") {
              foundMappedConcepts = true;

              return zipEntry.async("string").then((contents) => {
                return tryProcessCsv({
                  file: contents,
                  fhirConnection,
                  addValueSetToBundle,
                }).then(() => resolve());
              });
            }
          });

          if (!foundMappedConcepts) {
            reject("'mappedConcepts.csv' not found in ZIP file");
          }
        });
      }).catch((err) => {
        console.error(err);

        let message;

        if (typeof err === "string") {
          message = `Failed to import: ${err}.`;
        } else if (err instanceof Error) {
          message = `Failed to import: ${err.message}.`;
        } else {
          `Failed to import ${file.name}`;
        }

        TerminologyToaster.show({
          message,
          intent: Intent.DANGER,
          icon: "warning-sign",
        });
      });

      promises.push(p);
    } else if (file.name.endsWith("csv") || file.type === "text/csv") {
      tryProcessCsv({ file, fhirConnection, addValueSetToBundle });
    } else if (file.name.endsWith("json") || file.type === "application/json") {
    } else {
      unsupportedFiles.push(file.name);
    }
  });

  if (unsupportedFiles.length > 0) {
    TerminologyToaster.show({
      message: <UnsupportedFiles filenames={unsupportedFiles} />,
      intent: Intent.WARNING,
      icon: "warning-sign",
    });
  }

  return Promise.allSettled(promises);
};

interface UploadPaneProps {
  fhirConnection: FHIRConnection;
  addValueSetToBundle: (valueSet: R4.IValueSet) => void;
}

const UploadPane: React.FC<UploadPaneProps> = ({
  fhirConnection,
  addValueSetToBundle,
}) => {
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setProcessing(true);

      processUploadedFiles({
        acceptedFiles,
        addValueSetToBundle,
        fhirConnection,
      })
        .then(() => {
          setProcessing(false);

          console.log("ASDASD");
        })
        .catch((err) => {
          console.log(err);

          setProcessing(false);
        });
    },
    [fhirConnection]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (processing) {
    return (
      <div className="terminologyManager__uploadPane__spinner">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="terminologyManager__uploadPane">
        <div
          className={`terminologyManager__uploadPane__dropzone${
            isDragActive ? "--active" : ""
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div>
              <p>
                Drag and drop any of the following types of files here, or click
                to select
              </p>
              <div>
                <ul>
                  <li>
                    FHIR{" "}
                    <span className="terminologyManager__uploadPane__dropzone__pre">
                      ValueSet
                    </span>
                    ,{" "}
                    <span className="terminologyManager__uploadPane__dropzone__pre">
                      CodeSystem
                    </span>{" "}
                    or{" "}
                    <span className="terminologyManager__uploadPane__dropzone__pre">
                      Bundle
                    </span>{" "}
                    resources in JSON format
                  </li>
                  <li>
                    <span className="terminologyManager__uploadPane__dropzone__pre">
                      exportedConceptSet
                    </span>{" "}
                    ZIP files exported from OHDSI Atlas
                  </li>
                  <li>
                    Individual CSV files (e.g.{" "}
                    <span className="terminologyManager__uploadPane__dropzone__pre">
                      includedConcepts.csv
                    </span>
                    ) exported from OHDSI Atlas
                  </li>
                </ul>
              </div>
              <p>
                Select a source connection to search for referenced value sets
                and code systems during import.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export { UploadPane, UploadPaneProps };
