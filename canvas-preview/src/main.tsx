import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { App } from "./App";
import "./app.css";

const el = document.getElementById("root");
if (!el) {
  throw new Error("missing #root");
}

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
