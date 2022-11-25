import React from "react";
import { sources } from "../../../assets/de-en/sources";
import { SourceTypes } from "../../../types";
import { Equivalence } from "./Equivalence";
import { useDataSources } from "./useDataSources";

export function Tabs() {
  const { type, choice } = useDataSources(sources);

  if (type === SourceTypes.EQUIVALENCE) {
    const [term, definition] = choice;
    return <Equivalence term={term} definition={definition} />;
  }
  return <h1>Hello world!</h1>;
}
