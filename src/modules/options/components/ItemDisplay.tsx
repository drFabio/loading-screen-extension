import { IconButton } from "../../../components/IconButton";
import {
  EquivalenceInputSource,
  InputSource,
  SourceTypes,
  StatementInputSource,
  TableInputSource,
} from "../../../types";
import * as classes from "./ItemDisplay.module.scss";

export type ItemDisplayProps = {
  source: EquivalenceInputSource | StatementInputSource | TableInputSource;
  isHidden?: boolean;
  weight?: number;
  onShow: () => void;
  onHide: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};
export const ItemDisplay = ({
  source,
  isHidden,
  onHide,
  onShow,
  onIncrease,
  onDecrease,
  weight,
}: ItemDisplayProps) => {
  let displayText: string;
  switch (source.type) {
    case SourceTypes.EQUIVALENCE:
      displayText = Object.keys(source.value)[0];
      break;
    case SourceTypes.STATEMENT:
      displayText = source.value;

      break;
    case SourceTypes.TABLE:
      displayText = source.value.title;
      break;
  }
  return (
    <>
      {!isHidden && (
        <IconButton
          icon="hide"
          onClick={(e) => {
            e.preventDefault();
            onHide();
          }}
        />
      )}
      {isHidden && (
        <IconButton
          icon="show"
          onClick={(e) => {
            e.preventDefault();
            onShow();
          }}
        />
      )}
      {
        <IconButton
          icon="plus"
          onClick={(e) => {
            e.preventDefault();
            onIncrease();
          }}
        />
      }
      {
        <IconButton
          icon="minus"
          onClick={(e) => {
            e.preventDefault();
            onDecrease();
          }}
        />
      }
      <span className={classes.text}>{displayText}</span> ({weight || 1})
    </>
  );
};
