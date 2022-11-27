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
  title: string;
};
export type TableInputSource = Source<SourceTypes.TABLE, TableSource>;

export type DataSource =
  | EquivalenceInputSource
  | StatementInputSource
  | TableInputSource;
export type InputSource = {
  id: string;
  title?: string;
  data: DataSource[];
};

export type SourceConfiguration = {
  deactivatedMap: Record<string, boolean>;
  initialized: boolean;
  hideMap: Record<string, Record<string, boolean>>;
  weightMap: Record<string, Record<string, number>>;
};
