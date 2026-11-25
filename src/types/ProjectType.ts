export type ProjectImage = {
  src: string;
  /** Intrinsic size of `src`, so the layout does not shift while it loads. */
  width: number;
  height: number;
  alt: string;
};

export type ProjectType = {
  no: string;
  title: string;
  tagline: string;
  /** Short stack line for the index row. */
  stack: string;
  /** Screenshots, cover first. Always at least one. */
  images: readonly ProjectImage[];
  /** Buttons under the description, in order. */
  links: readonly { label: string; href: string }[];
  description: readonly string[];
};
