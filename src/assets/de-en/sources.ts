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

export const deEnSource: InputSource = {
  id: "de-en",
  data: [...dictionaryData, ...tableData],
};
