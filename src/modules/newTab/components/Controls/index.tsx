import * as classes from "./Controls.module.scss";
import { IconButton } from "../../../../components/IconButton";

export type ControlProps = {
  onHide: () => void;
  onShow: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  isHidden?: boolean;
  weight?: number;
};
export const Controls = ({
  onHide,
  onShow,
  onIncrease,
  onDecrease,
  isHidden,
  weight,
}: ControlProps) => {
  return (
    <nav className={classes.container}>
      {!isHidden && (
        <IconButton
          icon="hide"
          tooltip="Hide this"
          onClick={(e) => {
            onHide();
            e.preventDefault();
          }}
        />
      )}
      {isHidden && (
        <IconButton
          icon="show"
          tooltip="Show this"
          onClick={(e) => {
            onShow();
            e.preventDefault();
          }}
        />
      )}
      <IconButton
        icon="plus"
        tooltip="Show more often"
        onClick={(e) => {
          onIncrease();
          e.preventDefault();
        }}
      />
      <IconButton
        icon="minus"
        tooltip="Show less often"
        disabled={weight <= 1}
        onClick={(e) => {
          onDecrease();
          e.preventDefault();
        }}
      />
      ({weight || 1})
    </nav>
  );
};
