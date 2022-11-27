import {
  EquivalenceInputSource,
  InputSource,
  SourceTypes,
  TableInputSource,
  TableSource,
} from "../../types";
import tables from "./tables.json";
import words from "./words.json";

const tableData: TableInputSource[] = (tables as TableSource[]).map(
  (value) => ({
    type: SourceTypes.TABLE,
    value,
  })
);
const dictionaryData: EquivalenceInputSource[] = Object.keys(words).map(
  (key) => ({
    type: SourceTypes.EQUIVALENCE,
    value: { [key]: words[key] },
  })
);

export const deEnVocubalary: InputSource = {
  id: "de-en-vocabulary",
  title: "German to english - Vocubalary",
  data: dictionaryData,
};
export const deEnGrammar: InputSource = {
  id: "de-en-grammar",
  title: "German to english - grammar",
  data: tableData,
};
