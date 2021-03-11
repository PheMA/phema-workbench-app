import React, { useState, useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Toaster,
  Position,
  Dialog,
  Button,
  AnchorButton,
  Icon,
  Spinner,
  NonIdealState,
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

/*

const acceptedFiles = [".zip", ".ZIP"];

const PhemaWorkbenchToaster = Toaster.create({
  className: "toaster",
  position: Position.TOP,
});

const DropArea = (getRootProps, getInputProps, isDragActive) => (
  <div
    className={`dropArea${isDragActive ? "--active" : ""}`}
    {...getRootProps()}
  >
    <div className={`dropArea__text${isDragActive ? "--active" : ""}`}>
      Drop phenotypes here or click to select
    </div>
    <div className={`dropArea__icon${isDragActive ? "--active" : ""}`}>
      <Icon icon={isDragActive ? "confirm" : "add"} iconSize={45} />
    </div>
    <input {...getInputProps()} />
  </div>
);

class AddPhenotype extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
    };
  }

  queueFiles(files) {
    const queue = this.state.queue.concat(files);
    this.setState({ queue });
  }

  async handleUpload() {
    const files = this.state.queue;

    const transformFiles = (files) =>
      files.map((file) => {
        return {
          modified: file.lastModified,
          name: file.name,
          size: file.size,
        };
      });

    let phenotypes = await this.props.localForage.getItem("phenotypes");

    if (phenotypes == null) {
      phenotypes = transformFiles(files);
    } else {
      phenotypes = phenotypes.concat(transformFiles(files));
    }

    this.props.localForage.setItem("phenotypes", phenotypes);

    // clear the queue
    this.setState({
      queue: [],
    });

    // close the dialog
    this.props.onCancel();

    // reload from localStorage
    this.props.reloadStorage();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.queueFiles(acceptedFiles);

    if (rejectedFiles.length) {
      PhemaWorkbenchToaster.show({
        icon: "warning-sign",
        intent: "warning",
        message: "Only phenotype ZIP files are allowed.",
      });
    }
  }

  render() {
    const { onCancel } = this.props;

    return (
      <div className="addPhenotype">
        <Dropzone onDrop={this.onDrop.bind(this)} accept={acceptedFiles}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return DropArea(getRootProps, getInputProps, isDragActive);
          }}
        </Dropzone>
        <PhenotypeUploadQueue queue={this.state.queue} />
        <div className="addPhenotype__actions">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            intent="primary"
            icon="upload"
            onClick={this.handleUpload.bind(this)}
          >
            Upload
          </Button>
        </div>
      </div>
    );
  }
}

const PhenotypeUploadQueue = (props) => {
  if (props.queue.length === 0) {
    return null;
  }

  const items = props.queue.map((file, i) => (
    <li key={i}>
      <span className="addPhenotype__selected__phenotypes__name">
        {file.name}
      </span>
      <span className="addPhenotype__selected__phenotypes__size">
        {numeral(file.size).format("0.0 b")}
      </span>
      <span className="addPhenotype__selected__phenotypes__modified">
        Modified {moment(file.lastModified).format("lll")}
      </span>
    </li>
  ));

  return (
    <div className="addPhenotype__selected">
      <h5 className="bp3-heading addPhenotype__selected__title">
        SELECTED FILES
      </h5>
      <div className="addPhenotype__selected__phenotypes">
        <ul className="bp3-list">{items}</ul>
      </div>
    </div>
  );
};

*/

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

PhenotypeItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const PhenotypeList = ({ phenotypes, filter, phekb }) => {
  const filtered = phenotypes.filter((p) =>
    p.title.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <div className="phenotypes__list">
      {filtered.map((item, index) => (
        <PhenotypeItem key={index} item={item} index={index} phekb={phekb} />
      ))}
    </div>
  );
};

const findExecutablePhenotypes = async (list, phekb) => {
  log("Filtering executable phenotypes");

  const executables = list.map((p) =>
    phekb.getPhenotype(p.uri).then((phenotype) => {
      if (phenotype.nid) {
        if (phenotype.field_phema_phenotype.und) {
          return Promise.resolve(phenotype);
        } else {
          return Promise.resolve(null);
        }
      } else {
        return Promise.resolve(null);
      }
    })
  );

  let ex = await Promise.all(executables);

  return ex.filter((e) => e != null);
};

const PhenotypesRepository: React.FC<PhenotypeRepositoryProps> = ({
  phekbUrl,
}) => {
  let [phenotypes, setPhenotypes] = useState(undefined);
  let [error, setError] = useState(undefined);
  let [filter, setFilter] = useState("");

  // TODO: Move this to config
  const phekb = new PheKB(
    "https://cors.phema.science:4321/http://dev-phekb.pantheonsite.io/api"
  );

  useEffect(() => {
    log("Fetching phenotypes");

    const getData = async () => {
      try {
        // let list = await phekb.getPhenotypes(20);
        // log(`Fetched ${list.length} phenotypes`);
        // const filtered = await findExecutablePhenotypes(list, phekb);
        // log(`Found ${filtered.length} executable phenotypes`);
        // setPhenotypes(filtered);
      } catch (err) {
        setError(err);
      }
    };

    getData();

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
    return <div></div>; //<Spinner className="phenotypes_loading" />;
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
        <PhenotypeList phenotypes={phenotypes} filter={filter} phekb={phekb} />
      </div>
    );
  }
};

export default PhenotypesRepository;
