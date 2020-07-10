import React from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";

interface SearchPaneProps {
  bundle: R4.IBundle;
  setBundle: (bundle: R4.IBundle) => void;
}

const SearchPane: React.FC<SearchPaneProps> = ({ bundle, setBundle }) => {
  return <div className="terminologyManager__searchPane">Search</div>;
};

export { SearchPane, SearchPaneProps };
