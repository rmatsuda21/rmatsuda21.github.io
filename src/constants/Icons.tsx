import { FaAngular, FaJava, FaPython, FaReact } from "react-icons/fa6";
import { SiWebpack } from "react-icons/si";
import {
  TbBrandNextjs,
  TbBrandSass,
  TbBrandTypescript,
  TbBrandCSharp,
} from "react-icons/tb";

export const Icons = {
  react: {
    name: "React",
    icon: <FaReact />,
  },
  next: {
    name: "Next",
    icon: <TbBrandNextjs />,
  },
  typescript: {
    name: "Typescript",
    icon: <TbBrandTypescript />,
  },
  python: {
    name: "Python",
    icon: <FaPython />,
  },
  angular: {
    name: "Angular",
    icon: <FaAngular />,
  },
  sass: {
    name: "Sass",
    icon: <TbBrandSass />,
  },
  java: {
    name: "Java",
    icon: <FaJava />,
  },
  csharp: {
    name: "C#",
    icon: <TbBrandCSharp />,
  },
  webpack: {
    name: "Webpack",
    icon: <SiWebpack />,
  },
} as const;
