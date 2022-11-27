export enum SourceTypes {
  EQUIVALENCE,
  STATEMENT,
  TABLE,
}

export type Source<type, SourceType> = {
  value: SourceType;
  type: type;
};

export type EquivalenceInputSource = Source<
  SourceTypes.EQUIVALENCE,
  Record<string, string>
>;

export type StatementInputSource = Source<SourceTypes.STATEMENT, string>;

export type CellSource =
  | string
  | { rowSpan?: number; colSpan?: number; text?: String };
export type RowSource = CellSource[];

export type TableSource = {
  header: RowSource[];
  rows: RowSource[];
  title?: string;
};
export type TableInputSource = Source<SourceTypes.TABLE, TableSource>;

export type InputSource = {
  id: string;
  title?: string;
  data: (EquivalenceInputSource | StatementInputSource | TableInputSource)[];
};

export type SourceConfiguration = {
  deactivatedMap: Record<string, boolean>;
};
