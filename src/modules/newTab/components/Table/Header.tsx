import React from "react";
import type { RowSource } from "../../../../types";

export const Header = ({ rows }: { rows?: RowSource[] }) => {
  if (!rows) return null;
  return (
    <thead>
      {rows.map((cells, index) => (
        <tr key={index}>
          {cells.map((cell, index) => {
            if (typeof cell === "string") {
              return <th key={index}>{cell}</th>;
            }
            const { rowSpan, colSpan, text } = cell;
            return (
              <th key={index} rowSpan={rowSpan} colSpan={colSpan}>
                {text}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
