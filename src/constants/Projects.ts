import type { ProjectType } from "@/types/ProjectType";
import cstatGatchaComGif from "@/assets/projects/cstat-gatcha-com.gif";
import cstatGatchaComImg from "@/assets/projects/cstat-gatcha-com.png";
import pitchIoImg from "@/assets/projects/pitch-io.png";
import pitchIoGif from "@/assets/projects/pitch-io.gif";

export const projects: ProjectType[] = [
  {
    img: cstatGatchaComImg,
    gif: cstatGatchaComGif,
    title: "CSTAT Gatcha Com",
    techStack: ["react", "next", "typescript", "sass"],
  },
  {
    img: pitchIoImg,
    gif: pitchIoGif,
    title: "Pitch.io",
    techStack: ["react", "webpack"],
  },
  // {
  //   img: "https://placehold.co/150x150",
  //   title: "Project 3",
  //   techStack: ["react", "next", "typescript", "sass", "webpack"],
  // },
  // {
  //   img: "https://placehold.co/150x150",
  //   title: "Project 4",
  //   techStack: ["react", "next", "typescript", "sass", "webpack"],
  // },
  // {
  //   img: "https://placehold.co/150x150",
  //   gif: "https://placehold.co/150x150",
  //   title: "Project 5",
  //   techStack: ["react", "next", "typescript", "sass", "webpack"],
  // },
  // {
  //   img: "https://placehold.co/150x150",
  //   gif: "https://placehold.co/150x150",
  //   title: "Project 6",
  //   techStack: ["react", "next", "typescript", "sass", "webpack"],
  // },
];
