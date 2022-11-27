import { useEffect, useMemo, useState } from "react";
import { InputSource } from "../types";
import { sources as staticSources } from "../assets/sources";

/**
 * List the available data sources to consider
 */
export const useSettings = () => {
  const [deactivatedMap, setDeactivatedMap] = useState<Record<string, boolean>>(
    {}
  );
  const [hideMap, setHideMap] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const [weightMap, setWeightMap] = useState<
    Record<string, Record<string, number>>
  >({});

  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const savedDeactivatedMap: Record<string, boolean> = JSON.parse(
      localStorage.getItem("deactivatedMap") || `{}`
    );
    const savedHideMap: Record<string, Record<string, boolean>> = JSON.parse(
      localStorage.getItem("hideMap") || `{}`
    );
    const savedWeightMap: Record<string, Record<string, number>> = JSON.parse(
      localStorage.getItem("weightMap") || `{}`
    );
    setDeactivatedMap(savedDeactivatedMap);
    setHideMap(savedHideMap);
    setWeightMap(savedWeightMap);
    setInitialized(true);
  }, [setDeactivatedMap]);
  /**
   * @todo implement adding different sources
   */
  const dynamicSources: InputSource[] = [];

  const sources = useMemo(() => {
    return staticSources.concat(dynamicSources).map(({ title, id }) => ({
      title: title || id,
      id,
      deactivated: !!deactivatedMap[id],
    }));
  }, [deactivatedMap, staticSources, dynamicSources]);

  useEffect(() => {
    const storeData = () => {
      localStorage.setItem("deactivatedMap", JSON.stringify(deactivatedMap));
      localStorage.setItem("hideMap", JSON.stringify(hideMap));
      localStorage.setItem("weightMap", JSON.stringify(weightMap));
    };
    storeData();
  }, [deactivatedMap, hideMap, weightMap]);

  const toogleActivation = (id: string) => {
    setDeactivatedMap((oldMap) => ({
      ...oldMap,
      [id]: !oldMap[id],
    }));
  };

  const increaseWeight = (sourceId: string, itemHash: string) => {
    setWeightMap((previousWeightMap) => ({
      ...previousWeightMap,
      [sourceId]: {
        ...previousWeightMap?.[sourceId],
        [itemHash]: (previousWeightMap?.[sourceId]?.[itemHash] || 0) + 1,
      },
    }));
  };
  const decreaseWeight = (sourceId: string, itemHash: string) => {
    setWeightMap((previousWeightMap) => ({
      ...previousWeightMap,
      [sourceId]: {
        ...previousWeightMap?.[sourceId],
        [itemHash]: (previousWeightMap?.[sourceId]?.[itemHash] || 0) - 1,
      },
    }));
  };
  const hideItem = (sourceId: string, itemHash: string) => {
    setHideMap((previousHideMap) => ({
      ...previousHideMap,
      [sourceId]: {
        ...previousHideMap?.[sourceId],
        [itemHash]: true,
      },
    }));
  };

  return {
    sources,
    toogleActivation,
    deactivatedMap,
    hideMap,
    weightMap,
    increaseWeight,
    decreaseWeight,
    hideItem,
    initialized,
  };
};
