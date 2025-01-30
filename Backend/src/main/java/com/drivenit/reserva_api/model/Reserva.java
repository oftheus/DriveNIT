package com.drivenit.reserva_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity // Define esta classe como uma entidade do banco de dados
public class Reserva {

    @Id // Define 'id' como chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Geração automática de ID sequencial
    private Long id;

    private String nome;
    private String email;
    private LocalDate dataRetirada; // Data de retirada do veículo
    private LocalDate dataDevolucao; // Data de devolução do veículo

    // Relação muitos-para-um com Carro: uma reserva está associada a um único carro
    @ManyToOne
    @JoinColumn(name = "carro_id", nullable = false) // Define a coluna de chave estrangeira
    private Carro carro;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataRetirada() {
        return dataRetirada;
    }

    public void setDataRetirada(LocalDate dataRetirada) {
        this.dataRetirada = dataRetirada;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public Carro getCarro() {
        return carro;
    }

    public void setCarro(Carro carro) {
        this.carro = carro;
    }
}
