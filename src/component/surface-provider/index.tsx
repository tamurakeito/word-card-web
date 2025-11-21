import React, { ReactNode, useContext, useState } from "react";
import { Surface } from "../../types/types";

export type SurfaceProvider = {
  surface: Surface;
  setSurface: (surface: Surface) => void;
};

const SurfaceProvider = React.createContext<SurfaceProvider>({
  surface: "home",
  setSurface: () => {
    console.log("surface-provider unimplement.");
  },
});

export const SurfaceContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [surface, setSurface] = useState<Surface>("home");
  return (
    <SurfaceProvider.Provider value={{ surface, setSurface }}>
      {children}
    </SurfaceProvider.Provider>
  );
};

export const useSurfaceContext = (): SurfaceProvider => {
  return useContext(SurfaceProvider);
};
