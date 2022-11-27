import { useMemo } from "react";
import { getHashFromItem } from "../../../getHashFromItem";
import {
  EquivalenceInputSource,
  InputSource,
  SourceConfiguration,
  SourceTypes,
} from "../../../types";

/**
 * Loads the desired data sources returning a "randomized" source to be displayed
 * The sources will respect configuration if given
 * @param sources
 */
export function useDataSources(
  sources: InputSource[],
  configuration?: SourceConfiguration
) {
  const chosenSource = useMemo(() => {
    const validSources = sources.filter(
      ({ id }) => !configuration?.deactivatedMap?.[id]
    );
    if (!validSources.length) return null;
    const index = Math.floor(Math.random() * validSources.length);
    return validSources[index];
  }, [sources, configuration]);

  if (!chosenSource) {
    const choice = "No sources, go to options to select them";
    return {
      type: SourceTypes.STATEMENT,
      choice,
      id: "__NO_CHOICE__",
      hash: getHashFromItem(choice),
    };
  }

  const index = Math.floor(Math.random() * chosenSource.data.length);
  const { type, value } = chosenSource.data[index];

  const choice =
    type === SourceTypes.EQUIVALENCE
      ? Object.entries(value as EquivalenceInputSource["value"])[0]
      : value;
  const hash = getHashFromItem(choice);
  return {
    type: type,
    id: chosenSource.id,
    choice,
    hash,
  };
}
