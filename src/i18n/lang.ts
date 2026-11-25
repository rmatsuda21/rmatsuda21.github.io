export const LANGS = ["en", "ja"] as const;

export type Lang = (typeof LANGS)[number];

export const STORAGE_KEY = "lang";

const isLang = (value: unknown): value is Lang =>
  LANGS.includes(value as Lang);

/**
 * The language to start in: a `?lang=` in the address wins (so a link can be
 * shared in one language), then the reader's last choice, then the browser's.
 * The same order is used by the inline script in index.html.
 */
export const readLang = (): Lang => {
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (isLang(param)) return param;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // Storage can be unavailable; fall through to the browser's language.
  }

  return navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
};
