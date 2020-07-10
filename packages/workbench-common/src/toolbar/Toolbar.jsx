import React from "react";

import { Navbar, Alignment } from "@blueprintjs/core";

import "./Toolbar.scss";

const Toolbar = ({ title, leftChildren, rightChildren, className }) => {
  return (
    <div className={`${className} toolbar__header`}>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <span className={`${className} toolbar__header__title`}>
              {title}
            </span>
          </Navbar.Heading>
          <Navbar.Divider />
          {leftChildren}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>{rightChildren}</Navbar.Group>
      </Navbar>
    </div>
  );
};

export default Toolbar;
