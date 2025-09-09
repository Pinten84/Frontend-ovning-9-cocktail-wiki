// Types for coconut context

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

export interface CoconutContextType {
  coconuts: Coconut[];
  setCoconuts: React.Dispatch<React.SetStateAction<Coconut[]>>;
  coconutId: number;
  setCoconutId: React.Dispatch<React.SetStateAction<number>>;
}
