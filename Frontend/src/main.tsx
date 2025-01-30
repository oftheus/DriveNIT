import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Seleciona o elemento HTML com o ID "root" do DOM.
// Este é o contêiner principal onde o React renderizará o conteúdo.
createRoot(document.getElementById("root")!).render(
  // Renderiza o componente principal (<App />) dentro de <StrictMode>.
  // - <StrictMode> ativa verificações e avisos adicionais para detectar práticas obsoletas ou problemáticas.
  // - <App /> é o ponto de entrada do aplicativo React.
  <StrictMode>
    <App />
  </StrictMode>
);
