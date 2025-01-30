import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validarLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "admin" && password === "123") {
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("storage")); // Dispara evento de sincronização

      // Decide para onde redirecionar após o login
      const from = location.state?.from?.pathname;
      const redirectTo = from && from !== "/" ? from : "/dashboard";

      navigate(redirectTo, { replace: true });
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.dispatchEvent(new Event("storage")); // Atualiza o estado global
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-light d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={validarLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuário
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Entrar
                    </button>
                  </div>
                  {error && (
                    <div className="mt-3 text-danger text-center">
                      Usuário ou senha incorretos
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
