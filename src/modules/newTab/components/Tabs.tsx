import { sources } from "../../../assets/sources";
import { useSettings } from "../../../components/useSettings";
import { getDeterministicPallette } from "../../../getDeterministicPallette";
import { SourceTypes, TableSource } from "../../../types";
import { Controls } from "./Controls";
import { Equivalence } from "./Equivalence";
import { Table } from "./Table";
import * as classes from "./Tabs.module.css";
import { useDataSources } from "./useDataSources";

export function Tabs() {
  const {
    deactivatedMap,
    increaseWeight,
    decreaseWeight,
    hideItem,
    hideMap,
    initialized,
    showItem,
    weightMap,
  } = useSettings();

  const { type, choice, hash, id } = useDataSources(sources, {
    deactivatedMap,
    initialized,
    hideMap,
    weightMap,
  });

  let container: JSX.Element;
  /**
   * We want to have the same color for the same input
   * So people can associate them better in case they show up more than once
   */
  const { color, backgroundColor } = getDeterministicPallette(hash);
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
    case SourceTypes.STATEMENT: {
      container = <span>{choice as string}</span>;
      break;
    }
  }

  return (
    <main className={classes.container} style={{ color, backgroundColor }}>
      {container}
      <Controls
        weight={weightMap?.[id]?.[hash]}
        onDecrease={() => {
          decreaseWeight(id, hash);
        }}
        onHide={() => {
          hideItem(id, hash);
        }}
        onShow={() => {
          showItem(id, hash);
        }}
        onIncrease={() => {
          increaseWeight(id, hash);
        }}
        isHidden={hideMap?.[id]?.[hash]}
      />
    </main>
  );
}
