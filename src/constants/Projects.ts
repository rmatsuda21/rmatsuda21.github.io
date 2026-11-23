import type { ProjectType } from "@/types/ProjectType";
import cstatGachaComImg from "@/assets/projects/cstat-gacha-com.webp";
import pitchIoImg from "@/assets/projects/pitch-io.webp";
import smashRankerImg from "@/assets/projects/smash-ranker.webp";

export const PROJECTS: readonly ProjectType[] = [
  {
    no: "001",
    title: "Smash Ranker",
    tagline: "Custom graphics for Smash Bros. tournaments",
    stack: "React · TS · GraphQL",
    img: smashRankerImg,
    width: 1600,
    height: 971,
    alt: "Smash Ranker editor showing a tournament top 8 graphic",
    link: "https://smash-ranker.vercel.app/",
    github: "https://github.com/rmatsuda21/smash-ranker",
    description: [
      "Smash Ranker is the next gen tool for creating customizable graphics for your Smash Bros. tournaments!",
      "As a tournament organizer myself, this has been a passion project of mine for years and I'm excited to share it with the community!",
      "Just throw your tournament url into the application and it'll pull all of the data from the Start.gg API and generate a custom graphic for you! The design's color, font, text, and images are fully customizable! Your designs can be shared with anyone through the import/export feature as well.",
      "Don't worry about your creation getting lost, all progress is saved in your browser's IndexedDB store so even if you close the tab, your progress will be saved!",
      "When your design is complete, you can download it as a PNG, JPEG, or WEBP file with optional export settings such as quality and pixel ratio!",
    ],
  },
  {
    no: "002",
    title: "CSTAT Gacha Com",
    tagline: "Web viewer with a full codex, card search and offers",
    stack: "Next · TS · Sass",
    img: cstatGachaComImg,
    width: 1600,
    height: 1044,
    alt: "CSTAT Gacha Com card codex",
    link: "https://cstat-gacha-com.vercel.app/",
    github: "https://github.com/rmatsuda21/cstat-gacha-com",
    description: [
      "CSTAT Gacha Com is a web viewer for the CSTAT Gacha project.",
      "Data is pulled from the CSTAT Gacha database and displayed in a user-friendly interface complete with a full codex, card searching, and offer viewing!",
    ],
  },
  {
    no: "003",
    title: "Pitch.io",
    tagline: "Relative pitch and chord trainer",
    stack: "React · Webpack",
    img: pitchIoImg,
    width: 1600,
    height: 1026,
    alt: "Pitch.io home screen with its three training modes",
    link: "https://pitch-io.vercel.app/",
    github: "https://github.com/rmatsuda21/pitch-io",
    description: [
      "Pitch.io is a web based relative pitch and chord identification trainer built with React. It has three modes: Relative Pitch Training, Chord Identification Training, and Freeplay.",
      "This application was created during the 2021 HowdyHack @ Texas A&M University.",
      "Awarded “Best Music Related”!",
    ],
  },
];
