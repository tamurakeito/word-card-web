import "./index.scss";
import classNames from "classnames";

export const Button = ({
  value,
  onClick,
  onDoubleClick = () => {},
  classes,
  bottomFix = false,
  color = "black",
}: {
  value: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  classes?: Array<string>;
  bottomFix?: boolean;
  color?: "black" | "grey";
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
      {value}
    </div>
  );
};
