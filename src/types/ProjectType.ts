export type ProjectType = {
  no: string;
  title: string;
  tagline: string;
  /** Short stack line for the index row. */
  stack: string;
  img: string;
  /** Intrinsic size of `img`, so the layout does not shift while it loads. */
  width: number;
  height: number;
  alt: string;
  /** Buttons under the description, in order. */
  links: readonly { label: string; href: string }[];
  description: readonly string[];
};
