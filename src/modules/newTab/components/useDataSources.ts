import { useMemo } from "react";
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
  }, [sources]);

  if (!chosenSource) {
    return {
      type: SourceTypes.STATEMENT,
      choice: "No sources, go to options to select them",
      id: "__NO_CHOICE__",
    };
  }

  const index = Math.floor(Math.random() * chosenSource.data.length);
  const { type, value } = chosenSource.data[index];
  return {
    type: type,
    id: chosenSource.id,
    choice:
      type === SourceTypes.EQUIVALENCE
        ? Object.entries(value as EquivalenceInputSource["value"])[0]
        : value,
  };
}
