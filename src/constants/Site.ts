// Their labels are in `i18n/strings.ts`, under `sections`.
export const SECTIONS = [
  { id: "top", no: "01" },
  { id: "experience", no: "02" },
  { id: "work", no: "03" },
  { id: "lab", no: "04" },
  { id: "contact", no: "05" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const LINKS = {
  email: "reo.matsuda@gmail.com",
  github: "https://github.com/rmatsuda21",
  linkedin: "https://www.linkedin.com/in/reomatsuda/",
  codepen: "https://codepen.io/rmatsuda",
} as const;
