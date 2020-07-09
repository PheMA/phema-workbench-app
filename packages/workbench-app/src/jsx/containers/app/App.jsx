import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { Header, Main, Footer } from "../../components";

const addCqlScript = (localForage, setCqlScripts, setSelectedTab) => () => {
  localForage.getItem("cqlScripts").then((cqlScripts) => {
    if (cqlScripts === null) {
      cqlScripts = [];
    }

    const tabId = uuid();

    setSelectedTab(tabId);

    cqlScripts.push({ id: tabId, library: "" });

    localForage.setItem("cqlScripts", cqlScripts).then(() => {
      setCqlScripts(cqlScripts);
    });
  });
};

const saveLibrary = (localForage, setCqlScripts) => (id, library) => {
  localForage.getItem("cqlScripts").then((scripts) => {
    const newScripts = scripts.map((lib) => {
      if (lib.id == id) {
        return {
          id,
          library,
        };
      } else {
        return lib;
      }
    });

    localForage.setItem("cqlScripts", newScripts).then(() => {
      setCqlScripts(newScripts);
    });
  });
};

const addTerminologyManager = (
  localForage,
  setTerminologyManagers,
  setSelectedTab
) => () => {
  localForage.getItem("terminologyManagers").then((terminologyManagers) => {
    if (terminologyManagers == null) {
      terminologyManagers = [];
    }

    const tabId = uuid();

    setSelectedTab(tabId);

    terminologyManagers.push({ id: tabId, bundle: undefined });

    localForage.setItem("terminologyManagers", terminologyManagers).then(() => {
      setTerminologyManagers(terminologyManagers);
    });
  });
};

const App = (props) => {
  const { localForage } = props;

  const [cqlScripts, setCqlScripts] = useState([]);
  const [terminologyManagers, setTerminologyManagers] = useState([]);

  useEffect(() => {
    localForage.getItem("cqlScripts").then((cqlScripts) => {
      setCqlScripts(cqlScripts ? cqlScripts : []);
    });
  }, []);

  useEffect(() => {
    localForage.getItem("terminologyManagers").then((terminologyManagers) => {
      setTerminologyManagers(terminologyManagers ? terminologyManagers : []);
    });
  }, []);

  const [selectedTab, setSelectedTab] = useState(undefined);

  return (
    <div className="app">
      <Header
        localForage={localForage}
        addCqlScript={addCqlScript(localForage, setCqlScripts, setSelectedTab)}
        addTerminologyManager={addTerminologyManager(
          localForage,
          setTerminologyManagers,
          setSelectedTab
        )}
      />
      <Main
        saveLibrary={saveLibrary(localForage, setCqlScripts)}
        localForage={localForage}
        cqlScripts={cqlScripts}
        terminologyManagers={terminologyManagers}
        selectedTab={selectedTab}
      />
      <Footer />
    </div>
  );
};

export default App;
