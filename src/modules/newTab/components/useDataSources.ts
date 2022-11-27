import { useMemo } from "react";
import {
  EquivalenceInputSource,
  InputSource,
  SourceTypes,
} from "../../../types";

/**
 * Loads the desired data sources returning a "randomized" source to be displayed
 * The sources will respect configuration if given
 * @param sources
 */
export function useDataSources(sources: InputSource[]) {
  const chosenSource = useMemo(() => {
    const index = Math.floor(Math.random() * sources.length);
    return sources[index];
  }, [sources]);

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
