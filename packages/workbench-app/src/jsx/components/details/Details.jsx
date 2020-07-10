import React, { useState, useEffect } from "react";
import { Tabs, Tab, Icon, Menu, MenuItem } from "@blueprintjs/core";

// See https://github.com/palantir/blueprint/issues/3891
import { ContextMenuTarget } from "@blueprintjs/core/lib/esnext/components/context-menu/contextMenuTarget.js";

import Welcome from "./Welcome";
import { CqlWindow } from "../cql";
import { TerminologyManagerWindow } from "../terminology";

const ContextMenuCqlHeader = ContextMenuTarget(
  class CqlTabHeader extends React.Component {
    renderContextMenu() {
      // return a single element, or nothing to use default browser behavior
      return (
        <Menu>
          <MenuItem icon="download" onClick={this.handleSave} text="Download" />
          <MenuItem icon="trash" onClick={this.handleDelete} text="Delete" />
        </Menu>
      );
    }

    render() {
      return (
        <div className="details__cqlTabHeader">
          <Icon icon="document" /> CQL Script
        </div>
      );
    }
  }
);

const TerminologyManagerTabHeader = () => (
  <div className="details__terminologyTabHeader">
    <Icon icon="translate" /> Terminology Manager
  </div>
);

const renderCqlTab = (tab, resized, connections, saveLibrary) => (
  <Tab
    key={tab.id}
    id={tab.id}
    title={<ContextMenuCqlHeader />}
    panel={
      <CqlWindow
        scriptId={tab.id}
        resized={resized}
        library={tab.library}
        connections={connections}
        saveLibrary={saveLibrary}
      />
    }
  />
);

const renderTerminologyManagerTab = (tab, connections) => (
  <Tab
    key={tab.id}
    id={tab.id}
    title={<TerminologyManagerTabHeader />}
    panel={<TerminologyManagerWindow connections={connections} />}
  />
);

const renderTabs = (tabs, resized, connections, saveLibrary) => {
  return tabs.map((tab) => {
    return tab.library !== undefined
      ? renderCqlTab(tab, resized, connections, saveLibrary)
      : renderTerminologyManagerTab(tab, connections);
  });
};

const Details = (props) => {
  const { tabs, selectedTab, resized, connections, saveLibrary } = props;

  const [selectedTabId, setSelectedTabId] = useState("welcome");

  useEffect(() => {
    setSelectedTabId(selectedTab);
  }, [selectedTab]);

  const title = (
    <div className="details__welcome">
      <Icon icon="info-sign" /> Welcome
    </div>
  );

  return (
    <div className="detailsContainer">
      <Tabs
        id="details"
        selectedTabId={selectedTabId}
        onChange={setSelectedTabId}
        large
      >
        <Tab key="welcome" id="welcome" title={title} panel={<Welcome />} />
        {renderTabs(tabs, resized, connections, saveLibrary)}
      </Tabs>
    </div>
  );
};

export default Details;
