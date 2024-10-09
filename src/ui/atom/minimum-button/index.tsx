import "./index.scss";

export const MinimumButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => {
  return (
    <span className={"minimum-button"} onClick={onClick}>
      {label}
    </span>
  );
};
