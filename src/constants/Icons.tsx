import {
  FaAngular,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { SiJest, SiTailwindcss, SiVercel, SiWebpack } from "react-icons/si";
import {
  TbBrandNextjs,
  TbBrandSass,
  TbBrandTypescript,
  TbBrandCSharp,
  TbBrandVite,
  TbBrandFramerMotion,
} from "react-icons/tb";

export const Icons = {
  react: {
    name: "React",
    icon: <FaReact key="react" />,
  },
  next: {
    name: "Next.js",
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
  node: {
    name: "Node.js",
    icon: <FaNodeJs key="node" />,
  },
  vite: {
    name: "Vite",
    icon: <TbBrandVite key="vite" />,
  },
  tailwind: {
    name: "Tailwind CSS",
    icon: <SiTailwindcss key="tailwind" />,
  },
  motion: {
    name: "Motion",
    icon: <TbBrandFramerMotion key="motion" />,
  },
  jest: {
    name: "Jest",
    icon: <SiJest key="jest" />,
  },
} as const;

export type IconKeys = keyof typeof Icons;
