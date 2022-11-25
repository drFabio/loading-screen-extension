import React from "react";
import { sources } from "../../../assets/de-en/sources";
import { SourceTypes, useDataSources } from "./useDataSources";

export function Tabs() {
  const { type, choice } = useDataSources(sources);

  if (type === SourceTypes.EQUIVALENCE) {
    const [term, defintiion] = choice;
    return (
      <dl>
        <dt>{term}</dt>
        <dd>{defintiion}</dd>
      </dl>
    );
  }
  return <h1>Hello world!</h1>;
}
