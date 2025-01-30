package com.drivenit.reserva_api.controller;

import com.drivenit.reserva_api.model.Carro;
import com.drivenit.reserva_api.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") // Permite que a API seja acessada de qualquer origem
@RestController // Define a classe como um controlador REST
@RequestMapping("/api/carros") // Define o endpoint base para os métodos desta classe
public class CarroController {

    @Autowired // Injeta automaticamente uma instância do repositório
    private CarroRepository carroRepository;

    /**
     * Cria um novo carro no banco de dados
     * @param carro Objeto recebido no corpo da requisição
     * @return O carro recém-criado e salvo no banco de dados
     */
    @PostMapping
    public Carro createCarro(@RequestBody Carro carro) {
        return carroRepository.save(carro); // Persiste o novo carro e o retorna
    }

    /**
     * Obtém um carro específico pelo ID
     * @param id ID do carro a ser buscado
     * @return ResponseEntity contendo o carro encontrado ou erro 404 se não existir
     */
    @GetMapping("/{id}")
    public ResponseEntity<Carro> getCarroById(@PathVariable Long id) {
        Carro carro = carroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carro não encontrado"));
        return ResponseEntity.ok(carro); // Retorna o carro encontrado
    }

    /**
     * Atualiza um carro existente no banco de dados
     * @param id ID do carro a ser atualizado
     * @param carroDetails Novos dados para atualização
     * @return ResponseEntity contendo o carro atualizado ou erro 404 se não encontrado
     */
    @PutMapping("/{id}")
    public ResponseEntity<Carro> updateCarro(@PathVariable Long id, @RequestBody Carro carroDetails) {
        Carro carro = carroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carro não encontrado"));

        // Atualiza os campos do carro com os novos valores recebidos
        carro.setMarca(carroDetails.getMarca());
        carro.setModelo(carroDetails.getModelo());
        carro.setAno(carroDetails.getAno());
        carro.setPreco(carroDetails.getPreco());
        carro.setCategoria(carroDetails.getCategoria()); // Atualiza a categoria do carro
        carro.setCaminhoImagem(carroDetails.getCaminhoImagem());

        Carro updatedCarro = carroRepository.save(carro); // Salva as alterações
        return ResponseEntity.ok(updatedCarro); // Retorna o carro atualizado
    }

    /**
     * Deleta um carro do banco de dados
     * @param id ID do carro a ser removido
     * @return ResponseEntity sem conteúdo (status 204) se deletado com sucesso
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarro(@PathVariable Long id) {
        Carro carro = carroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carro não encontrado"));
        carroRepository.delete(carro); // Deleta o carro encontrado
        return ResponseEntity.noContent().build(); // Retorna status 204 (No Content)
    }

    // Lista todos os carros ou carros por categoria
    private static final List<String> ALLOWED_SORT_FIELDS = Arrays.asList("id", "marca", "modelo", "ano", "preco", "categoria", "caminhoImagem");

    /**
     * Obtém uma lista paginada de carros, podendo filtrar por categoria e ordenar por campos específicos
     * @param categoria (Opcional) Categoria dos carros a serem listados
     * @param page Número da página (padrão: 0)
     * @param size Quantidade de itens por página (padrão: 50)
     * @param sortBy Campo para ordenação (padrão: id)
     * @param direction Direção da ordenação (ascendente ou descendente, padrão: asc)
     * @return Página contendo os carros filtrados e ordenados conforme os parâmetros fornecidos
     */
    @GetMapping
    public Page<Carro> getAllCarros(
            @RequestParam Optional<String> categoria,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        // Verifica se o campo de ordenação é permitido
        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Campo de ordenação inválido");
        }
        // Define a direção da ordenação (ascendente ou descendente)
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort); // Cria um objeto de paginação

        // Filtra por categoria caso esteja presente na requisição
        if (categoria.isPresent()) {
            return carroRepository.findByCategoria(categoria.get(), pageable);
        }
        return carroRepository.findAll(pageable); // Retorna todos os carros paginados
    }
}