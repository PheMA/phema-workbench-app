import React from 'react';
import { useRecoilState } from "recoil";
import _ from "lodash";

import { BundleUtils, LibraryUtils, TerminologyUtils } from "@phema/fhir-utils";
import { CqlWindow, ValueSet } from "@phema/workbench-common";

import LibraryPane from '../panes/LibraryPane';

import { bundleAtom, selectedAtom } from "../state/atoms";

const resized = () => {
    document
        .getElementById("phemaWorkbenchMain")
        .dispatchEvent(new Event("phema-workbench-resized"));
};

const saveLibrary = (log) => (library) => {
    log("Saving library");
}

const Right = ({ log, connections, repoUrl }) => {
    const [bundle, setBundle] = useRecoilState(bundleAtom);
    const [selected, setSelected] = useRecoilState(selectedAtom);

    if (!selected) {
        return null;
    }

    const resource = BundleUtils.extractResource(bundle, selected);
    let content;

    if (resource?.resourceType === "Library") {
        const library = LibraryUtils.extractCqlFromLibrary(resource);

        content = <CqlWindow
            scriptId={resource.id}
            resized={resized}
            connections={connections}
            saveLibrary={_.debounce(saveLibrary(log), 2000)}
            library={library}
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