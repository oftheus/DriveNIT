import React from "react";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import VehiclesSection from "./components/VehicleSection";
import Footer from "./components/Footer";
import Catalogo from "./pages/Catalago/Catalogo";
import SobreNos from "./pages/SobreNos/SobreNos";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Contato from "./pages/Contato/Contato";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Gerenciamento from "./pages/Gerenciamento/Gerenciamento";
import Reservas from "./pages/Reservas/Reservas";
import DetalhesCarro from "./pages/Detalhes/DetalhesCarro";
import ProtectedRoute from "./components/ProtectedRoute";
import EditarCarro from "./pages/Editar/EditarCarro";
import { useState, useEffect } from "react";
import Carrinho from "./pages/Carrinho/Carrinho";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente responsável por rolar a página automaticamente até o elemento correspondente ao hash da URL.
const ScrollToHash: React.FC = () => {
  // Hook useLocation do react-router-dom para acessar informações sobre a URL atual, incluindo o hash.
  const location = useLocation();
  // useEffect é usado para reagir a mudanças no hash da URL.
  React.useEffect(() => {
    if (location.hash) {
      // Procura pelo elemento no DOM que corresponde ao hash (ex.: #id).
      const element = document.querySelector(location.hash);
      if (element) {
        // Rola a página até o elemento encontrado com uma animação suave.
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]); // Executa o efeito sempre que a localização (e seu hash) mudar.

  return null; // Este componente não renderiza nada visível
};

// Componente principal para a página inicial.
const Home: React.FC = () => (
  <>
    {/* Cada seção da página inicial é representada como um componente separado. */}
    <HeroSection />
    <ServicesSection />
    <VehiclesSection />
    <Footer />
  </>
);

// Componente principal que organiza a estrutura do aplicativo.
const AppContent: React.FC = () => {
  const location = useLocation(); // Acessa informações sobre a rota atual.
  // Estado para gerenciar se o usuário está autenticado.
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true" // Inicializa o estado com base no valor armazenado localmente.
  );

  // useEffect para sincronizar o estado de autenticação com mudanças no localStorage.
  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };
    // Adiciona um listener para o evento "storage", garantindo que o estado seja atualizado em múltiplas abas.
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState); // Limpa o listener ao desmontar o componente.
  }, []);

  // Define as rotas onde a navbar não deve ser exibida (ex.: página de login).
  const hiddenNavbarPaths = ["/login"];
  const shouldShowNavbar = !hiddenNavbarPaths.includes(location.pathname); // Condição para exibir a navbar.

  return (
    <>
      {/* Componente que gerencia a rolagem automática para hashes na URL. */}
      <ScrollToHash />
      {/* Renderiza a Navbar apenas se a rota atual permitir. */}
      {shouldShowNavbar && <Navbar />}
      {/* Definição das rotas do aplicativo. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route
          path="/detalhes/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DetalhesCarro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditarCarro />
            </ProtectedRoute>
          }
        />
        <Route path="/sobrenos" element={<SobreNos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gerenciamento"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Gerenciamento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Reservas />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

// Componente principal do aplicativo que configura o roteamento.
const App: React.FC = () => {
  return (
    <Router>
      {" "}
      {/* Provedor de rotas do react-router-dom. */}
      <AppContent /> {/* Estrutura principal do conteúdo do aplicativo. */}
    </Router>
  );
};

export default App;
