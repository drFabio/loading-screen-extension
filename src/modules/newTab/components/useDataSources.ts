import { useMemo } from "react";

/**
 * A source that represents a map, such as a translation
 */
export type EquivalentSource = Record<string, string>;

export type StatementSource = string[];

export enum SourceTypes {
  EQUIVALENCE,
  STATEMENT,
}

export type InputSource =
  | {
      type: SourceTypes.EQUIVALENCE;
      data: EquivalentSource;
      name?: string;
    }
  | {
      type: SourceTypes.STATEMENT;
      data: StatementSource;
      name?: string;
    };
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
