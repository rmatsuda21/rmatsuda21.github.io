import type { IconKeys } from "@/constants/Icons";

export type ProjectType = {
  img: string;
  gif?: string;
  title: string;
  techStack: IconKeys[];
  link: string;
  github: string;
  description: React.ReactNode;
};
