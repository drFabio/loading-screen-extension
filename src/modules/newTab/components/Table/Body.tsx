import React, { ReactNode } from "react";
import type { RowSource } from "../../../../types";
import { Cell } from "./Cell";

export const Body = ({
  rows,
  isRow,
}: {
  rows?: RowSource[];
  isRow?: boolean;
}) => {
  if (!rows) return null;
  const Wrapper = ({ children }: { children: ReactNode }) => {
    if (isRow) return <thead>{children}</thead>;
    return <tbody>{children}</tbody>;
  };

  return (
    <Wrapper>
      {rows.map((cells, index) => (
        <tr key={index}>
          {cells.map((cell, index) => {
            if (typeof cell === "string") {
              return (
                <Cell isRow={isRow} key={index}>
                  {cell}
                </Cell>
              );
            }
            const { rowSpan, colSpan, text } = cell;
            return (
              <Cell
                isRow={isRow}
                key={index}
                rowSpan={rowSpan}
                colSpan={colSpan}
              >
                {text}
              </Cell>
            );
          })}
        </tr>
      ))}
    </Wrapper>
  );
};
