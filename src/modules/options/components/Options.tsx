import { useSettings } from "../../../components/useSettings";
import * as classes from "./Options.module.scss";

export function Options() {
  const { sources, toogleActivation } = useSettings();
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
