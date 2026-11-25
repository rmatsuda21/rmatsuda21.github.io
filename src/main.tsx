import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IconContext } from "react-icons";

import "@fontsource-variable/rubik";

import "./reset.css";
import "./index.css";

import { Home } from "@/components/Home/Home.tsx";
import { LanguageProvider } from "@/i18n/LanguageProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconContext.Provider value={{ className: "react-icon" }}>
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    </IconContext.Provider>
  </StrictMode>
);
