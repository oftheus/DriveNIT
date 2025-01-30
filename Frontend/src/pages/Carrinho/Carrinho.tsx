import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Carro {
  id: number;
  marca: string;
  preco: number;
  ano: number;
  modelo: string;
  categoria: string;
  caminhoImagem: string;
}

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

const Carrinho: React.FC = () => {
  // Estado para armazenar os carros no carrinho
  const [cart, setCart] = useState<Carro[]>([]);
  // Estado para armazenar as reservas, omitindo 'nome' e 'email' que são tratados separadamente
  const [reservas, setReservas] = useState<Omit<Reserva, "nome" | "email">[]>(
    []
  );
  // Estado para armazenar o nome e email do usuário, necessários para finalizar a reserva
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // useEffect para carregar os dados do carrinho do localStorage e inicializar as reservas
  useEffect(() => {
    // Recupera o carrinho armazenado no localStorage ou inicializa com um array vazio
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    // Inicializa reservas para cada carro no carrinho
    const initialReservas = storedCart.map((carro: Carro) => ({
      id: carro.id,
      dataRetirada: "",
      dataDevolucao: "",
      carro: {
        id: carro.id,
        marca: carro.marca,
        modelo: carro.modelo,
        preco: carro.preco, // Certifique-se de que o preço da diária é passado no carro
      },
    }));
    setReservas(initialReservas);
  }, []); // O array vazio significa que o efeito será executado apenas uma vez, ao carregar o componente

  // Função para atualizar os dados de uma reserva específica
  const handleReservaChange = (id: number, field: string, value: string) => {
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva.id === id ? { ...reserva, [field]: value } : reserva
      )
    );
  };

  // Função para remover um carro do carrinho e da lista de reservas
  const handleRemove = (id: number) => {
    // Filtra os carros e as reservas, removendo o carro com o id correspondente
    const updatedCart = cart.filter((item) => item.id !== id);
    const updatedReservas = reservas.filter((reserva) => reserva.id !== id);

    // Atualiza o estado do carrinho e das reservas
    setCart(updatedCart);
    setReservas(updatedReservas);

    // Atualiza o localStorage com o carrinho modificado
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Função para finalizar as reservas e enviar para o servidor
  const handleFinalizeReservas = async () => {
    // Mapeia as reservas para incluir os dados necessários para o envio
    const reservasCompletas = reservas.map((reserva) => ({
      carroId: reserva.carro.id, // Passar o ID do carro na URL
      nome,
      email,
      dataRetirada: reserva.dataRetirada,
      dataDevolucao: reserva.dataDevolucao,
    }));

    try {
      // Loop para enviar cada reserva para o servidor
      for (const reserva of reservasCompletas) {
        const response = await fetch(
          `http://localhost:8080/api/reservas?carroId=${reserva.carroId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Especifica que o corpo da requisição é em formato JSON
            },
            body: JSON.stringify({
              nome: reserva.nome,
              email: reserva.email,
              dataRetirada: reserva.dataRetirada,
              dataDevolucao: reserva.dataDevolucao,
            }),
          }
        );

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
          console.error(
            `Erro ao realizar reserva para o carro ${reserva.carroId}:`,
            response.status
          );
          alert(`Erro ao reservar o carro ${reserva.carroId}`);
          return; // Se houver erro, interrompe o processo
        }
      }

      // Caso as reservas sejam feitas com sucesso:
      toast.success("Reserva realizada com sucesso!");

      // Limpar o carrinho e as reservas
      setCart([]);
      setReservas([]);

      // Limpar os campos de nome e email
      setNome("");
      setEmail("");

      // Limpar o localStorage
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      // Em caso de erro na requisição ou no processo
      console.error("Erro ao finalizar reservas:", error);
      alert("Erro ao finalizar reservas. Tente novamente.");
    }
  };

  // Função para calcular o preço total com base no carro, data de retirada e devolução
  const calcularPrecoTotal = (
    carroId: number,
    dataRetirada: string,
    dataDevolucao: string
  ) => {
    // Encontra o carro no carrinho com o id fornecido
    const carro = cart.find((carro) => carro.id === carroId);
    // Se não encontrar o carro ou se as datas não forem válidas, retorna 0
    if (!carro || !dataRetirada || !dataDevolucao) return 0;

    const precoDiaria = carro.preco; // Preço da diária do carro
    const dataInicio = new Date(dataRetirada); // Converte a data de retirada para objeto Date
    const dataFim = new Date(dataDevolucao); // Converte a data de devolução para objeto Date

    // Calculando a diferença em dias
    const diffTime = Math.abs(dataFim.getTime() - dataInicio.getTime());
    // Converte a diferença de tempo para o número de dias
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Retorna o preço total multiplicando o preço da diária pela quantidade de dias
    return precoDiaria * diffDays;
  };

  return (
    <div className="container my-4">
      <h2>Seu Carrinho</h2>
      {cart.length > 0 ? (
        <>
          <div className="mb-4">
            <h4>Informações do Usuário</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Carro</th>
                <th>Categoria</th>
                <th>Preço da Diária</th>
                <th>Data de Retirada</th>
                <th>Data de Devolução</th>
                <th>Preço Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((carro) => (
                <tr key={carro.id}>
                  <td>{carro.modelo}</td>
                  <td>{carro.categoria}</td>
                  <td>R${carro.preco.toFixed(2)}</td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        reservas.find((reserva) => reserva.id === carro.id)
                          ?.dataRetirada || ""
                      }
                      onChange={(e) =>
                        handleReservaChange(
                          carro.id,
                          "dataRetirada",
                          e.target.value
                        )
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        reservas.find((reserva) => reserva.id === carro.id)
                          ?.dataDevolucao || ""
                      }
                      onChange={(e) =>
                        handleReservaChange(
                          carro.id,
                          "dataDevolucao",
                          e.target.value
                        )
                      }
                      required
                    />
                  </td>
                  <td>
                    <strong>
                      R${" "}
                      {calcularPrecoTotal(
                        carro.id,
                        reservas.find((reserva) => reserva.id === carro.id)
                          ?.dataRetirada || "",
                        reservas.find((reserva) => reserva.id === carro.id)
                          ?.dataDevolucao || ""
                      ).toFixed(2)}
                    </strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(carro.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="btn btn-success mt-3"
            onClick={handleFinalizeReservas}
          >
            Finalizar Reservas
          </button>
        </>
      ) : (
        <p>Seu carrinho está vazio.</p>
      )}
    </div>
  );
};

export default Carrinho;
