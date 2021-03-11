import * as React from "react";

import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

const PhemaMenu = (props) => {
  const { addCqlScript, addTerminologyManager, addPhenotypeManager } = props;

  return (
    <Menu>
      <MenuItem icon="play" text="New CQL Script" onClick={addCqlScript} />
      <MenuItem
        icon="translate"
        text="New Terminology Manager"
        onClick={addTerminologyManager}
      />
      <MenuItem icon="draw" text="New Phenotype" onClick={() => {
        addPhenotypeManager()
      }} />
      <MenuItem icon="cog" text="Settings" disabled={true} />
      <MenuDivider />
      <MenuItem
        icon="trash"
        text="Reset Workbench"
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      />
      <MenuDivider />
      <MenuItem
        target="_blank"
        href="https://projectphema.org/"
        icon="info-sign"
        text="About"
      />
    </Menu>
  );
};

export default PhemaMenu;
