import { useState } from "react";
import { IconButton } from "../../../components/IconButton";
import { useSettings } from "../../../components/useSettings";
import { getHashFromItem } from "../../../getHashFromItem";
import { ItemDisplay } from "./ItemDisplay";
import * as classes from "./Options.module.scss";

export function Options() {
  const {
    sources,
    toogleActivation,
    hideMap,
    weightMap,
    initialized,
    hideItem,
    showItem,
    increaseWeight,
    decreaseWeight,
  } = useSettings();

  const [openSetting, setOpenSetting] = useState<string | undefined>();
  if (!initialized) return;

  return (
    <main className={classes.container}>
      <section>
        <h2>Available Sources</h2>
        <ul>
          {sources.map(({ id, title, deactivated, data }) => {
            const isOpen = openSetting === id;
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  name={id}
                  id={id}
                  onClick={() => {
                    toogleActivation(id);
                  }}
                  checked={!deactivated}
                />
                <label htmlFor={id}>{title} </label>
                <IconButton
                  icon={isOpen ? "folderOpen" : "folder"}
                  onClick={() => {
                    isOpen ? setOpenSetting(undefined) : setOpenSetting(id);
                  }}
                />
                {isOpen && (
                  <>
                    <p>Terms</p>
                    <ul className={classes.termsContainer}>
                      {data.map((source, index) => {
                        const hash = getHashFromItem(source.value);
                        return (
                          <li key={index}>
                            {
                              <ItemDisplay
                                source={source}
                                isHidden={hideMap?.[id]?.[hash]}
                                weight={weightMap?.[id]?.[hash]}
                                onHide={() => {
                                  hideItem(id, hash);
                                }}
                                onShow={() => {
                                  showItem(id, hash);
                                }}
                                onIncrease={() => {
                                  increaseWeight(id, hash);
                                }}
                                onDecrease={() => {
                                  decreaseWeight(id, hash);
                                }}
                              />
                            }
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
