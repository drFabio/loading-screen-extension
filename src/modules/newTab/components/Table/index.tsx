import React from "react";
import { TableSource } from "../../../../types";
import { Body } from "./Body";

export const Table = ({ header, rows, title }: TableSource) => {
  console.log(JSON.stringify({ header, rows }, null, 4));
  return (
    <table>
      {title && <caption>{title}</caption>}
      <Body rows={header} isRow></Body>
      <Body rows={rows}></Body>
    </table>
  );
};
