package com.drivenit.reserva_api.repository;

import com.drivenit.reserva_api.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

// Interface que representa o repositório de carros, permitindo operações de CRUD com o banco de dados
public interface CarroRepository extends JpaRepository<Carro, Long> {

    // Metodo personalizado para buscar carros por categoria,
    // permitindo filtrar a lista com base na categoria desejada
    Page<Carro> findByCategoria(String categoria, Pageable pageable);
}