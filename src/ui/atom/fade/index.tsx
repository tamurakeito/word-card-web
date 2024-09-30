import { useEffect, useState } from "react";
import "./index.scss";
import classNames from "classnames";

export const Fade = ({
  isActive,
  onTap,
}: {
  isActive: boolean;
  onTap: () => void;
}) => {
  useEffect(() => {
    if (isActive) {
      (async () => {
        await setIsOpacity(false);
        await setIsAppear(true);
        setTimeout(() => {
          setIsOpacity(true);
        }, 1);
      })();
    } else {
      setIsOpacity(false);
      setTimeout(() => {
        setIsAppear(false);
      }, 200);
    }
  }, [isActive]);
  const [isAppear, setIsAppear] = useState(isActive);
  const [isOpacity, setIsOpacity] = useState(isActive);
  const classes = classNames(["fade", isOpacity && "active"]);
  return isAppear ? <div className={classes} onClick={onTap}></div> : <></>;
};
