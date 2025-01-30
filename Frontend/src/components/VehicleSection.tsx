import React from "react";
import VehicleCard from "./VehicleCard";

interface Vehicle {
  id: number;
  name: string;
  image: string;
  price: string;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Renault Kwid",
    image: "/assets/kwid.png",
    price: "R$ 120/dia",
  },
  {
    id: 2,
    name: "Chevrolet Spin",
    image: "/assets/spin.png",
    price: "R$ 250/dia",
  },
  {
    id: 3,
    name: "Toyota Corolla",
    image: "/assets/corola.png",
    price: "R$ 350/dia",
  },
  {
    id: 4,
    name: "Porsche Boxster",
    image: "/assets/porsche.png",
    price: "R$ 3000/dia",
  },
];

const VehiclesSection: React.FC = () => {
  return (
    <section className="veiculos" id="home-veiculos">
      <div className="veiculo-top-container">
        <span className="veiculo-title">Conheça um pouco da nossa frota!</span>
      </div>

      <div className="veiculo-bottom-container">
        {/* Mapeia o array "vehicles" para renderizar um componente "VehicleCard" para cada veículo na lista.
      O método "map" itera sobre cada item no array "vehicles", criando dinamicamente um componente 
      "VehicleCard" com os dados correspondentes. */}
        {vehicles.map((vehicle) => (
          // Renderiza um componente "VehicleCard" para cada veículo na lista.
          <VehicleCard
            // Atributo "key" é configurado como o identificador único (id) do veículo.
            // Isso ajuda o React a rastrear cada componente na lista, otimizando atualizações no DOM.
            key={vehicle.id}
            // Propriedades passadas para o componente "VehicleCard":
            name={vehicle.name}
            image={vehicle.image}
            price={vehicle.price}
          />
        ))}
      </div>

      <div id="chamada-container">
        <img src="/assets/assistent.png" alt="assistent" id="assistent-img" />
        <div className="chamada-text-container">
          <span className="chamada-text">
            Faça sua próxima viagem com a DriveNIT hoje mesmo!
          </span>
          <p>
            Precisa de ajuda ou quer garantir seu veículo? Entre em contato
            conosco para um atendimento rápido e uma reserva sem complicações!
          </p>
          <div className="chamada-button-container">
            <a href="/catalogo">
              <button className="see-all-btn position-relative">
                Veja Todos os Carros
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">Alerta</span>
                </span>
              </button>
            </a>
            <a href="/contato">
              <button className="support-online-btn">
                Entrar em Contato com Suporte
              </button>
            </a>
            <img src="/assets/logo.png" alt="logo" id="logo-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehiclesSection;
