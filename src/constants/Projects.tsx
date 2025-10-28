import type { ProjectType } from "@/types/ProjectType";
import cstatGatchaComGif from "@/assets/projects/cstat-gatcha-com.gif";
import cstatGatchaComImg from "@/assets/projects/cstat-gatcha-com.png";
import pitchIoImg from "@/assets/projects/pitch-io.png";
import pitchIoGif from "@/assets/projects/pitch-io.gif";

export const PROJECTS = Object.freeze([
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
          A web application that allows users to create and share gacha cards
          from the College Station Super Smash Bros. Discord!
        </p>
        <h3 style={{ marginTop: "25px" }}>More information coming soon 👀</h3>
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
        <p>A web based application to train your pitch skills!</p>
        <h3 style={{ marginTop: "25px" }}>More information coming soon 👀</h3>
      </>
    ),
  },
]) as ProjectType[];
