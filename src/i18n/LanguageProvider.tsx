import { useCallback, useEffect, useMemo, useState } from "react";

import { LanguageContext } from "./LanguageContext";
import { STORAGE_KEY, readLang, type Lang } from "./lang";
import { STRINGS } from "./strings";

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readLang);

  // Keep the document itself in step: screen readers and the browser's font
  // choice go by `lang`, and the tab and search results by the title.
  useEffect(() => {
    const { meta } = STRINGS[lang];
    document.documentElement.lang = lang;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [lang]);

  // Japanese for the pixel face. Its stylesheet is large (one rule per
  // unicode-range slice), so it is only fetched once Japanese is wanted; the
  // slices themselves then load as their characters appear.
  useEffect(() => {
    if (lang === "ja") void import("@fontsource/dotgothic16/400.css");
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable; the choice still holds for this visit.
    }

    // A `?lang=` in the address would win over the choice just made on the
    // next load, so drop it.
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      window.history.replaceState(null, "", url);
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
