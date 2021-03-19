import React, { useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Toaster,
  Position,
  Dialog,
  Button,
  AnchorButton,
  Icon,
  Spinner,
  NonIdealState,
  Tree,
  Tooltip,
} from "@blueprintjs/core";
import Dropzone from "react-dropzone";
import numeral from "numeral";
import moment from "moment";

import { ActionHeader } from "@phema/workbench-common";
import { PheKB } from "@phema/phekb-api";
import Logger from "@phema/workbench-logger";

// TODO: Migrate to recoil and away from global state
import { phenotypeListSelector } from "../../workbench-app/src/store/phenotypes/selectors";
import { fetchPhenotypeList } from "../../workbench-app/src/store/phenotypes/actions";

import "./PhenotypeRepository.scss";

const log = Logger.prefixLogger("repository");

interface PhenotypeSummaryProps {
  uri: string;
  phekb: PheKB;
}

const PhenotypeSummary: React.RC<PhenotypeSummaryProps> = ({ phenotype }) => {
  return (
    <div
      className="phenotype__summary"
      dangerouslySetInnerHTML={{ __html: phenotype.body.und[0].safe_value }}
    />
  );
};

const PhenotypeItem = ({ item, index, phekb }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div key={index} className="phenotypes__list__item">
      <div className="phenotypes__list__item__title">
        <div className="phenotypes__list__item__icon">
          <Icon icon="dot" />
        </div>
        <div className="phenotypes__list__item__name">
          <span className="phenotypes__list__item__name__link">
            <a href="#">{item.title}</a>
          </span>

          <span className="phenotypes__list__item__date">
            {moment.unix(item.created).format("MMM Do, YYYY")}
          </span>
        </div>
      </div>
      <div className="phenotypes__list__item__actions">
        <Button icon="play" minimal onClick={() => setModalOpen(true)} />
        <AnchorButton
          icon="globe-network"
          minimal
          href={item.path}
          target="_blank"
        />
        <Dialog
          isOpen={modalOpen}
          title={item.title}
          style={{ width: "800px" }}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <PhenotypeSummary phenotype={item} />
        </Dialog>
      </div>
    </div>
  );
};

const handleNodeClick = (
  node,
  path,
  nodeData,
  phenotypes,
  setPhenotypes,
  phekb
) => {
  if (path.length == 1) {
    // clicked a root node

    // This sucks for performance
    const updated = _.cloneDeep(phenotypes);

    const clickedIndex = phenotypes.findIndex((p) => {
      return p.summary.nid === node.id;
    });

    updated[clickedIndex].isExpanded = !phenotypes[clickedIndex].isExpanded;

    setPhenotypes(updated);
  }
};

const phenotypesToTreeNodes = (
  phenotypes,
  setPhenotypes,
  phekb,
  importFunc
) => {
  const nodes = phenotypes.map((p) => {
    let children;
    let hasComputable = false;

    if (p.details?.field_phema_phenotype?.und?.length > 0) {
      hasComputable = true;

      children = p.details.field_phema_phenotype.und.map((file) => {
        return {
          id: file.fid,
          hasCaret: false,
          icon: "people",
          label: file.filename,
          nodeData: file,
          secondaryLabel: (
            <div className="phemaWorkbench__import">
              <Tooltip content="Import">
                <Button
                  minimal
                  icon="import"
                  onClick={async () => {
                    phekb.getFile(file.uri).then(importFunc);
                  }}
                />
              </Tooltip>
            </div>
          ),
        };
      });
    } else {
      children = [
        {
          id: `${p.summary.nid}-children`,
          hasCaret: false,
          icon: "issue",
          label: "No executable phenotype definitions",
        },
      ];
    }

    return {
      id: p.summary.nid,
      className: hasComputable ? "phenotypes__list__hasExecutable" : "",
      hasCaret: true,
      icon: "folder-close",
      label: p.summary.title,
      nodeData: p,
      disabled: !p.accessible,
      secondaryLabel: !p.accessible ? "private" : undefined,
      isExpanded: p.isExpanded,
      childNodes: children,
    };
  });

  return nodes;
};

const PhenotypeList = ({
  phenotypes,
  filter,
  setPhenotypes,
  phekb,
  importFunc,
}) => {
  const filtered = phenotypes.filter((p) =>
    p.summary.title.toUpperCase().includes(filter.toUpperCase())
  );

  const nodes = phenotypesToTreeNodes(
    filtered,
    setPhenotypes,
    phekb,
    importFunc
  );

  return (
    <div className="phenotypes__list">
      <Tree
        contents={nodes}
        onNodeClick={(node, path, nodeData) => {
          handleNodeClick(
            node,
            path,
            nodeData,
            phenotypes,
            setPhenotypes,
            phekb
          );
        }}
        onNodeExpand={(node, path, nodeData) => {
          handleNodeClick(
            node,
            path,
            nodeData,
            phenotypes,
            setPhenotypes,
            phekb
          );
        }}
        onNodeCollapse={(node, path, nodeData) => {
          handleNodeClick(
            node,
            path,
            nodeData,
            phenotypes,
            setPhenotypes,
            phekb
          );
        }}
      />
    </div>
  );
};

interface PhenotypeRepositoryProps {
  phekbUrl?: string;
  importFunc: (phenotype: object) => void;
}

const PhenotypesRepository: React.FC<PhenotypeRepositoryProps> = ({
  phekbUrl,
  importFunc,
}) => {
  let [phenotypes, setPhenotypes] = useState(undefined);
  let [error, setError] = useState(undefined);
  let [filter, setFilter] = useState("");

  // TODO: Move this to config
  const phekb = new PheKB(
    phekbUrl ||
      "https://cors.phema.science:4321/http://dev-phekb.pantheonsite.io/api"
  );

  useEffect(() => {
    log("Fetching phenotypes");

    const getData = async () => {
      try {
        const list = await phekb.getPhenotypes(20);

        const wrapped = list.map((p) => {
          return {
            summary: p,
            accessible: true,
          };
        });

        setPhenotypes(wrapped);

        return wrapped;
      } catch (err) {
        setError(err);
      }
    };

    const getDetails = async (list) => {
      // Get details where possible
      const promises = list.map((phenotype) => {
        return phekb
          .getPhenotypeById(phenotype.summary.nid)
          .then((details) => {
            return Promise.resolve(details);
          })
          .catch((err) => {
            return Promise.resolve(err);
          });
      });

      const updated = _.cloneDeep(list);

      return Promise.all(promises).then((details) => {
        details.forEach((detail, idx) => {
          if (typeof detail == "string") {
            updated[idx].accessible = false;
          } else {
            updated[idx].details = detail;
          }
        });
        setPhenotypes(updated);
      });
    };

    getData().then(getDetails);

    return;
  }, []);

  if (error) {
    return (
      <NonIdealState
        icon={"offline"}
        title="Error retrieving phenotypes"
        description={error}
      />
    );
  } else if (!phenotypes) {
    return <Spinner className="phenotypes_loading" />;
  } else {
    return (
      <div className="phenotypes">
        <ActionHeader
          title="Phenotypes"
          searchAction={(filter) => {
            setFilter(filter);
          }}
          addText="Add"
        />
        <PhenotypeList
          phenotypes={phenotypes}
          filter={filter}
          setPhenotypes={setPhenotypes}
          phekb={phekb}
          importFunc={importFunc}
        />
      </div>
    );
  }
};

export default PhenotypesRepository;
