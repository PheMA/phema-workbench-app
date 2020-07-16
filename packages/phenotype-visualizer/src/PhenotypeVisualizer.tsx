import React from "react";

import dot from "graphlib-dot";
import DagreGraph from "dagre-d3-react";

import "./PhenotypeVisualizer.scss";

const PhenotypeVisualizer: React.FC = ({ dotsrc }) => {
  const graph = dot.read(dotsrc);

  const nodes = Object.keys(graph._nodes).map((key) => {
    return {
      id: key,
      label: graph._nodes[key].label,
    };
  });

  const links = Object.keys(graph._edgeObjs).map((key) => {
    return {
      source: graph._edgeObjs[key].v,
      target: graph._edgeObjs[key].w,
    };
  });

  const config = {
    rankdir: "TB",
    align: "UR",
    ranker: "tight-tree",
  };

  return (
    <div className="phenotypeVisualizer">
      <DagreGraph
        width="100%"
        height="100%"
        nodes={nodes}
        links={links}
        config={config}
      />
    </div>
  );
};

export default PhenotypeVisualizer;
