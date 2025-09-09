// Coconut context instance
import { createContext } from 'react';
import type { CoconutContextType } from './coconutContextTypes';

export const CoconutContext = createContext<CoconutContextType | undefined>(undefined);
