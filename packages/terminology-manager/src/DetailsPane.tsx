import React from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";

interface DetailsPaneProps {
  valueset: R4.IValueSet;
}

const DetailsPane: React.FC<DetailPaneProps> = ({ valueset }) => {
  return <div className="terminologyManager__detailsPane">Details</div>;
};

export { DetailsPane, DetailsPaneProps };
