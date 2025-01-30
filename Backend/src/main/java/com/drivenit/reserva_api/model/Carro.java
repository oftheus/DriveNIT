package com.drivenit.reserva_api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity // Indica que esta classe é uma entidade JPA, mapeada para uma tabela no banco de dados
public class Carro {

    @Id // Define o campo 'id' como chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Geração automática de ID sequencial
    private Long id;

    private String marca;
    private Integer preco;
    private Integer ano;
    private String modelo;
    private String categoria; // Categoria do carro (ex: SUV, sedan)
    private String caminhoImagem;

    // Relação um-para-muitos com reservas: um carro pode ter várias reservas associadas
    @OneToMany(mappedBy = "carro", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserva> reservas;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Integer getPreco() {
        return preco;
    }

    public void setPreco(Integer preco) {
        this.preco = preco;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getCategoria() { // Getter para categoria
        return categoria;
    }

    public void setCategoria(String categoria) { // Setter para categoria
        this.categoria = categoria;
    }

    public String getCaminhoImagem() {
        return caminhoImagem;
    }

    public void setCaminhoImagem(String caminhoImagem) {
        this.caminhoImagem = caminhoImagem;
    }
}

