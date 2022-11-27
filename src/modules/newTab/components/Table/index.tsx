import { TableSource } from "../../../../types";
import { Body } from "./Body";
import * as classes from "./Table.module.scss";

export const Table = ({ header, rows, title }: TableSource) => {
  return (
    <table className={classes.table}>
      {title && <caption>{title}</caption>}
      <Body rows={header} isRow></Body>
      <Body rows={rows}></Body>
    </table>
  );
};
