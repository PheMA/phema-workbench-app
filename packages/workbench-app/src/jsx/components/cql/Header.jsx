import React, { useState } from "react";

import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { ConnectionSelector } from "@phema/workbench-common";

const Header = (props) => {
  const { connections, execute } = props;

  const [selected, setSelected] = useState(undefined);

  return (
    <div className="cqlWindow__header">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <span className="cqlWindow__header__title">CQL EDITOR</span>
          </Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="download" text="Download" />
          <Button className="bp3-minimal" icon="trash" text="Delete" />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <div className="cqlWindow__header__runner">
            <ConnectionSelector
              connections={connections}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <Button
            disabled={!selected}
            minimal={true}
            rightIcon="play"
            intent="success"
            text="Run"
            onClick={() => {
              execute(selected);
            }}
          />
        </Navbar.Group>
      </Navbar>
    </div>
  );
};

export default Header;
