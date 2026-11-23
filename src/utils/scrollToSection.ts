import { REDUCED_MOTION } from "@/hooks/useMediaQuery";

/**
 * Scrolls to a section without navigating: the address bar keeps its URL and
 * no history entry is added, so Back still leaves the site instead of
 * stepping through sections. Use as a link's click handler; the `href` stays
 * as the fallback.
 */
export const scrollToSection = (
  e: { preventDefault: () => void },
  id: string
) => {
  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();

  const behavior: ScrollBehavior = window.matchMedia(REDUCED_MOTION).matches
    ? "auto"
    : "smooth";

  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
  } else {
    target.scrollIntoView({ behavior, block: "start" });
  }
};
