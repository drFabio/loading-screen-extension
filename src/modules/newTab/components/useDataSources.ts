import { useMemo, useRef } from "react";
import { getHashFromItem } from "../../../getHashFromItem";
import {
  EquivalenceInputSource,
  InputSource,
  SourceConfiguration,
  SourceTypes,
  StatementInputSource,
  TableSource,
} from "../../../types";

/**
 * Loads the desired data sources returning a "randomized" source to be displayed
 * The sources will respect configuration if given
 * @param sources
 */
export function useDataSources(
  sources: InputSource[],
  configuration: SourceConfiguration = {
    initialized: true,
    deactivatedMap: {},
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

    const dataIndex = Math.floor(Math.random() * chosenSource.data.length);
    const { type, value } = chosenSource.data[dataIndex];
    const hash = getHashFromItem(value);

    const choice =
      type === SourceTypes.EQUIVALENCE
        ? Object.entries(value as EquivalenceInputSource["value"])[0]
        : value;
    choiceRef.current = {
      hash,
      choice,
      type,
      id: chosenSource.id,
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
