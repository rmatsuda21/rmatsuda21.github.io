import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./reset.css";
import "./index.css";

import Home from "./components/Home.tsx";
import { IconContext } from "react-icons";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconContext.Provider value={{ className: "react-icon" }}>
      <Home />
    </IconContext.Provider>
  </StrictMode>
);
