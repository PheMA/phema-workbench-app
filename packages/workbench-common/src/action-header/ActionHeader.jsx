import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputGroup } from "@blueprintjs/core";

import "./ActionHeader.scss";

const ActionHeader = (props) => {
  const [filter, setFilter] = useState("");

  return (
    <div className="actionHeader">
      <div className="actionHeader__title">{props.title}</div>
      <div className="actionHeader__actions">
        {props.searchAction && (
          <InputGroup
            id="search-action"
            leftIcon="search"
            onChange={(event) => {
              setFilter(event.target.value);
              props.searchAction(event.target.value);
            }}
            placeholder="Search"
            value={filter}
            round={true}
          />
        )}
        {props.addAction && (
          <Button icon="add" onClick={props.addAction}>
            {props.addText}
          </Button>
        )}
      </div>
    </div>
  );
};

ActionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  addAction: PropTypes.func,
  searchAction: PropTypes.func,
  addText: PropTypes.string,
};

export default ActionHeader;
