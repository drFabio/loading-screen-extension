
/**
 * A source that represents a map, such as a translation
 */
 export type EquivalentSource = Record<string, string>;

 export type StatementSource = string[];
 
 export enum SourceTypes {
   EQUIVALENCE,
   STATEMENT,
 }
 
 export type EquivalenceInputSource = {
    type: SourceTypes.EQUIVALENCE;
    data: EquivalentSource;
    name?: string;
  }

  export type StatementInputSource = {
    type: SourceTypes.STATEMENT;
    data: StatementSource;
    name?: string;
  };
  
 export type InputSource =
   | EquivalenceInputSource
   | StatementInputSource