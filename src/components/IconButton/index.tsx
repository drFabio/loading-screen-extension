import * as Unicons from "@iconscout/react-unicons";
import { ReactNode } from "react";
import * as classes from "./IconButton.module.scss";

export type IconButtonProps = {
  icon:
    | "hide"
    | "plus"
    | "minus"
    | "show"
    | "settings"
    | "folder"
    | "folderOpen";
  tooltip?: string;
  hasTooltip?: boolean;
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
    case "show":
      iconComponent = <Unicons.UilEye />;
      break;
    case "plus":
      iconComponent = <Unicons.UilPlusCircle />;
      break;
    case "minus":
      iconComponent = <Unicons.UilMinusCircle />;
      break;
    case "settings":
      iconComponent = <Unicons.UilSettings />;
      break;
    case "folder":
      iconComponent = <Unicons.UilFolder />;
      break;
    case "folderOpen":
      iconComponent = <Unicons.UilFolderOpen />;
      break;
  }
  return (
    <button className={classes.iconButton} {...props}>
      {tooltip && <span data-tooltip={tooltip}>?</span>}
      {iconComponent}
    </button>
  );
};
