import * as classes from "./Controls.module.scss";
import { IconButton } from "../../../../components/IconButton";

export const Controls = () => {
  return (
    <nav className={classes.container}>
      <IconButton icon="hide" tooltip="Hide this" />
      <IconButton icon="plus" tooltip="Show more often" />
      <IconButton icon="minus" tooltip="Show less often" />
    </nav>
  );
};
