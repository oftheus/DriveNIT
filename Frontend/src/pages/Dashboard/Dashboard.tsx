import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <p className="text-center">
        Bem-vindo, admin! Aqui você pode gerenciar as reservas e carros.
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <a href="/gerenciamento" className="btn btn-primary">
          Gerenciar Carros
        </a>
        <a href="/reservas" className="btn btn-secondary">
          Gerenciar Reservas
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
