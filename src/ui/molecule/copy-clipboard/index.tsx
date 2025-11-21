import { ReactNode, useRef, useState } from "react";
import "./index.scss";
import { Tooltip } from "../../atom/tooltip";

export const CopyClipboard = ({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutIdRef = useRef<number | null>(null);
  return (
    <div
      className="copy-clipboard"
      onClick={() => {
        navigator.clipboard
          .writeText(content)
          .then(() => {
            setIsVisible(true);
            setMessage("Copied to clipboard.");

            if (timeoutIdRef.current) {
              clearTimeout(timeoutIdRef.current);
            }
            timeoutIdRef.current = window.setTimeout(() => {
              setIsVisible(false);
            }, 1000);
          })
          .catch((err) => {
            setIsVisible(true);
            setMessage("Failed to copy to clipboard.");

            if (timeoutIdRef.current) {
              clearTimeout(timeoutIdRef.current);
            }
            timeoutIdRef.current = window.setTimeout(() => {
              setIsVisible(false);
            }, 1000);
          });
      }}
    >
      {children}
      <Tooltip label={message} isVisible={isVisible} />
    </div>
  );
};
