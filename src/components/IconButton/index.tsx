import * as Unicons from "@iconscout/react-unicons";
import { ReactNode } from "react";
import * as classes from "./IconButton.module.scss";

export type IconButtonProps = {
  icon: "hide" | "plus" | "minus";
  tooltip?: string;
};
export const IconButton = ({ icon, tooltip }: IconButtonProps) => {
  let iconComponent: ReactNode;
  switch (icon) {
    case "hide":
      iconComponent = <Unicons.UilEyeSlash />;
      break;
    case "plus":
      iconComponent = <Unicons.UilPlusCircle />;
      break;
    case "minus":
      iconComponent = <Unicons.UilMinusCircle />;
      break;
  }
  return (
    <button className={classes.iconButton}>
      <span data-tooltip={tooltip}>?</span>
      {iconComponent}
    </button>
  );
};
