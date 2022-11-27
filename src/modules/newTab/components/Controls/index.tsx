import * as classes from "./Controls.module.scss";
import { IconButton } from "../../../../components/IconButton";

export type ControlProps = {
  onHide: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};
export const Controls = ({ onHide, onIncrease, onDecrease }: ControlProps) => {
  return (
    <nav className={classes.container}>
      <IconButton
        icon="hide"
        tooltip="Hide this"
        onClick={(e) => {
          onHide();
          e.preventDefault();
        }}
      />
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
        onClick={(e) => {
          onDecrease();
          e.preventDefault();
        }}
      />
    </nav>
  );
};
