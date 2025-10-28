import { FaAngular, FaJava, FaPython, FaReact } from "react-icons/fa6";
import { SiVercel, SiWebpack } from "react-icons/si";
import {
  TbBrandNextjs,
  TbBrandSass,
  TbBrandTypescript,
  TbBrandCSharp,
} from "react-icons/tb";

export const Icons = {
  react: {
    name: "React",
    icon: <FaReact key="react" />,
  },
  next: {
    name: "Next",
    icon: <TbBrandNextjs key="next" />,
  },
  typescript: {
    name: "Typescript",
    icon: <TbBrandTypescript key="typescript" />,
  },
  python: {
    name: "Python",
    icon: <FaPython key="python" />,
  },
  angular: {
    name: "Angular",
    icon: <FaAngular key="angular" />,
  },
  sass: {
    name: "Sass",
    icon: <TbBrandSass key="sass" />,
  },
  java: {
    name: "Java",
    icon: <FaJava key="java" />,
  },
  csharp: {
    name: "C#",
    icon: <TbBrandCSharp key="csharp" />,
  },
  webpack: {
    name: "Webpack",
    icon: <SiWebpack key="webpack" />,
  },
  vercel: {
    name: "Vercel",
    icon: <SiVercel key="vercel" />,
  },
} as const;
