import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

//componente que permite ao usuário editar as informações de um carro específico.
const EditarCarro: React.FC = () => {
  // Extrai o parâmetro id da URL usando o hook useParams p/ identificar qual carro deve ser exibido
  // O parâmetro id é tipado como string para evitar problemas de tipo.
  const { id } = useParams<{ id: string }>();
  
  // Inicializa o hook useNavigate, que permite redirecionar o usuário para outras rotas.
  const navigate = useNavigate();
  
  // Declara um estado carro para armazenar os detalhes do carro recuperados da API.
  // O estado inicial é null, indicando que os dados ainda não foram carregados.
  // A interface Carro garante que o estado tenha o formato correto
  const [carro, setCarro] = useState<Carro | null>(null);
  
  /*
  Este trecho de código cria um estado chamado formData p/ armazenar os dados do formulário de edição de um carro. 
  Ele utiliza a interface Carro, mas omite a propriedade id, já que o id não será editado no formulário. 
  O estado é inicializado com valores padrão para as propriedades editáveis: marca, preco, ano, modelo, categoria e caminhoImagem.
  */
  const [formData, setFormData] = useState<Omit<Carro, "id">>({
    marca: "",
    preco: 0,
    ano: 0,
    modelo: "",
    categoria: "",
    caminhoImagem: "",
  });

  /*
  useEffect: Executa a busca dos detalhes do carro assim que o componente é montado.
  Requisição GET: Busca os dados do carro pela API com base no id.
  Atualização do Estado:
    -setCarro: Atualiza o estado com os dados do carro.
    -setFormData: Inicializa os valores do formulário com os dados recebidos.
  */
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/carros/${id}`)
      .then((response) => {
        setCarro(response.data);
        setFormData({
          marca: response.data.marca,
          preco: response.data.preco,
          ano: response.data.ano,
          modelo: response.data.modelo,
          categoria: response.data.categoria,
          caminhoImagem: response.data.caminhoImagem,
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do carro:", error);
      });
  }, [id]);

  /*
  Evento de Mudança (e: React.ChangeEvent<HTMLInputElement>):
  O parâmetro e é o evento de mudança (change) gerado quando o valor de um campo de entrada (<input>) é alterado.
  O tipo React.ChangeEvent<HTMLInputElement> é usado para garantir que o evento seja tipado corretamente, indicando que ele se refere a um campo de entrada.
  
  Desestruturação de e.target:
  const { name, value } = e.target;:
  e.target é o elemento do DOM que disparou o evento (o campo de entrada que foi alterado).
  A desestruturação extrai duas propriedades do e.target:
    name: O nome do campo (por exemplo, marca, preco, etc.), que será usado para identificar qual propriedade de formData deve ser atualizada.
    value: O novo valor digitado no campo de entrada.
  
  Atualização do Estado (setFormData):
  setFormData é a função que atualiza o estado formData com os novos valores.
  ...formData: O operador de espalhamento (...) copia o estado atual de formData p/ garantir que as outras propriedades n sejam perdidas.
  [name]: ...: A chave do objeto formData é determinada dinamicamente pelo valor de name. Isso permite que o valor de qualquer campo de entrada seja atualizado corretamente no estado.
  
  Tratamento de Tipos Específicos:
  name === "preco" || name === "ano":
  P/ os campos preco e ano, o valor precisa ser convertido para um número (pq o tipo de entrada é number e o valor do campo é uma string).
  parseFloat(value) converte o valor de string para número de ponto flutuante.
  P/ os outros campos, o valor é mantido como string, sem necessidade de conversão.
  */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "preco" || name === "ano" ? parseFloat(value) : value,
    });
  };

  /*
  Evita o comportamento padrão do formulário (e.preventDefault).
  Envia os dados atualizados para a API via requisição PUT.
  Em caso de sucesso:
    Exibe uma mensagem de sucesso (toast.success).
    Redireciona o usuário para a página de detalhes do carro.
  Em caso de erro:
    Exibe a mensagem de erro no console.
  */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/carros/${id}`, formData)
      .then(() => {
        toast.success("Carro atualizado com sucesso!");
        navigate(`/detalhes/${id}`);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o carro:", error);
      });
  };

  // Se os dados do carro ainda não foram carregados (carro === null), exibe uma mensagem de carregamento.
  if (!carro) {
    return <div>Carregando...</div>;
  }

  //Renderiza o formulário com os campos preenchidos com os dados do estado formData.
  return (
    <div className="container mt-4">
      <h1>Editar Carro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">
            Marca
          </label>
          <input
            type="text"
            className="form-control"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label">
            Modelo
          </label>
          <input
            type="text"
            className="form-control"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ano" className="form-label">
            Ano
          </label>
          <input
            type="number"
            className="form-control"
            id="ano"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">
            Preço
          </label>
          <input
            type="number"
            className="form-control"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoria
          </label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="caminhoImagem" className="form-label">
            Caminho da Imagem
          </label>
          <input
            type="text"
            className="form-control"
            id="caminhoImagem"
            name="caminhoImagem"
            value={formData.caminhoImagem}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditarCarro;
