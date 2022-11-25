import { useMemo } from "react";
import { InputSource, SourceTypes } from "../../../types";

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

  const data =
    chosenSource.type === SourceTypes.EQUIVALENCE
      ? Object.entries(chosenSource.data)
      : chosenSource.data;

  const index = Math.floor(Math.random() * data.length);

  return {
    type: chosenSource.type,
    name: chosenSource.name,
    choice: data[index],
  };
}
