import React, { useEffect } from 'react';
import { useRecoilState, useRecoilCallback } from "recoil";
import _ from "lodash";

import { BundleUtils, LibraryUtils, TerminologyUtils } from "@phema/fhir-utils";
import { CqlWindow, ValueSet, PhemaWorkbenchApi } from "@phema/workbench-common";

import { extractIdFromLibrary, updateLibrary } from "@phema/phenotype-utils";
import { OperationUtils } from "@phema/fhir-utils";

import LibraryPane from '../panes/LibraryPane';

import { bundleAtom, selectedAtom } from "../state/atoms";

const resized = () => {
    document
        .getElementById("phemaWorkbenchMain")
        .dispatchEvent(new Event("phema-workbench-resized"));
};

const saveLibrary = ({ bundle, setBundle, log }) => (libraryId, cql) => {
    log(`Saving library ${libraryId}`);

    const newBundle = _.cloneDeep(bundle);

    updateLibrary({ bundle: newBundle, libraryId, cql });

    setBundle(newBundle);
}

const executePhenotype = async ({ bundle, connection, connectionType, library, patientId, log }) => {
    log("Executing phenotype");

    // Make sure we are on an entry point
    if (!library.includes("define \"Case\"")) {
        throw new Error(`CQL library must have a "Case" statement`);
    }

    const id = extractIdFromLibrary({ library });

    log(`Assembling phenotype with entry point "${id}"`);

    const phemaWorkbenchApi = new PhemaWorkbenchApi();

    if (connectionType == "fhir") {
        log(`Submitting bundle to server`);

        return phemaWorkbenchApi.post(connection.fhirBaseUrl, bundle, { "Content-Type": "application/json" }).
            then((res) => {
                // TODO: handle errors
                log(`Executing entry point`);

                const params = [{ name: "code", value: library }, ...connection.parameters];

                if (patientId) {
                    params.push({ name: "patientId", value: patientId });
                }

                const body = OperationUtils.buildParametersResource(params);

                return phemaWorkbenchApi
                    .runCQL(connection.fhirBaseUrl, body, {
                        "Content-Type": "application/json",
                    })
            });
    } else if (connectionType == "omop") {
        const body = {
            bundle: JSON.stringify(bundle),
            name: connection.statementName,
            omopServerUrl: connection.webApiUrl,
            source: connection.source,
        };

        connection.parameters.forEach((parameter) => {
            body[parameter.name] = parameter.value;
        });

        return phemaWorkbenchApi
            .run(connection.url, body, {
                "Content-Type": "application/json",
            });
    } else {
        throw new Error("Unsupported connection type")
    }
}

const Right = ({ log, connections, repoUrl }) => {
    const [bundle, setBundle] = useRecoilState(bundleAtom);
    const [selected, setSelected] = useRecoilState(selectedAtom);

    useEffect(() => {
        const id = BundleUtils.getFirstIdOfType({ bundle, resourceType: "Library" });

        setSelected(id);
    }, [bundle]);

    const resource = BundleUtils.extractResource(bundle, selected);
    let content;

    if (resource?.resourceType === "Library") {
        const library = LibraryUtils.extractCqlFromLibrary(resource);

        content = <CqlWindow
            log={log}
            scriptId={resource.id}
            resized={resized}
            connections={connections}
            saveLibrary={_.debounce(saveLibrary({ bundle, setBundle, log }), 2000)}
            library={library}
            externalExecFunc={({ library, connection, connectionType, patientId }) => {
                return executePhenotype({ bundle, connection, connectionType, library, patientId, log })
            }}
        />
    } else if (resource?.resourceType === "ValueSet") {
        const codes = TerminologyUtils.valueSetToCodeArray(resource);

        content = <div className="phenotypeManager__valueSet"><ValueSet codes={codes} /></div>

    } else {
        content = null;
    }

    return (
        <div className="phenotypeManager__right">
            {content}
        </div>
    );
};

export default Right;