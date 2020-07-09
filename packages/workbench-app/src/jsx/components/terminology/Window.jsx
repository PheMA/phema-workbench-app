import React from "react";

import { TerminologyManager } from "@phema/terminology-manager";
import Toolbar from "../common/Toolbar";

const TerminologyManagerWindow = () => {
  return (
    <div className="cqlWindow__wrapper">
      <Toolbar
        title="TERMINOLOGY MANAGER"
        className="terminologyManager__toolbar"
      />
      <div className="terminologyManager__wrapper__pane">
        <TerminologyManager />
      </div>
    </div>
  );
};

export { TerminologyManagerWindow };
