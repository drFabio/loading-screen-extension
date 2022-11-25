import { InputSource, SourceTypes } from "../../types";
import words from "./words.json";

export const sources: InputSource[] = [
  {
    data: words,
    type: SourceTypes.EQUIVALENCE,
  },
];
