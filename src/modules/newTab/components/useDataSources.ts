import { useMemo, useRef } from "react";
import { getHashFromItem } from "../../../getHashFromItem";
import {
  DataSource,
  EquivalenceInputSource,
  InputSource,
  SourceConfiguration,
  SourceTypes,
  TableSource,
} from "../../../types";

/**^
 * Loads the desired data sources returning a "randomized" source to be displayed
 * The sources will respect configuration if given
 * @param sources
 */
export function useDataSources(
  sources: InputSource[],
  configuration: SourceConfiguration = {
    initialized: true,
    deactivatedMap: {},
    hideMap: {},
    weightMap: {},
  }
) {
  const choiceRef = useRef<{
    type: SourceTypes;
    hash: string;
    id: string;
    choice: string | TableSource | [string, string];
  }>();

  const data = useMemo(() => {
    if (!configuration?.initialized) return null;

    if (choiceRef.current) {
      return choiceRef.current;
    }
    const validSources = sources.filter(
      ({ id }) => !configuration?.deactivatedMap?.[id]
    );
    if (!validSources.length) return null;
    const index = Math.floor(Math.random() * validSources.length);
    const chosenSource = validSources[index];

    const id = chosenSource.id;

    const hashDataMap: Record<string, DataSource> = {};

    let weightedHashes: string[] = chosenSource.data.reduce((acc, data) => {
      const hash = getHashFromItem(data.value);
      const shown = !configuration?.hideMap?.[id]?.[hash];
      if (!shown) return acc;
      const weight = configuration?.weightMap?.[id]?.[hash] ?? 1;
      hashDataMap[hash] = data;

      return acc.concat(new Array(weight).fill(hash));
    }, []);

    const dataIndex = Math.floor(Math.random() * weightedHashes.length);
    const { type, value } = hashDataMap[weightedHashes[dataIndex]];
    const hash = getHashFromItem(value);

    const choice =
      type === SourceTypes.EQUIVALENCE
        ? Object.entries(value as EquivalenceInputSource["value"])[0]
        : value;
    choiceRef.current = {
      hash,
      choice,
      type,
      id,
    };
    return choiceRef.current;
  }, [sources, configuration]);

  if (!data) {
    const choice = "No sources, go to options to select them";
    return {
      type: SourceTypes.STATEMENT,
      choice,
      id: "__NO_CHOICE__",
      hash: getHashFromItem(choice),
    };
  }

  return data;
}
