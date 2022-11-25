import React from "react";

export const Equivalence = ({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) => {
  return (
    <dl>
      <dt>{term}</dt>
      <dd>{definition}</dd>
    </dl>
  );
};
