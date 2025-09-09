// Custom hook for coconut context
import { useContext } from 'react';
import type { CoconutContextType } from './coconutContextTypes';
import { CoconutContext } from './coconutContextInstance';

export const useCoconutContext = () => {
  const ctx = useContext(CoconutContext as React.Context<CoconutContextType | undefined>);
  if (!ctx) throw new Error('useCoconutContext must be used within CoconutProvider');
  return ctx;
};
