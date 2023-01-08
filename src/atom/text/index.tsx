import classNames from "classnames";
import { ReactNode } from "react";

export const Text = ({
  type,
  children,
  weight,
}: {
  type: "title" | "subtitle" | "head" | "body";
  children?: ReactNode;
  weight?: "bold";
}) => {
  const classes = classNames("text", type, weight);
  return <div className={classes}>{children}</div>;
};
