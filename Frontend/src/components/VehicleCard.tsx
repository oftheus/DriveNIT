import React from "react";

// Define uma interface para as propriedades do componente VehicleCard.
// Essa interface especifica que o componente espera receber três propriedades:
// - name: uma string representando o nome do veículo.
// - image: uma string representando a URL da imagem do veículo.
// - price: uma string representando o preço do veículo.
interface VehicleCardProps {
  name: string;
  image: string;
  price: string;
}

// Define o componente funcional VehicleCard usando React.FC (Functional Component).
// O componente recebe as propriedades descritas na interface VehicleCardProps.
const VehicleCard: React.FC<VehicleCardProps> = ({ name, image, price }) => {
  // Retorna o JSX que representa a estrutura visual do cartão de veículo.
  // Este JSX será renderizado na interface do usuário.
  return (
    // Contêiner principal do cartão de veículo com uma classe CSS para estilização.
    <div className="carro">
      <span className="car-name">{name}</span>
      <img src={image} alt={name} className="card-img-top" />
      <div className="price-container">
        <span className="valor">{price}</span>
      </div>
    </div>
  );
};

export default VehicleCard;
