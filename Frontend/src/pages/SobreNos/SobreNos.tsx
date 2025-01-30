import React, { useEffect } from "react";
import { Tooltip } from "bootstrap";

const SobreNos: React.FC = () => {
  useEffect(() => {
    // Inicializa todos os tooltips no componente
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl); // Instancia os tooltips
    });
  }, []);

  return (
    <>
      <section id="sobre-container">
        <div className="sobre-texto">
          <span>Nossa Missão!</span>
          <div className="sobre-paragrafos">
            <p id="paragrafo1-sobre">
              Na DriveNIT, nosso compromisso é garantir que você chegue ao seu
              destino com
              <span
                className="tooltip-container"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Retirada e entrega de veículos na sua localização preferida"
              >
                {" "}
                opções flexíveis de retirada e entrega de veículos
              </span>
              . Fundada em
              <span
                className="tooltip-container"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Cidade no estado do Rio de Janeiro, Brasil, famosa por sua arquitetura e belas paisagens"
              >
                {" "}
                Niterói
              </span>
              , uma cidade conhecida por sua beleza e inovação, temos orgulho de
              servir não só a comunidade local, mas também a todos os que visitam
              a região. Nossa frota diversificada, com veículos que vão desde
              opções econômicas até modelos de luxo, oferece soluções para todas
              as suas necessidades de viagem.
            </p>
            <p>
              Com um forte compromisso com a qualidade e o atendimento ao cliente,
              buscamos facilitar a locação de veículos, oferecendo uma experiência
              sem complicações. Seja para explorar as maravilhas de Niterói,
              atravessar a ponte rumo ao Rio de Janeiro ou viajar por todo o
              Brasil, a DriveNIT está aqui para garantir que sua jornada seja
              tranquila e confortável.
            </p>
            <p>
              Acreditamos que a confiança é fundamental em qualquer viagem, e é
              por isso que estamos sempre inovando para oferecer o melhor
              atendimento e tecnologia. Com suporte 24/7, cobertura de seguros e
              opções flexíveis de retirada e entrega de veículos, estamos prontos
              para atender você em qualquer ocasião. Venha descobrir como é alugar
              com quem conhece Niterói e suas necessidades como ninguém!
            </p>
          </div>

          <div
            id="carouselExampleIndicators"
            className="carousel slide carousel-container"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="assets/mac.jpg" className="d-block w-100" alt="MAC" />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/carousel3.jpg"
                  className="d-block w-100"
                  alt="Parque da Cidade"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/carousel2.jpeg"
                  className="d-block w-100"
                  alt="MAC"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SobreNos;