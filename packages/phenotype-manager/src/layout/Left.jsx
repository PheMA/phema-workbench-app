import React, { useCallback } from 'react';
import _ from "lodash";

import { useDropzone } from 'react-dropzone'

import { useRecoilState } from "recoil";
import { ActionHeader, ListPane } from "@phema/workbench-common";
import { BundleUtils, LibraryUtils } from "@phema/fhir-utils";

import { PhenotypeToaster } from "../PhenotypeToaster";

import { bundleAtom, selectedAtom } from "../state/atoms";

import { Intent } from "@blueprintjs/core";

const removeResourceFromBundle = (log, bundle, setBundle) => (index, id) => {
    log(`Removing resource ${id} from phenotype bundle`);

    const newBundle = BundleUtils.removeResourceFromBundle({ bundle, index });

    setBundle(newBundle);
}

const onNodeClick = (log, setSelected) => (node, nodePath, evt) => {
    log(`Resource ${node.id} selected`);

    setSelected(node.id);
}

const processFiles = async (log, bundle, setBundle, files) => {
    let newBundle = _.cloneDeep(bundle);

    const processResource = (log, resource) => {
        // TODO: handle errors

        if (!BundleUtils.bundleContainsResourceWithId({ bundle: newBundle, id: resource.id })) {
            log(`Adding resource ${resource.id} to bundle`);

            newBundle = BundleUtils.addResourceToBundle({ bundle: newBundle, resource });
        } else {
            log(`Phenotype already includes resource with id ${resource.id}`);
            PhenotypeToaster.show({
                message: `Phenotype already includes resource with id ${resource.id}`,
                intent: Intent.WARNING,
                icon: "warning-sign",
            })
        }

        const title = resource.title || resource.name || resource.url;
        const message = `Successfully added resource "${title}" to phenotype`;

        log(message);

        return message;
    };

    for (const file of files) {
        if (file.name.endsWith(".cql")) {

        } else if (file.name.endsWith(".json")) {
            const text = await file.text();

            const resource = JSON.parse(text);

            if (resource.resourceType === "Bundle") {
                let count = 0;

                resource.entry?.forEach(entry => {
                    if (["ValueSet", "Library"].includes(entry.resource?.resourceType)) {
                        processResource(log, entry.resource);

                        count++;
                    }
                });

                PhenotypeToaster.show({
                    message: `Successfully added ${count} resources to phenotype`,
                    intent: Intent.SUCCESS,
                    icon: "tick",
                })
            } else if (["ValueSet", "Library"].includes(resource.resourceType)) {
                processResource(log, resource);
            } else {
                PhenotypeToaster.show({
                    message: `File ${file.name} does not contain a Library, ValueSet or Bundle resource.`,
                    intent: Intent.WARNING,
                    icon: "warning-sign",
                })
            }
        }
    }

    setBundle(newBundle);
}

const newLibrary = ({ log, bundle, setBundle }) => () => {
    const newLib = LibraryUtils.newEmptyLibrary();

    log(`Adding new library with id '${newLib.id}'`);

    const newBundle = BundleUtils.addResourceToBundle({
        bundle,
        resource: newLib,
        method: 'PUT',
        url: `Library/${newLib.id}`
    });

    setBundle(newBundle);
};

const Left = ({ log }) => {
    const [bundle, setBundle] = useRecoilState(bundleAtom);
    const [selected, setSelected] = useRecoilState(selectedAtom);

    console.log("LEFT RENDERING", bundle);

    const onDrop = useCallback(acceptedFiles => {
        processFiles(log, bundle, setBundle, acceptedFiles);
    }, [bundle])
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true, accept: ".json, .cql" })

    return (
        <div className={`phenotypeManager__left ${isDragActive ? "dragActive" : ""}`} {...getRootProps()}>
            <input {...getInputProps()} />
            <ActionHeader title="Logic Libraries" addAction={newLibrary({ log, bundle, setBundle })} addText={"New"} />
            <div className="phenotypeManager__left__libraries">
                <ListPane
                    onNodeClick={onNodeClick(log, setSelected)}
                    selectedId={bundleAtom}
                    itemIcon={"cube-add"}
                    bundle={bundle}
                    toaster={PhenotypeToaster}
                    resourceTypes={["Library"]}
                    hideTitles={true}
                    selectedId={selected}
                    removeResourceFromBundle={removeResourceFromBundle(log, bundle, setBundle)} /></div>
            <ActionHeader title="Terminologies" addAction={open} addText={"Add"} />
            <div className="phenotypeManager__left__terminologies">
                <ListPane
                    onNodeClick={onNodeClick(log, setSelected)}
                    selectedId={bundleAtom}
                    itemIcon={"th"}
                    bundle={bundle}
                    toaster={PhenotypeToaster}
                    resourceTypes={["ValueSet"]}
                    hideTitles={true}
                    selectedId={selected}
                    removeResourceFromBundle={removeResourceFromBundle(log, bundle, setBundle)} />
            </div>
        </div >
    );
};

export default Left;