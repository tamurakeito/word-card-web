import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ThemaContent } from "types/types";
import KokushiYokomoji from "data/kokushi-yokomoji.json";

export type ThemaContext = {
  thema: ThemaContent;
  setThemaContent: (thema: ThemaContent) => void;
};

const ThemaContext = React.createContext<ThemaContext>({
  thema: KokushiYokomoji,
  setThemaContent: () => {
    console.log("tab-provider unimplement.");
  },
});

export const ThemaContextProvider = ({ children }: { children: ReactNode }) => {
  const [thema, setThema] = useState<ThemaContent>(KokushiYokomoji);
  const setThemaContent = (headerContent: ThemaContent) => {
    const content: ThemaContent = {
      index: headerContent.index,
      title: headerContent.title,
      data: headerContent.data.filter((data) => data.question),
    };
    setThema(content);
  };
  useEffect(() => {
    document.title = KokushiYokomoji.title;
  }, []);
  return (
    <ThemaContext.Provider value={{ thema, setThemaContent }}>
      {children}
    </ThemaContext.Provider>
  );
};

export const useThemaContext = (): ThemaContext => {
  return useContext(ThemaContext);
};
