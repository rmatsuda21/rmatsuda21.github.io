import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IconContext } from "react-icons";

import "@fontsource-variable/rubik";

import "./reset.css";
import "./index.css";

import { Home } from "@/components/Home/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconContext.Provider value={{ className: "react-icon" }}>
      <Home />
    </IconContext.Provider>
  </StrictMode>
);
