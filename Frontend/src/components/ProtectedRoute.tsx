import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Definição das propriedades (props) que o componente ProtectedRoute irá receber
interface ProtectedRouteProps {
  // Indica se o usuário está autenticado ou não
  isAuthenticated: boolean;
  // Os filhos (children) representam o conteúdo que será renderizado quando a rota for protegida
  children: React.ReactNode;
}

// Componente ProtectedRoute, responsável por proteger rotas com base no estado de autenticação
//Recebe duas propriedades (props):
//isAuthenticated: um booleano que indica se o usuário está autenticado.
//children: o conteúdo da rota protegida. 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  // Obtém a localização atual da página (usado para redirecionamento após login)
  const location = useLocation();

  // Verifica se o usuário não está autenticado
  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    // O parâmetro 'state' é usado para armazenar a localização atual e permitir redirecionamento
    // de volta para a página que o usuário tentou acessar após o login bem-sucedido
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Se o usuário estiver autenticado, renderiza os filhos (children) da rota protegida
  return <>{children}</>;
};

export default ProtectedRoute;
