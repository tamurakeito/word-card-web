import { themaList } from "data/data";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ThemaContent } from "../../types/types";

export type ThemaContext = {
  thema: ThemaContent;
  setThemaContent: (thema: ThemaContent) => void;
};

const ThemaContext = React.createContext<ThemaContext>({
  thema: {
    title: "thema-provider unimplement.",
    data: [],
  },
  setThemaContent: () => {
    console.log("thema-provider unimplement.");
  },
});

export const ThemaContextProvider = ({ children }: { children: ReactNode }) => {
  const [thema, setThema] = useState<ThemaContent>(themaList[0]);
  const setThemaContent = (headerContent: ThemaContent) => {
    const content: ThemaContent = {
      title: headerContent.title,
      data: headerContent.data.filter((data) => data.question),
    };
    setThema(content);
  };
  useEffect(() => {
    document.title = "word-card";
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
