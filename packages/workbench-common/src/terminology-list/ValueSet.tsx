import React from "react";

import { HTMLTable } from "@blueprintjs/core";

interface ValueSetItem {
  code: string;
  display?: string;
  system?: string;
  version?: string;
}

interface ValueSetProps {
  codes: ValueSetItem[];
}

const ValueSet: React.RC<ValueSetProps> = ({ codes }) => {
  const rows = codes.map((code) => {
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

export default ValueSet;
