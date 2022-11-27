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

  useEffect(() => {
    const savedActivationMap: Record<string, boolean> = JSON.parse(
      localStorage.getItem("activationMap") || `{}`
    );
    setDeactivatedMap(savedActivationMap);
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
      localStorage.setItem("activationMap", JSON.stringify(deactivatedMap));
    };
    storeData();
  }, [deactivatedMap]);

  const toogleActivation = (id: string) => {
    setDeactivatedMap((oldMap) => ({
      ...oldMap,
      [id]: !oldMap[id],
    }));
  };

  return { sources, toogleActivation };
};
