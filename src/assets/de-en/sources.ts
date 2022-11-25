import words from "./words.json";
import {
  InputSource,
  SourceTypes,
} from "../../modules/newTab/components/useDataSources";

export const sources: InputSource[] = [
  {
    data: words,
    type: SourceTypes.EQUIVALENCE,
  },
];
