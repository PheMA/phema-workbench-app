import React from "react";
import { RecoilRoot } from "recoil";

import Main from "./layout/Main";

import { useRecoilState } from "recoil";
import { bundleAtom } from "./state/atoms";

import "./PhenotypeManager.scss";

import data from "./state/data";

const PhenotypeManager = ({ bundle, connections, repoUrl, savePhenotype }) => {
  const initialBundle = bundle ? bundle : data;

  return (
    <RecoilRoot>
      <Main
        inputBundle={initialBundle}
        connections={connections}
        repoUrl={repoUrl}
        savePhenotype={savePhenotype}
      />
    </RecoilRoot>
  );
};

export default PhenotypeManager;
