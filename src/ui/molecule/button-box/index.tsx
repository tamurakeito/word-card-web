import { Button } from "../../atom/button";
import "./index.scss";
import classNames from "classnames";
import { ReactNode } from "react";

export const ButtonBox = ({
  children,
  isActive,
}: {
  children: ReactNode;
  isActive: boolean;
}) => {
  const classes = classNames(["button-box", isActive && "active"]);
  return <div className={classes}>{children}</div>;
};
