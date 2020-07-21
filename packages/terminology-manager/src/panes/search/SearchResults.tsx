import React, { useState, useEffect } from "react";

import { R4 } from "@ahryman40k/ts-fhir-types";

import { HTMLTable, Button, Dialog } from "@blueprintjs/core";

import { TerminologyUtils, FHIRUtils } from "@phema/fhir-utils";

interface SearchResultsProps {
  bundle: R4.IBundle;
  fhirConnection: FHIRConnection;
  addValueSetToBundle: (resource: R4.IValueSet) => void;
}

interface valueSetToExpansionProps {
  valueSet: R4.IValueSet;
}

const ValueSetExpansion: React.RC<valueSetToExpansionProps> = ({
  valueSet,
}) => {
  if (!valueSet?.expansion?.contains) {
    return null;
  }

  const rows = valueSet.expansion.contains.map((code) => {
    return (
      <tr key={code.code}>
        <td>{code.code}</td>
        <td>{code.display}</td>
        <td>{code.version}</td>
        <td>{code.system}</td>
      </tr>
    );
  });

  return (
    <HTMLTable>
      <thead>
        <tr>
          <th>Code</th>
          <th>Display</th>
          <th>Version</th>
          <th>System</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </HTMLTable>
  );
};

const SearchResults: React.FC<SearchResultsProps> = ({
  bundle,
  fhirConnection,
  addValueSetToBundle,
}) => {
  if (!bundle) {
    return null;
  }

  const [valueSetToExpand, setValueSetToExpand] = useState(undefined);
  const [valueSetExpansion, setValueSetExpansion] = useState(undefined);

  useEffect(() => {
    if (!valueSetToExpand) {
      setValueSetExpansion(undefined);
      return;
    }

    TerminologyUtils.expand({
      fhirConnection,
      valueSetId: valueSetToExpand,
    }).then((valueSet) => {
      setValueSetExpansion(valueSet);
    });
  }, [valueSetToExpand]);

  if (bundle.entry) {
    const rows = bundle.entry.map((entry) => {
      const { resource } = entry;
      return (
        <tr key={resource.id}>
          <td>{resource.id}</td>
          <td>{resource.name}</td>
          <td>{resource.version}</td>
          <td>{resource.publisher}</td>
          <td>
            <div className="terminologyManager__searchPane__results__actions">
              <Button
                minimal
                onClick={() => {
                  setValueSetToExpand(resource.id);
                }}
              >
                Expand
              </Button>
              <Button
                minimal
                onClick={() => {
                  FHIRUtils.get({
                    fhirConnection: fhirConnection,
                    resourceType: "ValueSet",
                    resourceId: resource.id as string,
                  }).then((valueSet) => {
                    addValueSetToBundle(valueSet);
                  });
                }}
              >
                Add
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <>
        <HTMLTable>
          <thead>
            <tr>
              <th>OID</th>
              <th>Name</th>
              <th>Version</th>
              <th>Publisher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </HTMLTable>
        <Dialog
          title={`Codes in ${valueSetExpansion?.name} Value Set (${valueSetToExpand})`}
          className="terminologyManager__valueSetExpansion"
          isOpen={!!valueSetExpansion}
          onClose={() => {
            setValueSetExpansion(undefined);
          }}
        >
          <ValueSetExpansion valueSet={valueSetExpansion} />
        </Dialog>
      </>
    );
  } else {
    return null;
  }

  return <div>results</div>;
};

export { SearchResults };
