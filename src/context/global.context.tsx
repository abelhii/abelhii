"use client";

import { createContext, useContext, useState } from "react";

type GlobalContextType = {
  is3dOn: boolean;
  setIs3dOn: (enabled: boolean) => void;
  resetId: number;
  reset: () => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  is3dOn: false,
  setIs3dOn: () => null,
  resetId: 0,
  reset: () => null,
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [is3dOn, setIs3dOn] = useState<boolean>(false);
  const [resetId, setResetId] = useState<number>(0);
  const reset = () => setResetId((prev) => prev + 1);

  return (
    <GlobalContext.Provider value={{ is3dOn, setIs3dOn, resetId, reset }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
