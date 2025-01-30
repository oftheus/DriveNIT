import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { z } from "zod";
import { toast } from "react-toastify";

interface Carro {
  id?: number;
  marca: string;
  modelo: string;
  ano: number;
  preco: number;
  categoria: string;
  caminhoImagem: string;
}

const apiUrl = "http://localhost:8080/api/carros";

const currentYear = new Date().getFullYear();
// Esquema de validação com Zod
const carroSchema = z.object({
  marca: z
    .string()
    .min(2, "Marca é obrigatória")
    .max(30, "Marca deve ter no mínimo 2 caracteres e no máximo 30 caracteres"),
  modelo: z
    .string()
    .min(2, "Modelo é obrigatório")
    .max(
      30,
      "Modelo deve ter np mínimo 2 caracteres e no máximo 30 caracteres"
    ),
  ano: z
    .number()
    .int("Ano deve ser um número inteiro")
    .gte(2000, "Ano inválido")
    .lte(currentYear, "Ano não pode ser no futuro"),
  preco: z
    .number()
    .positive("O preço deve ser maior que zero")
    .lte(100_000, "O preço não pode exceder R$ 100.000"), // Limite superior hipotético
  caminhoImagem: z
    .string()
    .min(2, "Caminho da Imagem é obrigatório")
    .max(
      30,
      "Caminho da Imagem deve ter no mínimo 2 caracteres e no máximo 30 caracteres"
    ),
  categoria: z.enum(["Sedan", "Hatch", "Minivan", "SUV", "Premium"], {
    errorMap: () => ({
      message:
        "Categoria inválida. Escolha entre Sedan, Hatch, Premium, Minivan ou SUV",
    }),
  }),
});

// Esquema para edição (inclui ID opcional)
const carroEditSchema = carroSchema.extend({
  id: z.number().optional(),
});

// Esquema para remoção
const carroDeleteSchema = z.object({
  id: z.number().positive("ID inválido para remoção"),
});

