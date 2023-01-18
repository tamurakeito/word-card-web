import React, { ReactNode, useContext, useState } from "react";

export type TrainingProvider = {
  questionLength: number;
  setQuestionLength: (questionLength: number) => void;
};

const TrainingProvider = React.createContext<TrainingProvider>({
  questionLength: 10,
  setQuestionLength: () => {
    console.log("traning-provider unimplement.");
  },
});

export const TraningContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [questionLength, setQuestionLength] = useState(10);
  return (
    <TrainingProvider.Provider value={{ questionLength, setQuestionLength }}>
      {children}
    </TrainingProvider.Provider>
  );
};

export const useTrainingContext = (): TrainingProvider => {
  return useContext(TrainingProvider);
};
