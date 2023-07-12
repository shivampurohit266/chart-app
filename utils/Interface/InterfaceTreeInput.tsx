import { Dispatch, ReactNode, SetStateAction } from "react";

export interface TreeInput {
  type: string;
  placeholder: string;
  defaultValue: string;
  themeId: string;
  themeName: string;
  setThemeName: (themeName: any) => void;
  subThemeName: string;
  setSubThemeName: (subThemeName: any) => void;
  themeArrAll: ThemeArr[];
  subThemeArrChilde: SubThemeArr[];
  subThemeArrayAll: SubThemeArr[];
  setSubThemeArray: Dispatch<React.SetStateAction<SubThemeArr[]>>;
  setThemeArray: Dispatch<React.SetStateAction<ThemeArr[]>>;
  showThemeBtn: string;
  setShowThemeBtn: (showThemeBtn: any) => void;
  showSubThemeBtn: string;
  setShowSubThemeBtn: (showSubThemeBtn: any) => void;
  index?: number;
  inputChange?: any;
  setShowThemeWarning: (showThemeWarning: boolean) => void;
  showSubThemeWarning: boolean;
  setShowSubThemeWarning: (showSubThemeWarning: boolean) => void;
  setInputChange: (inputChangeData: any) => void;
  handleDiscardButton: () => void;
  handleSaveThemeInput: () => void;
}
export interface ThemeArr {
  themeName: ReactNode;
  theme?: string;
  themeId: string;
  id: string;
}
export interface SubThemeArr {
  subthemeName: string | number | readonly string[] | undefined;
  themeId: string;
  subtheme?: string;
  metricId: never[];
  subthemeId: string;
  id: string;
}
// export interface ThemeArr{ themeName: string; themeId: string; id: string; }
// export interface SubThemeArr{ themeId: string; subthemeName: string; metricId: never[]; subthemeId: string; id: string; }
