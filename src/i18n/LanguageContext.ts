import { createContext, useContext } from "react";

import type { Lang } from "./lang";
import { STRINGS } from "./strings";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

export const useLang = () => useContext(LanguageContext);

/** The interface copy in the current language. */
export const useStrings = () => STRINGS[useLang().lang];
