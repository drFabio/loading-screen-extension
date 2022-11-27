import React from "react";
import * as classes from "./Options.module.scss";
import { useDataSourceSelection } from "./useDataSourceSelection";

export function Options() {
  const { sources, toogleActivation } = useDataSourceSelection();
  return (
    <main className={classes.container}>
      <section>
        <h2>Available Sources</h2>
        <ul>
          {sources.map(({ id, title, deactivated }) => (
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
              {title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
