import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { R4 } from "@ahryman40k/ts-fhir-types";

interface UploadPaneProps {
  bundle: R4.IBundle;
  setBundle: (bundle: R4.IBundle) => void;
}

const UploadPane: React.FC<UploadPaneProps> = ({ bundle, setBundle }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="terminologyManager__uploadPane">
      <div
        className="terminologyManager__uploadPane__dropzone"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export { UploadPane, UploadPaneProps };
