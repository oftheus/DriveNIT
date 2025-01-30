import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Carro {
  id: number;
  marca: string;
  preco: number;
  ano: number;
  modelo: string;
  categoria: string;
  caminhoImagem: string;
}

const accordionContent: Record<
  string,
  { detalhes: string; beneficios: string }
> = {
  Sedan: {
    detalhes:
      "Sedans são conhecidos por sua combinação de conforto, eficiência de combustível e espaço interno. São ideais para longas viagens ou para quem valoriza o espaço adicional e o conforto ao dirigir. No nosso catálogo, você encontrará modelos que variam desde o econômico Fiat Cronos até o luxuoso Toyota Corolla, oferecendo uma gama de opções para diferentes necessidades e preferências.",
    beneficios:
      "Os sedans são uma escolha inteligente para quem deseja um equilíbrio entre conforto e economia. Eles geralmente oferecem uma condução mais suave, ideal para estradas pavimentadas e viagens mais longas. Além disso, os sedans costumam ter melhores coeficientes aerodinâmicos, o que contribui para uma eficiência de combustível superior. São perfeitos para famílias ou profissionais que desejam um veículo com amplo espaço no porta-malas e um visual sofisticado.",
  },
  SUV: {
    detalhes:
      "Os SUVs (Sport Utility Vehicles) oferecem maior altura do solo, proporcionando uma sensação de segurança e melhor visibilidade na estrada. Além disso, são perfeitos para quem busca espaço adicional para passageiros e bagagem. Temos desde opções mais acessíveis, como o Hyundai Creta, até SUVs de luxo, como o HAVAL H6, atendendo a todos os perfis de motoristas.",
    beneficios:
      "SUVs são altamente versáteis e oferecem uma experiência de condução robusta, sendo capazes de lidar tanto com o ambiente urbano quanto com trilhas off-road. Eles proporcionam uma posição elevada de condução, o que melhora a visibilidade e aumenta a sensação de segurança. Para quem busca mais espaço interno e capacidade de carga, os SUVs são ideais, acomodando com facilidade famílias grandes ou grupos de amigos em viagens longas.",
  },
  Hatch: {
    detalhes:
      "Os hatches são veículos compactos, ideais para uso urbano, devido ao seu tamanho menor e à agilidade no trânsito. São perfeitos para quem busca economia e praticidade no dia a dia. No nosso catálogo, você encontrará modelos como o popular Renault Kwid e o sofisticado Volkswagen Polo, que oferecem conforto e eficiência sem abrir mão do estilo.",
    beneficios:
      "A maior vantagem dos hatches é a sua praticidade. Compactos e ágeis, são perfeitos para manobrar em espaços apertados e estacionamentos urbanos. Além disso, os hatches costumam ser mais econômicos, tanto no preço inicial quanto no consumo de combustível. Embora sejam menores, oferecem uma boa quantidade de espaço interno quando o banco traseiro é rebatido, tornando-se ideais para o uso diário e viagens curtas.",
  },
  Minivan: {
    detalhes:
      "Minivans são ideais para famílias grandes ou para quem precisa de muito espaço, seja para passageiros ou bagagens. Com suas portas deslizantes e amplos interiores, as minivans oferecem praticidade e conforto. Modelos como o Chevrolet Spin e o Citroën C4 são perfeitos para viagens em grupo ou para transportar itens maiores com facilidade.",
    beneficios:
      "Minivans são projetadas para maximizar o espaço e o conforto. Elas se destacam pela modularidade dos bancos, permitindo que você configure o interior de acordo com a sua necessidade – seja para transportar muitas pessoas ou uma grande quantidade de bagagem. Perfeitas para famílias numerosas ou para quem precisa transportar cargas volumosas, as minivans oferecem uma experiência de viagem confortável e conveniente para todos os passageiros.",
  },
  Premium: {
    detalhes:
      "Se você está em busca de luxo, desempenho e exclusividade, nossa seleção premium é feita sob medida para você. Esses veículos são equipados com as mais avançadas tecnologias e oferecem o máximo em conforto e estilo. Com modelos como o Audi A3, Porsche Boxster, e até mesmo uma Lamborghini, aqui você encontrará o ápice da sofisticação automotiva.",
    beneficios:
      "Carros premium são projetados para quem valoriza o luxo e o desempenho em todos os aspectos. Desde os materiais usados no interior até a engenharia de ponta sob o capô, esses veículos proporcionam uma experiência de condução incomparável. Além do conforto extremo e da tecnologia avançada, carros premium também oferecem uma estética refinada e uma sensação de exclusividade. Se você busca status, performance e design, um veículo premium é a escolha perfeita.",
  },
};

const Catalogo: React.FC = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/detalhes/${id}`);
  };

  const handleAddToCart = (carro: Carro) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.find((item: Carro) => item.id === carro.id)) {
      cart.push(carro);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`${carro.modelo} foi adicionado ao carrinho!`);
    } else {
      alert("Esse carro já está no carrinho.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/carros")
      .then((response) => {
        setCarros(response.data.content);
      })
      .catch((error) => {
        console.error("Erro ao buscar os carros:", error);
      });
  }, []);

  const renderAccordion = (categoria: string) => {
    const isActive = (accordionId: string) => activeAccordion === accordionId;

    const toggleAccordion = (accordionId: string) => {
      setActiveAccordion(isActive(accordionId) ? null : accordionId);
    };

    const { detalhes, beneficios } = accordionContent[categoria] || {};

    return (
      <div className="accordion" id={`accordion${categoria}`}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                isActive("collapse" + categoria + "1") ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion("collapse" + categoria + "1")}
              aria-expanded={
                isActive("collapse" + categoria + "1") ? "true" : "false"
              }
              aria-controls={`collapse${categoria}1`}
            >
              Detalhes sobre {categoria}s
            </button>
          </h2>
          <div
            id={`collapse${categoria}1`}
            className={`accordion-collapse collapse ${
              isActive("collapse" + categoria + "1") ? "show" : ""
            }`}
          >
            <div className="accordion-body">{detalhes}</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                isActive("collapse" + categoria + "2") ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleAccordion("collapse" + categoria + "2")}
              aria-expanded={
                isActive("collapse" + categoria + "2") ? "true" : "false"
              }
              aria-controls={`collapse${categoria}2`}
            >
              Benefícios dos {categoria}s
            </button>
          </h2>
          <div
            id={`collapse${categoria}2`}
            className={`accordion-collapse collapse ${
              isActive("collapse" + categoria + "2") ? "show" : ""
            }`}
          >
            <div className="accordion-body">{beneficios}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <main>
        <section className="veiculos" id="catalogo-veiculos">
          <div className="container my-4">
            <div className="mb-4">
              <h2>Conheça alguns dos nossos veículos!</h2>
            </div>
            <div className="row">
              {["Sedan", "SUV", "Hatch", "Minivan", "Premium"].map(
                (categoria) => (
                  <div className="col-12" key={categoria}>
                    <h2 className="mb-4 mt-4">{categoria}s</h2>
                    <div className="row">
                      {carros
                        .filter((carro) => carro.categoria === categoria)
                        .map((carro) => (
                          <div
                            key={carro.id}
                            className="col-12 col-sm-6 col-md-3 mb-4"
                          >
                            <div
                              className="card h-100"
                              onClick={() => handleCardClick(carro.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={carro.caminhoImagem}
                                className="card-img-top"
                                alt={carro.modelo}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{carro.modelo}</h5>
                                <p className="card-text">
                                  R$ {carro.preco}/dia
                                </p>
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(carro);
                                  }}
                                >
                                  Alugar
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {renderAccordion(categoria)}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Catalogo;
