import type { Icons } from "@/constants/Icons";

export type ProjectType = {
  img: string;
  gif?: string;
  title: string;
  techStack: (keyof typeof Icons)[];
  link: string;
  github: string;
  description: React.ReactNode;
};
