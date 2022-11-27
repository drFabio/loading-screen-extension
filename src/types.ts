/**
 * A source that represents a map, such as a translation
 */
export type EquivalentSource = Record<string, string>;

export type StatementSource = string[];

export enum SourceTypes {
  EQUIVALENCE,
  STATEMENT,
  TABLE,
}

export type EquivalenceInputSource = {
  type: SourceTypes.EQUIVALENCE;
  data: EquivalentSource;
  name?: string;
};

export type StatementInputSource = {
  type: SourceTypes.STATEMENT;
  data: StatementSource;
  name?: string;
};

export type CellSource =
  | string
  | { rowSpan?: number; colSpan?: number; text?: String };
export type RowSource = CellSource[];

export type TableSource = {
  header: RowSource[];
  rows: RowSource[];
  title?: string;
};
export type TableInputSource = {
  type: SourceTypes.TABLE;
  name?: string;
  data: TableSource[];
};

export type InputSource =
  | EquivalenceInputSource
  | StatementInputSource
  | TableInputSource;
