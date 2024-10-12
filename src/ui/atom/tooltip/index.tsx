import { useState } from "react";
import "./index.scss";

export const Tooltip = ({
  label,
  isVisible,
}: {
  label: string;
  isVisible: boolean;
}) => {
  return isVisible ? <div className="tooltip">{label}</div> : <></>;
};
