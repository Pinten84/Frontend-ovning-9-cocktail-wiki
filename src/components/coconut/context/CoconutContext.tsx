
import { useState, useEffect } from 'react';
import { CoconutContext } from './coconutContextInstance';
import type { ReactNode } from 'react';
import type { Coconut } from './coconutContextTypes';



const COCONUTS_KEY = 'coconuts';
const COCONUT_ID_KEY = 'coconutId';

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
