export const SECTIONS = [
  { id: "top", no: "01", label: "Subject" },
  { id: "experience", no: "02", label: "Experience" },
  { id: "work", no: "03", label: "Work" },
  { id: "lab", no: "04", label: "Lab" },
  { id: "contact", no: "05", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const LINKS = {
  email: "reo.matsuda@gmail.com",
  github: "https://github.com/rmatsuda21",
  linkedin: "https://www.linkedin.com/in/reomatsuda/",
  codepen: "https://codepen.io/rmatsuda",
} as const;
