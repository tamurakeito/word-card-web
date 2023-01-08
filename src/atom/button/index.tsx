import "./index.scss";
import classNames from "classnames";

export const Button = ({
  value,
  onClick,
  classes,
  bottomFix = false,
}: {
  value: string;
  onClick: () => void;
  classes?: Array<string>;
  bottomFix?: boolean;
}) => {
  const clazz = classes
    ? bottomFix
      ? classNames(["button", "bottom-fixed", ...classes])
      : classNames(["button", ...classes])
    : bottomFix
    ? classNames(["button", "bottom-fixed"])
    : "Button";
  return (
    <div className={clazz} onClick={onClick}>
      {value}
    </div>
  );
};
