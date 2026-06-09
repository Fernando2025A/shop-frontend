import { createContext } from "react";

type ThemeContextType = {
  currentBackground: string;
  changeBackground: (imgName: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);