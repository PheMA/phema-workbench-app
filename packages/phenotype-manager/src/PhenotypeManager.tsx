import React from "react";
import { RecoilRoot, atom } from "recoil";

import Main from "./layout/Main";

import "./PhenotypeManager.scss";

const PhenotypeManager = ({ bundle, connections, repoUrl }) => {
  return (
    <RecoilRoot>
      <Main inputBundle={bundle} connections={connections} repoUrl={repoUrl} />
    </RecoilRoot>
  );
};

export default PhenotypeManager;
