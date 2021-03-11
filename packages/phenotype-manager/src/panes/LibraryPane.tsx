import React from "react";

import { Toolbar } from "@phema/workbench-common";

const LibraryPane = () => {
  return (
    <div className="phenotypeManager__terminologyPane">
      <Toolbar
        title="Library"
        className="phenotypeManager__terminologyPane__toolbar"
        leftChildren={""}
        rightChildren={""}
      />
      Lib
    </div>
  );
};

export default LibraryPane;
