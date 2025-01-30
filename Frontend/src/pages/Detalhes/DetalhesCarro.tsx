import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
/*
A biblioteca Axios é usada no código para realizar requisições HTTP.
No código, o Axios é usado p/:
-Buscar detalhes de um carro com uma requisição GET.
-Remover um carro com uma requisição DELETE.
-Tratar erros de forma eficiente.
-Facilitar a comunicação com a API RESTful, simplificando a interação com o backend.
*/

//O código implementa o componente DetalhesCarro, que exibe as informações detalhadas de um carro específico.
//Ele inclui funcionalidades para autenticação, carregamento de dados, edição e remoção de um carro.

// A interface Carro define o formato do objeto que representa um carro
interface Carro {
  id: number;
  marca: string;
  preco: number;
  ano: number;
  modelo: string;
  categoria: string;
  caminhoImagem: string;
}

const DetalhesCarro: React.FC = () => {
  // Extrai o parâmetro id da URL usando o hook useParams p/ identificar qual carro deve ser exibido
  // O parâmetro id é tipado como string para evitar problemas de tipo.
  const { id } = useParams<{ id: string }>();

  // Inicializa o hook useNavigate, que permite redirecionar o usuário para outras rotas.
  const navigate = useNavigate();

  // Declara um estado carro para armazenar os detalhes do carro recuperados da API.
  // O estado inicial é null, indicando que os dados ainda não foram carregados.
  // A interface Carro garante que o estado tenha o formato correto
  const [carro, setCarro] = useState<Carro | null>(null);

  //Verifica se o user está autenticado ao checar um item no localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  //Se o usuário n tiver autenticado, o componente redireciona para a página de login usando o componente <Navigate />.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /*
  Usa o hook useEffect para buscar os detalhes do carro na API ao carregar o componente
  O ID do carro é obtido por meio do hook useParams, que extrai parâmetros da URL
  Requisição à API:
    - Faz uma requisição GET para buscar os detalhes do carro pelo ID.
    - Em caso de sucesso, os dados retornados são armazenados no estado `carro` usando `setCarro`.
    - Em caso de erro, uma mensagem de erro é exibida no console.
  */
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/carros/${id}`)
      .then((response) => {
        setCarro(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do carro:", error);
      });
  }, [id]);

  /*
  handleEdit:
   - Navega para a página de edição do carro usando o hook useNavigate
   - Redireciona o usuário para a URL /editar/{id}.
  */
  const handleEdit = () => {
    navigate(`/editar/${id}`);
  };

  /*
  handleRemove:
   - Faz uma requisição DELETE para remover o carro da API.
   - Em caso de sucesso:
     - Exibe uma mensagem de sucesso com `toast.success`.
     - Redireciona o usuário para o catálogo de carros.
   - Em caso de erro, exibe uma mensagem de erro no console.
  */
  const handleRemove = () => {
    axios
      .delete(`http://localhost:8080/api/carros/${id}`)
      .then(() => {
        toast.success("Carro removido com sucesso!");
        navigate("/catalogo");
      })
      .catch((error) => {
        console.error("Erro ao remover o carro:", error);
      });
  };

  //Enquanto os dados do carro não estão disponíveis (`carro` é `null`), exibe uma mensagem de "Carregando...".
  if (!carro) {
    return <div>Carregando...</div>;
  }

  /*
  - Mostra as informações do carro, como:
     - Modelo, marca, preço, ano, categoria.
     - Uma imagem do carro com o caminho especificado em caminhoImagem.
  - Botões para Editar e Remover:
     - O botão "Editar" chama `handleEdit`.
     - O botão "Remover" chama `handleRemove`.
  */
  return (
    <div className="container mt-4">
      <h1>{carro.modelo}</h1>
      <img
        src={carro.caminhoImagem}
        alt={carro.modelo}
        className="img-fluid mb-4"
      />
      <p>
        <strong>Marca:</strong> {carro.marca}
      </p>
      <p>
        <strong>Preço:</strong> R$ {carro.preco}/dia
      </p>
      <p>
        <strong>Ano:</strong> {carro.ano}
      </p>
      <p>
        <strong>Categoria:</strong> {carro.categoria}
      </p>
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-primary" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={handleRemove}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default DetalhesCarro;
