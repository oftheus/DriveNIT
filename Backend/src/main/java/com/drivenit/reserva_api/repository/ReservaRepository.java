package com.drivenit.reserva_api.repository;

import com.drivenit.reserva_api.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

// Interface que representa o repositório de reservas, que permite realizar operações no banco de dados
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    // Metodo para obter uma página de reservas, útil para paginação em grandes volumes de dados
    Page<Reserva> findAll(Pageable pageable);

    // Metodo para buscar reservas associadas a um e-mail específico,
    // útil para listar as reservas de um usuário pelo e-mail
    List<Reserva> findByEmail(String email);
}
