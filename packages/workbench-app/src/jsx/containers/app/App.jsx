import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

import { Header, Main, Footer } from "../../components";

import Logger from "@phema/workbench-logger";
import { emptyPhenotype } from "@phema/phenotype-utils";
import { readMany } from "graphlib-dot";

const log = Logger.prefixLogger("workbench-app");

const addCqlScript = (localForage, setCqlScripts, setSelectedTab) => () => {
  log("Adding new CQL script");

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
  log("Adding new Terminology Manager");

  localForage.getItem("terminologyManagers").then((terminologyManagers) => {
    if (terminologyManagers == null) {
      terminologyManagers = [];
    }

    const tabId = uuid();

    setSelectedTab(tabId);

    terminologyManagers.push({
      id: tabId, bundle: {
        resourceType: "Bundle",
        type: "batch",
        entry: [],
      }
    });

    localForage.setItem("terminologyManagers", terminologyManagers).then(() => {
      setTerminologyManagers(terminologyManagers);
    });
  });
};

const saveTerminologyBundle = (
  localForage,
  setTerminologyManagers,
  setSelectedTab
) => (id, bundle) => {
  localForage.getItem("terminologyManagers").then((terminologyManagers) => {
    const newTerminologyManagers = terminologyManagers.map(tm => {
      if (tm.id == id) {
        return {
          id, bundle
        }
      } else {
        return tm;
      }
    })

    localForage.setItem("terminologyManagers", newTerminologyManagers).then(() => {
      setTerminologyManagers(newTerminologyManagers);

      setSelectedTab(id);
    });
  });
};

const addPhenotypeManager = (
  localForage,
  setPhenotypeManagers,
  setSelectedTab
) => (phenotypeBundle) => {
  if (phenotypeBundle && phenotypeBundle.resourceType === "Bundle") {
    const title = phenotypeBundle.entry.find(e => e.resource.resourceType === "Composition").resource.title;

    log(`Importing ${title}`);
  } else {
    log("Adding new Phenotype");
  }

  localForage.getItem("phenotypeManagers").then((phenotypeManagers) => {
    if (phenotypeManagers == null) {
      phenotypeManagers = [];
    }

    const tabId = uuid();

    phenotypeManagers.push({ id: tabId, bundle: phenotypeBundle ? phenotypeBundle : emptyPhenotype(), type: "phenotype" });

    localForage.setItem("phenotypeManagers", phenotypeManagers).then(() => {
      setPhenotypeManagers(phenotypeManagers);

      setSelectedTab(tabId);
    })
  })
}

const App = (props) => {
  const { localForage } = props;

  const [cqlScripts, setCqlScripts] = useState([]);
  const [terminologyManagers, setTerminologyManagers] = useState([]);
  const [phenotypeManagers, setPhenotypeManagers] = useState([]);

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

  useEffect(() => {
    localForage.getItem("phenotypeManagers").then((phenotypeManagers) => {
      setPhenotypeManagers(phenotypeManagers ? phenotypeManagers : []);
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
        addPhenotypeManager={addPhenotypeManager(
          localForage,
          setPhenotypeManagers,
          setSelectedTab
        )}
      />
      <Main
        saveLibrary={saveLibrary(localForage, setCqlScripts)}
        localForage={localForage}
        cqlScripts={cqlScripts}
        terminologyManagers={terminologyManagers}
        saveTerminologyBundle={saveTerminologyBundle(localForage, setTerminologyManagers, setSelectedTab)}
        phenotypeManagers={phenotypeManagers}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        addPhenotypeManager={addPhenotypeManager(localForage, setPhenotypeManagers, setSelectedTab)}
      />
      <Footer />
    </div>
  );
};

export default App;
