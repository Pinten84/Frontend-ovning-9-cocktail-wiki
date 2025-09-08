import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Coconut {
  id: number;
  animating: boolean;
  x: number;
  y: number;
  rot: number;
  roll: number;
  variant: number;
  fallX: number;
}

interface CoconutContextType {
  coconuts: Coconut[];
  setCoconuts: React.Dispatch<React.SetStateAction<Coconut[]>>;
  coconutId: number;
  setCoconutId: React.Dispatch<React.SetStateAction<number>>;
}

const CoconutContext = createContext<CoconutContextType | undefined>(undefined);

export const useCoconutContext = () => {
  const ctx = useContext(CoconutContext);
  if (!ctx) throw new Error("useCoconutContext must be used within CoconutProvider");
  return ctx;
};

const COCONUTS_KEY = "coconuts";
const COCONUT_ID_KEY = "coconutId";

export const CoconutProvider = ({ children }: { children: ReactNode }) => {
  const [coconuts, setCoconuts] = useState<Coconut[]>(() => {
    try {
      const saved = localStorage.getItem(COCONUTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [coconutId, setCoconutId] = useState(() => {
    try {
      const saved = localStorage.getItem(COCONUT_ID_KEY);
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem(COCONUTS_KEY, JSON.stringify(coconuts));
  }, [coconuts]);
  useEffect(() => {
    localStorage.setItem(COCONUT_ID_KEY, JSON.stringify(coconutId));
  }, [coconutId]);

  return (
    <CoconutContext.Provider value={{ coconuts, setCoconuts, coconutId, setCoconutId }}>
      {children}
    </CoconutContext.Provider>
  );
};
