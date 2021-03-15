import React, { useState, useEffect } from "react";
import { Tabs, Tab, Icon, Menu, MenuItem } from "@blueprintjs/core";

import { PhenotypeManager } from "@phema/phenotype-manager";

// See https://github.com/palantir/blueprint/issues/3891
import { ContextMenuTarget } from "@blueprintjs/core/lib/esnext/components/context-menu/contextMenuTarget.js";

import Welcome from "./Welcome";
import { CqlWindow } from "@phema/workbench-common";
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

const renderCqlTab = (tab, resized, connections, saveLibrary, selectedTab, setSelectedTab) => (
  <Tab
    key={tab.id}
    id={tab.id}
    title={<ContextMenuCqlHeader />}
    panel={
      <div className="details__cqlContainer">
        <CqlWindow
          scriptId={tab.id}
          resized={resized}
          library={tab.library}
          connections={connections}
          saveLibrary={saveLibrary}
        />
      </div>
    }
  />
);

const renderTerminologyManagerTab = (tab, connections, selectedTab, setSelectedTab, saveTerminologyBundle) => {
  return <Tab
    key={tab.id}
    id={tab.id}
    title={<TerminologyManagerTabHeader />}
    panel={<TerminologyManagerWindow connections={connections} id={tab.id} bundle={tab.bundle} saveTerminologyBundle={saveTerminologyBundle} />}
  />
};

const PhenotypeManagerTabHeader = () => (
  <div className="details__phenotypeTabHeader">
    <span className="phenotype__logo" /> Phenotype
  </div>
);


const renderPhenotypeTab = (tab, connections, savePhenotype, selectedTab, setSelectedTab) => {
  return <Tab
    key={tab.id}
    id={tab.id}
    title={<PhenotypeManagerTabHeader />}
    panel={<PhenotypeManager bundle={tab.bundle} connections={connections} savePhenotype={savePhenotype} />}
  />
};

const renderTabs = (tabs, resized, connections, saveLibrary, saveTerminologyBundle, savePhenotype, selectedTab, setSelectedTab) => {
  return tabs.map((tab) => {
    if (tab.library !== undefined) {
      return renderCqlTab(tab, resized, connections, saveLibrary, selectedTab, setSelectedTab);
    } else if (tab.type === "phenotype") {
      return renderPhenotypeTab(tab, connections, savePhenotype, selectedTab, setSelectedTab);
    } else {
      return renderTerminologyManagerTab(tab, connections, selectedTab, setSelectedTab, saveTerminologyBundle);
    }
  });
};

const Details = (props) => {
  const { tabs, resized, connections, saveLibrary, saveTerminologyBundle, savePhenotype, selectedTab, setSelectedTab } = props;

  const title = (
    <div className="details__welcome">
      <Icon icon="info-sign" /> Welcome
    </div>
  );

  return (
    <div className="detailsContainer">
      <Tabs
        id="details"
        selectedTabId={selectedTab}
        onChange={(tabId) => { setSelectedTab(tabId) }}
        large
      >
        <Tab key="welcome" id="welcome" title={title} panel={<Welcome />} />
        {renderTabs(tabs, resized, connections, saveLibrary, saveTerminologyBundle, savePhenotype, selectedTab, setSelectedTab)}
      </Tabs>
    </div>
  );
};

export default Details;
