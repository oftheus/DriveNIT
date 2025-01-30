import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface Reserva {
  id: number;
  nome: string;
  email: string;
  dataRetirada: string;
  dataDevolucao: string;
  carro: {
    id: number;
    marca: string;
    modelo: string;
  };
}

const Reservas: React.FC = () => {
  const [email, setEmail] = useState("");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [modalReserva, setModalReserva] = useState<Reserva | null>(null);

  const buscarReservas = async () => {
    if (!email) {
      alert("Por favor, insira um email válido.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/reservas/by-email?email=${email}`
      );
      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  const excluirReserva = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta reserva?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/reservas/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Reserva excluída com sucesso!");
        setReservas(reservas.filter((reserva) => reserva.id !== id));
      } else {
        alert("Erro ao excluir reserva");
      }
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
    }
  };

  const salvarEdicao = async (reservaEditada: Reserva) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reservas/${reservaEditada.id}?carroId=${reservaEditada.carro.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: reservaEditada.nome,
            email: reservaEditada.email,
            dataRetirada: reservaEditada.dataRetirada,
            dataDevolucao: reservaEditada.dataDevolucao,
          }),
        }
      );

      if (response.ok) {
        alert("Reserva atualizada com sucesso!");
        setReservas((prevReservas) =>
          prevReservas.map((reserva) =>
            reserva.id === reservaEditada.id ? reservaEditada : reserva
          )
        );
        setModalReserva(null);
      } else {
        alert("Erro ao atualizar reserva");
      }
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Reservas</h1>

      <div className="row mt-3">
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            placeholder="Digite o e-mail para buscar reservas"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={buscarReservas}>
            Buscar Reservas
          </button>
        </div>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Retirada</th>
            <th>Data de Devolução</th>
            <th>Carro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nome}</td>
              <td>{reserva.email}</td>
              <td>{reserva.dataRetirada}</td>
              <td>{reserva.dataDevolucao}</td>
              <td>{`${reserva.carro.marca} - ${reserva.carro.modelo}`}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setModalReserva(reserva)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => excluirReserva(reserva.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalReserva && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Reserva</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalReserva(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    salvarEdicao(modalReserva);
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      value={modalReserva.nome}
                      onChange={(e) =>
                        setModalReserva({
                          ...modalReserva,
                          nome: e.target.value,
                        }) as unknown as Reserva
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={modalReserva.email}
                      onChange={(e) =>
                        setModalReserva({
                          ...modalReserva,
                          email: e.target.value,
                        }) as unknown as Reserva
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Data de Retirada</label>
                    <input
                      type="date"
                      className="form-control"
                      value={modalReserva.dataRetirada}
                      onChange={(e) =>
                        setModalReserva({
                          ...modalReserva,
                          dataRetirada: e.target.value,
                        }) as unknown as Reserva
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Data de Devolução</label>
                    <input
                      type="date"
                      className="form-control"
                      value={modalReserva.dataDevolucao}
                      onChange={(e) =>
                        setModalReserva({
                          ...modalReserva,
                          dataDevolucao: e.target.value,
                        }) as unknown as Reserva
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Carro</label>
                    <input
                      type="text"
                      className="form-control"
                      value={modalReserva.carro.id}
                      onChange={(e) =>
                        setModalReserva({
                          ...modalReserva,
                          carro: {
                            ...modalReserva.carro,
                            id: Number(e.target.value),
                          },
                        }) as unknown as Reserva
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Salvar alterações
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
