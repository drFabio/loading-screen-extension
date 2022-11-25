import React from "react";
import { sources } from "../../../assets/de-en/sources";
import { SourceTypes } from "../../../types";
import { Equivalence } from "./Equivalence";
import { useDataSources } from "./useDataSources";
import * as classes from "./Tabs.module.css";

export function Tabs() {
  const { type, choice } = useDataSources(sources);
  let container: JSX.Element;

  if (type === SourceTypes.EQUIVALENCE) {
    const [term, definition] = choice as [string, string];
    container = <Equivalence term={term} definition={definition} />;
  } else {
    container = <></>;
  }

  return <main className={classes.container}>{container}</main>;
}
