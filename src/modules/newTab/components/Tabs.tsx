import React from "react";
import { sources } from "../../../assets/de-en/sources";
import { SourceTypes } from "../../../types";
import { Equivalence } from "./Equivalence";
import { useDataSources } from "./useDataSources";
import * as classes from "./Tabs.module.css";
import { getDeterministicPallette } from "../../../getDeterministicPallette";

export function Tabs() {
  const { type, choice } = useDataSources(sources);
  let container: JSX.Element;

  /**
   * We want to have the same color for the same input
   * So people can associate them better in case they show up more than once
   */
  const { color, backgroundColor } = getDeterministicPallette(choice);

  if (type === SourceTypes.EQUIVALENCE) {
    const [term, definition] = choice as [string, string];
    container = <Equivalence term={term} definition={definition} />;
  } else {
    container = <></>;
  }

  return (
    <main className={classes.container} style={{ color, backgroundColor }}>
      {container}
    </main>
  );
}
