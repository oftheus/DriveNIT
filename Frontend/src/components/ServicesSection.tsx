import React from "react";
import ServiceCard from "./ServiceCard"; // Importing the ServiceCard component

const services = [
  {
    icon: "bi-award",
    title: "Opções para todos os bolsos",
    description:
      "Desde carros econômicos até veículos de luxo, oferecemos opções que atendem a todos os perfis, assegurando o máximo de valor para o seu investimento.",
  },
  {
    icon: "bi-cash-coin",
    title: "Melhor preço garantido",
    description:
      "Oferecemos tarifas competitivas no mercado, para que você possa reservar com tranquilidade, sabendo que está obtendo a melhor oferta possível.",
  },
  {
    icon: "bi-people-fill",
    title: "Suporte 24 horas por dia, 7 dias por semana",
    description:
      "Nossa equipe está à disposição 24/7 para ajudar com qualquer dúvida ou necessidade, garantindo que sua experiência de locação seja sempre tranquila e eficiente.",
  },
  {
    icon: "bi-signpost",
    title: "Entrega e Retirada de Veículos",
    description:
      "Oferecemos a conveniência de entregar o veículo no local de sua preferência e de buscá-lo ao final do aluguel, para que você tenha uma experiência sem preocupações.",
  },
  {
    icon: "bi-shield-check",
    title: "Seguros e Proteção Completa",
    description:
      "Disponibilizamos diversas opções de seguros e proteção extra para que você dirija sem preocupações, cobrindo danos, roubo e assistência em caso de imprevistos.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services">
      <div className="services-title">
        <span>
          Desfrute da melhor experiência com nossas ofertas de locação.
        </span>
      </div>
      <div className="service-cards-container">
        {/* Mapeia a lista de serviços (services) para renderizar um componente ServiceCard para cada item. 
      O método map percorre o array de objetos "services", onde cada objeto representa um serviço. 
      Para cada item do array, é criado um componente ServiceCard. */}
        {services.map((service, index) => (
          // Componente ServiceCard é renderizado para cada serviço.
          // A propriedade "key" é configurada como "index" para garantir que cada item tenha uma chave única,
          // ajudando o React a identificar os elementos ao atualizar a lista dinamicamente.
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
