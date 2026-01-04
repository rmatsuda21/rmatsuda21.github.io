import type { ProjectType } from "@/types/ProjectType";
import cstatGatchaComGif from "@/assets/projects/cstat-gatcha-com.gif";
import cstatGatchaComImg from "@/assets/projects/cstat-gatcha-com.png";
import pitchIoImg from "@/assets/projects/pitch-io.png";
import pitchIoGif from "@/assets/projects/pitch-io.gif";
import smashRankerImg from "@/assets/projects/smash-ranker.png";
import smashRankerGif from "@/assets/projects/smash-ranker.gif";

export const PROJECTS: readonly ProjectType[] = [
  {
    img: smashRankerImg,
    gif: smashRankerGif,
    title: "Smash Ranker",
    techStack: ["react", "typescript", "vite", "sass", "vercel", "graphql"],
    link: "https://smash-ranker.vercel.app/ranker",
    github: "https://github.com/rmatsuda21/smash-ranker",
    description: (
      <>
        <p>
          Smash Ranker is the next gen tool for creating customizable graphics
          for your Smash Bros. tournaments! <br />
          <br />
          As a tournament organizer myself, this has been a pasison project of
          mine for years and I'm excited to share it with the community!
          <br />
          <br />
          Just throw your tournament url into the application and it'll pull all
          of the data from the Start.gg API and generate a custom graphic for
          you! The design's color, font, text, and images are fully
          customizable! Your designs can be shared with anyone through the
          import/export feature as well.
          <br />
          <br />
          Don't worry about your creation getting lost, all progress is saved in
          your browser's IndexedDB store so even if you close the tab, your
          progress will be saved!
          <br />
          <br />
          When your design is complete, you can download it as a PNG, JPEG, or
          WEBP file with optional export settings such as quality and pixel
          ratio!
        </p>
      </>
    ),
  },
  {
    img: cstatGatchaComImg,
    gif: cstatGatchaComGif,
    title: "CSTAT Gacha Com",
    techStack: ["react", "next", "typescript", "sass", "vercel"],
    link: "https://cstat-gacha-com.vercel.app/",
    github: "https://github.com/rmatsuda21/cstat-gacha-com",
    description: (
      <>
        <p>
          CSTAT Gacha Com is a web viewer for the <i>CSTAT Gacha</i> project.
          <br />
          <br />
          Data is pulled from the <i>CSTAT Gacha</i> database and displayed in a
          user-friendly interface complete with your a full codex, card
          searching, and offer viewing!
        </p>
      </>
    ),
  },
  {
    img: pitchIoImg,
    gif: pitchIoGif,
    title: "Pitch.io",
    techStack: ["react", "webpack", "vercel"],
    link: "https://pitch-io.vercel.app/",
    github: "https://github.com/rmatsuda21/pitch-io",
    description: (
      <>
        <p>
          Pitch.io is a web based relative pitch and chord identification
          trainer built with React. It has three modes: Relative Pitch Training,
          Chord Identification Training, and Freeplay. <br />
          <br />
          This application was created during the 2021 HowdyHack @ Texas A&M
          University. <br />
          <br />
          Awarded "Best Music Related"!
        </p>
      </>
    ),
  },
] as const;
