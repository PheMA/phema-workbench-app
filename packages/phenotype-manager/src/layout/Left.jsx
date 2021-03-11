import React from 'react';
import { useRecoilState } from "recoil";
import { ActionHeader, ListPane } from "@phema/workbench-common";
import { BundleUtils } from "@phema/fhir-utils";

import { PhenotypeToaster } from "../PhenotypeToaster";

import { bundleAtom, selectedAtom } from "../state/atoms";

const removeResourceFromBundle = (log, bundle, setBundle) => (index, id) => {
    log(`Removing resource ${id} from phenotype bundle`);

    const newBundle = BundleUtils.removeResourceFromBundle({ bundle, index });

    setBundle(newBundle);
}

const onNodeClick = (log, setSelected) => (node, nodePath, evt) => {
    log(`Resource ${node.id} selected`);

    setSelected(node.id);
}

const Left = ({ log }) => {
    const [bundle, setBundle] = useRecoilState(bundleAtom);
    const [selected, setSelected] = useRecoilState(selectedAtom);

    return (
        <div className="phenotypeManager__left">
            <ActionHeader title="Logic Libraries" />
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
            <ActionHeader title="Terminologies" />
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
        </div>
    );
};

export default Left;