import { InputSource, SourceTypes, TableSource } from "../../types";
import words from "./words.json";
import tables from "./tables.json";

export const sources: InputSource[] = [
  {
    data: words,
    type: SourceTypes.EQUIVALENCE,
  },
  { data: tables as TableSource[], type: SourceTypes.TABLE },
];
