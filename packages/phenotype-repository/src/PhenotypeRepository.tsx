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
} from "@blueprintjs/core";
import Dropzone from "react-dropzone";
import numeral from "numeral";
import moment from "moment";

import { ActionHeader } from "@phema/workbench-common";
import { PheKB } from "@phema/phekb-api";

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

const PhenotypeItem = (item, index) => {
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
        <Button icon="play" minimal />
        <AnchorButton
          icon="globe-network"
          minimal
          href={item.uri.replace("/api", "")}
          target="_blank"
        />
      </div>
    </div>
  );
};

PhenotypeItem.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const PhenotypeList = ({ phenotypes }) => {
  if (!phenotypes) return null;

  return (
    <div className="phenotypes__list">
      {phenotypes.map((item, index) => PhenotypeItem(item, index))}
    </div>
  );
};

const PhenotypesRepository: React.FC<PhenotypeRepositoryProps> = ({
  phekbUrl,
}) => {
  let [phenotypes, setPhenotypes] = useState([]);

  // TODO: Move this to config
  const phekb = new PheKB(
    "https://cors.phema.science:4321/http://dev-phekb.pantheonsite.io/api/"
  );

  useEffect(() => {
    const getData = async () => {
      let list = await phekb.getPhenotypes(100);

      setPhenotypes(list);
    };

    getData();

    return;
  }, []);

  return (
    <div className="phenotypes">
      <ActionHeader
        title="Phenotypes"
        searchAction={(filter) => {
          console.log(filter);
        }}
        addText="Add"
      />
      <PhenotypeList phenotypes={phenotypes} />
    </div>
  );
};

export default PhenotypesRepository;
