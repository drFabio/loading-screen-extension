import React from "react";
import { sources } from "../../../assets/sources";
import { getDeterministicPallette } from "../../../getDeterministicPallette";
import { SourceTypes, TableSource } from "../../../types";
import { Equivalence } from "./Equivalence";
import { Table } from "./Table";
import * as classes from "./Tabs.module.css";
import { useDataSources } from "./useDataSources";

export function Tabs() {
  const { type, choice } = useDataSources(sources);
  let container: JSX.Element;
  /**
   * We want to have the same color for the same input
   * So people can associate them better in case they show up more than once
   */
  const { color, backgroundColor } = getDeterministicPallette(choice);
  switch (type) {
    case SourceTypes.EQUIVALENCE: {
      const [term, definition] = choice as [string, string];
      container = <Equivalence term={term} definition={definition} />;
      break;
    }
    case SourceTypes.TABLE: {
      container = <Table {...(choice as TableSource)}></Table>;
      break;
    }
  }

  return (
    <main className={classes.container} style={{ color, backgroundColor }}>
      {container}
    </main>
  );
}
