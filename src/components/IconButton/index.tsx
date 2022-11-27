import * as Unicons from "@iconscout/react-unicons";
import { ReactNode } from "react";
import * as classes from "./IconButton.module.scss";

export type IconButtonProps = {
  icon: "hide" | "plus" | "minus";
  tooltip?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const IconButton = ({ icon, tooltip, ...props }: IconButtonProps) => {
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
    <button className={classes.iconButton} {...props}>
      <span data-tooltip={tooltip}>?</span>
      {iconComponent}
    </button>
  );
};
