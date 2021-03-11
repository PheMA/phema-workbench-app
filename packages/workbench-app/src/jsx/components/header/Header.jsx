import React from "react";
import { Button, Popover } from "@blueprintjs/core";

import Menu from "./Menu";

const PhemaWorkbenchHeader = (props) => {
  const { addCqlScript, addTerminologyManager, addPhenotypeManager } = props;

  return (
    <div className="header">
      <div className="header__logo" />
      <span className="header__text">PHEMA WORKBENCH</span>
      <div className="header__group__right">
        <Popover
          content={
            <Menu
              addCqlScript={addCqlScript}
              addTerminologyManager={addTerminologyManager}
              addPhenotypeManager={addPhenotypeManager}
            />
          }
        >
          <Button minimal icon="menu" rightIcon="caret-down" text="Menu" />
        </Popover>
      </div>
    </div>
  );
};

export default PhemaWorkbenchHeader;
