import React from 'react';
import { Graphviz } from 'graphviz-react';
import "./PhenotypeVisualizer.scss";

const PhenotypeVisualizer: React.FC = ({ dotsrc }) => {
  const options = {
    fit: false,
    scale: 1,
    width: "100vw",
    height: "100vh",
    zoom: false
  }
  return (
    <div className="phenotypeVisualizer">
      <Graphviz dot={dotsrc} options={options} />
    </div>
  );
};

export default PhenotypeVisualizer;
