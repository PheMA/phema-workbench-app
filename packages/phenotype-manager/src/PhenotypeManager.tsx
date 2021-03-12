import React from "react";
import { RecoilRoot } from "recoil";

import Main from "./layout/Main";

import { useRecoilState } from "recoil";
import { bundleAtom } from "./state/atoms";

import "./PhenotypeManager.scss";

import data from "./state/data";

const PhenotypeManager = ({ bundle, connections, repoUrl }) => {
  return (
    <RecoilRoot>
      <Main inputBundle={data} connections={connections} repoUrl={repoUrl} />
    </RecoilRoot>
  );
};

export default PhenotypeManager;
