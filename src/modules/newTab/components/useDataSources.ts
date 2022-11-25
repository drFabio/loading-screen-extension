/**
 * Loads the desired data sources returning a "randomized" source to be displayed
 * The sources will respect configuration if given
 * @param sources
 */
export function useDataSources(sources: string[]) {
  return sources[Math.floor(Math.random() * sources.length)];
}
