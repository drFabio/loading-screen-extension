import React, { ReactNode } from "react";

export const Cell = ({
  isRow,
  children,
  rowSpan,
  colSpan,
}: {
  isRow?: boolean;
  colSpan?: number;
  rowSpan?: number;
  children: ReactNode;
}) => {
  return isRow ? (
    <th rowSpan={rowSpan} colSpan={colSpan}>
      {children}
    </th>
  ) : (
    <td rowSpan={rowSpan} colSpan={colSpan}>
      {children}
    </td>
  );
};
