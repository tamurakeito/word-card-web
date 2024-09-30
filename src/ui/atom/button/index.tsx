import "./index.scss";
import classNames from "classnames";
import { ReactNode } from "react";

export const Button = ({
  children,
  onClick,
  onDoubleClick = () => {},
  classes,
  bottomFix = false,
  color = "black",
}: {
  children: ReactNode;
  onClick: () => void;
  onDoubleClick?: () => void;
  classes?: Array<string>;
  bottomFix?: boolean;
  color?: "black" | "grey100" | "grey200" | "grey300";
}) => {
  const clazz = classes
    ? bottomFix
      ? classNames(["button", `button__${color}`, "bottom-fixed", ...classes])
      : classNames(["button", `button__${color}`, ...classes])
    : bottomFix
    ? classNames(["button", `button__${color}`, "bottom-fixed"])
    : classNames(["button", `button__${color}`]);
  return (
    <div className={clazz} onClick={onClick} onDoubleClick={onDoubleClick}>
      {children}
    </div>
  );
};
