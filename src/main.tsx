import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

import "./styles/global.css";
import { PlayingCardsProvider } from "./contexts/playing-cards-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlayingCardsProvider>
      <App />
    </PlayingCardsProvider>
  </StrictMode>
);
