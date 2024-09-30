import classNames from "classnames";
import { ReactNode } from "react";
import "./index.scss";

export const Text = ({
  type,
  children,
  weight,
}: {
  type: "title" | "subtitle" | "head" | "body" | "comment";
  children?: ReactNode;
  weight?: "bold";
}) => {
  const classes = classNames("text", type, weight);
  return <div className={classes}>{children}</div>;
};
