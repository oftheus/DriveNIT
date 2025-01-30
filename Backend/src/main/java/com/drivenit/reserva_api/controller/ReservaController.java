package com.drivenit.reserva_api.controller;

import com.drivenit.reserva_api.model.Carro;
import com.drivenit.reserva_api.model.Reserva;
import com.drivenit.reserva_api.repository.CarroRepository;
import com.drivenit.reserva_api.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") // Permite que a API seja acessada de qualquer origem
@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired // Injeta automaticamente a dependência do repositório de reservas
    private ReservaRepository reservaRepository;

    @Autowired // Injeta automaticamente a dependência do repositório de carros
    private CarroRepository carroRepository;

    /**
     * Cria uma nova reserva associada a um carro.
     * @param reserva Objeto Reserva recebido no corpo da requisição
     * @param carroId ID do carro a ser associado à reserva (passado como parâmetro da URL)
     * @return ResponseEntity contendo a reserva criada ou erro caso o carro não seja encontrado
     */
    @PostMapping
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva, @RequestParam Long carroId) {
        // Busca o carro pelo ID, lançando exceção se não for encontrado
        Carro carro = carroRepository.findById(carroId)
                .orElseThrow(() -> new RuntimeException("Carro não encontrado"));
        reserva.setCarro(carro); // Associa o carro à reserva
        Reserva novaReserva = reservaRepository.save(reserva); // Salva a nova reserva
        return ResponseEntity.ok(novaReserva); // Retorna a reserva criada
    }

    /**
     * Busca reservas filtrando pelo e-mail do usuário.
     * @param email E-mail do usuário para consulta
     * @return Lista de reservas associadas ao e-mail informado
     */
    @GetMapping("/by-email")
    public List<Reserva> getReservasByEmail(@RequestParam String email) {
        return reservaRepository.findByEmail(email); // Retorna reservas associadas ao e-mail
    }

    /**
     * Atualiza uma reserva existente pelo ID.
     * @param id ID da reserva a ser atualizada
     * @param reservaDetails Objeto contendo os novos dados da reserva
     * @param carroId (Opcional) ID de um novo carro a ser associado à reserva
     * @return ResponseEntity contendo a reserva atualizada ou erro caso não seja encontrada
     */
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reservaDetails, @RequestParam(required = false) Long carroId) {
        // Busca a reserva pelo ID
        Optional<Reserva> optionalReserva = reservaRepository.findById(id);
        if (!optionalReserva.isPresent()) {
            return ResponseEntity.notFound().build(); // Retorna 404 se a reserva não existir
        }

        Reserva reserva = optionalReserva.get();
        // Atualiza os detalhes da reserva
        reserva.setNome(reservaDetails.getNome());
        reserva.setEmail(reservaDetails.getEmail());
        reserva.setDataRetirada(reservaDetails.getDataRetirada());
        reserva.setDataDevolucao(reservaDetails.getDataDevolucao());

        // Atualiza o carro associado, se fornecido um novo carroId
        if (carroId != null) {
            Carro carro = carroRepository.findById(carroId)
                    .orElseThrow(() -> new RuntimeException("Carro não encontrado"));
            reserva.setCarro(carro);
        }

        Reserva reservaAtualizada = reservaRepository.save(reserva); // Salva a reserva atualizada
        return ResponseEntity.ok(reservaAtualizada); // Retorna a reserva atualizada
    }

    /**
     * Deleta uma reserva pelo ID.
     * @param id ID da reserva a ser deletada
     * @return ResponseEntity com status 204 (No Content) ou erro caso a reserva não seja encontrada
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        // Verifica se a reserva existe antes de deletar
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // Retorna 404 se a reserva não existir
        }

        reservaRepository.deleteById(id); // Deleta a reserva
        return ResponseEntity.noContent().build(); // Retorna status 204 (No Content)
    }

    /**
     * Busca uma reserva pelo ID.
     * @param id ID da reserva a ser consultada
     * @return ResponseEntity contendo a reserva encontrada ou erro caso não exista
     */
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        // Busca a reserva no banco de dados pelo ID
        Optional<Reserva> reserva = reservaRepository.findById(id);
        if (reserva.isPresent()) {
            return ResponseEntity.ok(reserva.get()); // Retorna a reserva se encontrada
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 se a reserva não for encontrada
        }
    }
}
