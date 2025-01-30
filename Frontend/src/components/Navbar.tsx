import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  // Cria um estado para armazenar a lista de carros com os campos id, marca e modelo
  const [carros, setCarros] = useState<
    { id: number; marca: string; modelo: string }[]
  >([]);
  // Cria um estado para controlar o carregamento de dados (true se estiver carregando, false caso contrário)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Cria um estado para verificar se o usuário está autenticado, com base no valor armazenado no localStorage.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );
  // Hook do React para navegação entre páginas.
  const navigate = useNavigate();

  // O useEffect é usado para inicializar componentes do Bootstrap (Tooltip e Toasts) quando o componente é montado.
  // O array vazio [] significa que o efeito será executado apenas uma vez, após a primeira renderização do componente.
  useEffect(() => {
    // Inicializa o Bootstrap Tooltip
    // Seleciona todos os elementos que possuem o atributo 'data-bs-toggle="tooltip"'
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    // Para cada elemento encontrado, cria um novo tooltip do Bootstrap
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializa o Bootstrap Toasts (caixas de mensagem temporárias)
    // Obtém o elemento do DOM com o id 'reservationToast'
    const reservationToastElement = document.getElementById("reservationToast");

    // Obtém o elemento do DOM com o id 'errorToast'
    const errorToastElement = document.getElementById("errorToast");

    // Se o elemento de Toast de reserva existir, cria e configura o Toast
    if (reservationToastElement) {
      new bootstrap.Toast(reservationToastElement, {
        autohide: true, // O Toast desaparecerá automaticamente após o tempo configurado
        delay: 3000, // Tempo de exibição do Toast em milissegundos (3000ms = 3 segundos)
      });
    }

    // Se o elemento de Toast de erro existir, cria e configura o Toast
    if (errorToastElement) {
      new bootstrap.Toast(errorToastElement, { autohide: true, delay: 3000 });
    }
  }, []); // O efeito é executado apenas uma vez após a montagem do componente

  // Função que é chamada quando o formulário de reserva é enviado
  const handleFormSubmit = async (event: React.FormEvent) => {
    // Previne o comportamento padrão de envio do formulário (recarregar a página)
    event.preventDefault();

    // Obtém o formulário a partir do evento
    const form = event.target as HTMLFormElement;

    // Extrai os valores dos campos do formulário
    const nome = (form.nome as HTMLInputElement).value; // Obtém o nome do usuário
    const email = (form.email as HTMLInputElement).value; // Obtém o e-mail do usuário
    const carroId = (form.carro as HTMLSelectElement).value; // Obtém o ID do carro selecionado
    const dataRetirada = (form["data-retirada"] as HTMLInputElement).value; // Obtém a data de retirada
    const dataDevolucao = (form["data-devolucao"] as HTMLInputElement).value; // Obtém a data de devolução

    // Cria um objeto com os dados da reserva, sem o carroId (pois ele é passado na URL)
    const reserva = {
      nome,
      email,
      dataRetirada,
      dataDevolucao,
    };

    // Obtém o botão de envio do formulário
    const submitBtn = form.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    // Desabilita o botão de envio e altera seu conteúdo para mostrar um indicador de carregamento
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span class="visually-hidden" role="status">Loading...</span>
    `;

    try {
      // Envia a solicitação POST para a API com os dados da reserva e o ID do carro
      const response = await fetch(
        `http://localhost:8080/api/reservas?carroId=${carroId}`,
        {
          method: "POST", // Método HTTP para enviar os dados
          headers: {
            "Content-Type": "application/json", // Tipo de conteúdo enviado
          },
          body: JSON.stringify(reserva), // Corpo da solicitação, contendo os dados da reserva em formato JSON
        }
      );

      // Verifica se a resposta da API foi bem-sucedida (status 200 ou 201)
      if (response.status === 200 || response.status === 201) {
        // Se a reserva foi realizada com sucesso, exibe um toast de sucesso
        const toastSuccess = document.getElementById("reservationToast");
        if (toastSuccess) {
          console.log("Reserva realizada com sucesso!"); // Log para depuração
          const toast = new bootstrap.Toast(toastSuccess); // Cria o Toast do Bootstrap
          toast.show(); //Exibe o Toast de sucesso
        }
        form.reset(); // Reseta os campos do formulário após a submissão bem-sucedida
      } else {
        // Se ocorreu um erro na reserva, exibe um toast de erro
        console.log("Erro ao realizar a reserva: ", response.status); // Log para depuração
        const toastError = document.getElementById("errorToast");
        if (toastError) {
          const toast = new bootstrap.Toast(toastError); // Cria o Toast de erro
          toast.show(); // Exibe o Toast de erro
        }
      }
    } catch (error) {
      // Caso ocorra algum erro durante a requisição, exibe um toast de erro
      console.error("Erro ao realizar a reserva:", error); // Log para depuração
      const toastError = document.getElementById("errorToast");
      if (toastError) {
        const toast = new bootstrap.Toast(toastError); // Cria o Toast de erro
        toast.show(); // Exibe o Toast de erro
      }
    } finally {
      // Independentemente de o envio ter sido bem-sucedido ou não, reabilita o botão e redefine seu texto
      submitBtn.disabled = false; // Habilita o botão novamente
      submitBtn.innerHTML = "Reservar"; // Restaura o texto original do botão
    }
  };

  // Função que é chamada quando o usuário realiza o logout
  const handleLogout = () => {
    toast.success("Saiu da Conta!");
    // Remove a informação de autenticação armazenada no localStorage
    localStorage.removeItem("isAuthenticated");
    // Atualiza o estado de autenticação para 'false', indicando que o usuário não está mais autenticado
    setIsAuthenticated(false);
    // Redireciona o usuário para a página inicial ("/") sem deixar um histórico de navegação
    // O parâmetro 'replace: true' impede que a página de logout seja registrada no histórico de navegação
    navigate("/", { replace: true });
  };

  // Função chamada quando o usuário altera a categoria no seletor (dropdown)
  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Obtém o valor da categoria selecionada a partir do evento
    const categoriaSelecionada = event.target.value;
    console.log("Categoria selecionada:", categoriaSelecionada);

    try {
      // Faz uma requisição para a API para obter os carros da categoria selecionada
      const response = await fetch(
        `http://localhost:8080/api/carros?categoria=${categoriaSelecionada}`
      );
      // Converte a resposta da API em JSON
      const carrosData = await response.json();
      console.log("Resposta da API:", carrosData);

      // Verifica se a resposta contém uma propriedade 'content' que é um array válido
      if (carrosData.content && Array.isArray(carrosData.content)) {
        // Atualiza o estado 'carros' com os dados recebidos da API
        setCarros(carrosData.content);
        console.log("Carros atualizados:", carrosData.content);
      } else {
        // Caso a resposta não contenha um array válido, exibe um erro no console
        console.error(
          "A propriedade content não contém um array válido:",
          carrosData.content
        );
        // Define o estado 'carros' como um array vazio para evitar erros de renderização
        setCarros([]);
      }
    } catch (error) {
      // Caso ocorra um erro durante a requisição, exibe o erro no console
      console.error("Erro ao buscar carros:", error);
      // Define o estado 'carros' como um array vazio em caso de falha na requisição
      setCarros([]); // Evita erros de renderização em caso de falha
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-3 bg-body rounded">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="/">
          Drive<span className="nit-text">NIT</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fw-medium" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/#services">
                Serviços
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/catalogo">
                Veículos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/sobrenos">
                Sobre Nós
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/contato">
                Contato
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/carrinho">
                <i className="bi bi-cart text-primary bi-2x"></i>
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {/* Verifica se o usuário está autenticado */}
            {isAuthenticated ? (
              // Se estiver autenticado, exibe os botões de Dashboard e Logout
              <>
                <Link to="/dashboard" className="btn btn-outline-success me-2">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger me-2"
                >
                  Sair
                </button>
              </>
            ) : (
              // Se não estiver autenticado, exibe os botões de Login e Alugue Agora
              <>
                {/* Link para a página de Login, visível apenas para usuários não autenticados */}
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#reservaModal"
                >
                  Alugue Agora
                </button>
              </>
            )}

            {/* Modal */}
            <div
              className="modal fade"
              id="reservaModal"
              tabIndex={-1}
              aria-labelledby="reservaModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="reservaModalLabel">
                      Formulário de Reserva
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form id="reserva-form" onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nome"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">
                          Categoria
                        </label>
                        <select
                          className="form-select"
                          id="categoria"
                          onChange={(event) => {
                            console.log("onChange disparado"); // Log para verificar
                            handleCategoryChange(event);
                          }}
                        >
                          <option selected disabled>
                            Selecione uma categoria
                          </option>
                          <option value="SUV">SUV</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Hatch">Hatch</option>
                          <option value="Minivan">Minivan</option>
                          <option value="Premium">Premium</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="carro" className="form-label">
                          Carro
                        </label>
                        <select className="form-select" id="carro">
                          <option selected disabled>
                            Selecione um carro
                          </option>
                          {carros.length > 0 ? (
                            carros.map((carro) => (
                              <option key={carro.id} value={carro.id}>
                                {carro.marca} - {carro.modelo}
                              </option>
                            ))
                          ) : (
                            <option disabled>Nenhum carro disponível</option>
                          )}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="data-retirada" className="form-label">
                          Data de Retirada
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="data-retirada"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="data-devolucao" className="form-label">
                          Data de Devolução
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="data-devolucao"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Reservar
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Toast Container */}
            <div
              className="position-fixed bottom-0 end-0 p-3"
              id="toastContainer"
              style={{ zIndex: 9999 }}
            >
              <div
                id="reservationToast"
                className="toast align-items-center text-bg-success border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="d-flex">
                  <div className="toast-body">Reserva criada com sucesso!</div>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
              </div>

              <div
                id="errorToast"
                className="toast align-items-center text-bg-danger border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="d-flex">
                  <div className="toast-body">
                    Erro ao realizar a reserva. Por favor, tente novamente.
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
