import { FINE_POINTER } from "@/hooks/useMediaQuery";

/**
 * A short buzz on touch devices that support it (Android; iOS Safari has no
 * Vibration API and simply does nothing). Purely a garnish: nothing depends
 * on it.
 */
export const haptic = (ms = 8) => {
  if (window.matchMedia(FINE_POINTER).matches) return;
  try {
    navigator.vibrate?.(ms);
  } catch {
    // Some browsers throw when vibration is blocked; ignore.
  }
};