const Gerenciamento: React.FC = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [form, setForm] = useState<Carro>({
    marca: "",
    modelo: "",
    ano: 0,
    preco: 0,
    categoria: "",
    caminhoImagem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editId, setEditId] = useState<number | null>(null);

  const [page, setPage] = useState(0); // Página atual (índice começa em 0)
  const [size, setSize] = useState(7); // Tamanho da página
  const [totalPages, setTotalPages] = useState(0); // Total de páginas disponíveis

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<string>("id"); // Campo atual de ordenação
  const [direction, setDirection] = useState<string>("asc"); // Direção atual de ordenação

  // Função para buscar carros da API
  const fetchCarros = async (
    page: number = 0,
    size: number = 7,
    sortBy: string = "id",
    direction: string = "asc"
  ) => {
    try {
      const response = await fetch(
        `${apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
      );
      const data = await response.json();
      setCarros(data.content); // Atualiza a lista de carros
      setTotalPages(data.totalPages); // Atualiza o número total de páginas
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }
  };

  const handleSort = (field: string) => {
    if (field === sortBy) {
      // Alterna a direção para a mesma coluna
      const newDirection = direction === "asc" ? "desc" : "asc";
      setDirection(newDirection);
      fetchCarros(page, size, field, newDirection);
    } else {
      // Define nova coluna e reseta a direção para ascendente
      setSortBy(field);
      const newDirection = "asc";
      setDirection(newDirection);
      fetchCarros(page, size, field, newDirection);
    }
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: id === "ano" || id === "preco" ? Number(value) : value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = editId
      ? carroEditSchema.safeParse({ ...form, id: editId })
      : carroSchema.safeParse(form);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${apiUrl}/${editId}` : apiUrl;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success("Cadastrado com Sucesso!");
      setForm({
        marca: "",
        modelo: "",
        ano: 0,
        preco: 0,
        categoria: "",
        caminhoImagem: "",
      });
      setEditId(null);
      fetchCarros();
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
    }
  };

  // Função para editar carro
  const handleEdit = (carro: Carro) => {
    setForm(carro);
    setEditId(carro.id || null);
  };

  // Função para deletar carro
  const handleDelete = async (id: number) => {
    const result = carroDeleteSchema.safeParse({ id });
    if (!result.success) {
      alert(result.error.errors[0]?.message || "Erro de validação");
      return;
    }
    setDeletingId(id); // Define o ID do carro que está sendo deletado
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      setSuccessMessage("Carro deletado com sucesso!"); // Define a mensagem de sucesso
      setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
      fetchCarros(); // Atualiza a lista de carros
    } catch (error) {
      console.error("Erro ao deletar carro:", error);
    } finally {
      setDeletingId(null); // Remove o estado de carregamento
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // Busca os carros ao carregar o componente
  useEffect(() => {
    fetchCarros(page, size, sortBy, direction);
  }, [page, size, sortBy, direction]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Gestão de Carros</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-2">
            <label htmlFor="marca" className="form-label">
              Marca
            </label>
            <input
              type="text"
              id="marca"
              className="form-control"
              value={form.marca}
              onChange={handleInputChange}
            />
            {errors.marca && <div className="text-danger">{errors.marca}</div>}
          </div>
          <div className="col-md-3">
            <label htmlFor="modelo" className="form-label">
              Modelo
            </label>
            <input
              type="text"
              id="modelo"
              className="form-control"
              value={form.modelo}
              onChange={handleInputChange}
            />
            {errors.modelo && (
              <div className="text-danger">{errors.modelo}</div>
            )}
          </div>
          <div className="col-md-1">
            <label htmlFor="ano" className="form-label">
              Ano
            </label>
            <input
              type="number"
              id="ano"
              className="form-control"
              value={form.ano}
              onChange={handleInputChange}
            />
            {errors.ano && <div className="text-danger">{errors.ano}</div>}
          </div>
          <div className="col-md-1">
            <label htmlFor="preco" className="form-label">
              Preço
            </label>
            <input
              type="number"
              id="preco"
              className="form-control"
              value={form.preco}
              onChange={handleInputChange}
            />
            {errors.preco && <div className="text-danger">{errors.preco}</div>}
          </div>
          <div className="col-md-2">
            <label htmlFor="categoria" className="form-label">
              Categoria
            </label>
            <input
              type="text"
              id="categoria"
              className="form-control"
              value={form.categoria}
              onChange={handleInputChange}
            />
            {errors.categoria && (
              <div className="text-danger">{errors.categoria}</div>
            )}
          </div>
          <div className="col-md-3">
            <label htmlFor="caminhoImagem" className="form-label">
              Caminho da Imagem
            </label>
            <input
              type="text"
              id="caminhoImagem"
              className="form-control"
              value={form.caminhoImagem}
              onChange={handleInputChange}
            />
            {errors.caminhoImagem && (
              <div className="text-danger">{errors.caminhoImagem}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editId ? "Atualizar" : "Salvar"}
        </button>
      </form>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Tabela */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              ID
              <button
                onClick={() => handleSort("id")}
                className="btn btn-link btn-sm p-0 ms-2"
              >
                {sortBy === "id" ? (
                  direction === "asc" ? (
                    <i className="bi bi-sort-numeric-down"></i>
                  ) : (
                    <i className="bi bi-sort-numeric-up"></i>
                  )
                ) : (
                  <i className="bi bi-sort-numeric-down"></i>
                )}
              </button>
            </th>
            <th>
              Marca
              <button
                onClick={() => handleSort("marca")}
                className="btn btn-link btn-sm p-0 ms-2"
              >
                {sortBy === "marca" ? (
                  direction === "asc" ? (
                    <i className="bi bi-sort-alpha-down"></i>
                  ) : (
                    <i className="bi bi-sort-alpha-up"></i>
                  )
                ) : (
                  <i className="bi bi-sort-alpha-down"></i>
                )}
              </button>
            </th>
            <th>
              Modelo
              <button
                onClick={() => handleSort("modelo")}
                className="btn btn-link btn-sm p-0 ms-2"
              >
                {sortBy === "modelo" ? (
                  direction === "asc" ? (
                    <i className="bi bi-sort-alpha-down"></i>
                  ) : (
                    <i className="bi bi-sort-alpha-up"></i>
                  )
                ) : (
                  <i className="bi bi-sort-alpha-down"></i>
                )}
              </button>
            </th>
            <th>
              Ano
              <button
                onClick={() => handleSort("ano")}
                className="btn btn-link btn-sm p-0 ms-2"
              >
                {sortBy === "ano" ? (
                  direction === "asc" ? (
                    <i className="bi bi-sort-numeric-down"></i>
                  ) : (
                    <i className="bi bi-sort-numeric-up"></i>
                  )
                ) : (
                  <i className="bi bi-sort-numeric-down"></i>
                )}
              </button>
            </th>
            <th>
              Preço
              <button
                onClick={() => handleSort("preco")}
                className="btn btn-link btn-sm p-0 ms-2"
              >
                {sortBy === "preco" ? (
                  direction === "asc" ? (
                    <i className="bi bi-sort-numeric-down"></i>
                  ) : (
                    <i className="bi bi-sort-numeric-up"></i>
                  )
                ) : (
                  <i className="bi bi-sort-numeric-down"></i>
                )}
              </button>
            </th>
            <th>
              Categoria
              <button
                onClick={() => handleSort("categoria")}
                className="btn btn-link btn-sm p-0 ms-2"
              >
                {sortBy === "categoria" ? (
                  direction === "asc" ? (
                    <i className="bi bi-sort-alpha-down"></i>
                  ) : (
                    <i className="bi bi-sort-alpha-up"></i>
                  )
                ) : (
                  <i className="bi bi-sort-alpha-down"></i>
                )}
              </button>
            </th>
            <th>Caminho das Imagens</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {carros.map((carro) => (
            <tr key={carro.id}>
              <td>{carro.id}</td>
              <td>{carro.marca}</td>
              <td>{carro.modelo}</td>
              <td>{carro.ano}</td>
              <td>{carro.preco}</td>
              <td>{carro.categoria}</td>
              <td>{carro.caminhoImagem}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(carro)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(carro.id!)}
                  disabled={deletingId === carro.id}
                >
                  {deletingId === carro.id ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                  ) : (
                    "Deletar"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          className="btn btn-secondary"
          disabled={page === 0}
        >
          Anterior
        </button>
        <span className="mx-2">
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="btn btn-secondary"
          disabled={page === totalPages - 1}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Gerenciamento;
