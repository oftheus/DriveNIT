import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section id="home">
      <div id="main-container">
        <div className="text-container">
          <h1>
            Encontre o carro ideal para sua jornada com rapidez e economia na{" "}
            <span className="fw-bold">DriveNIT</span>.
          </h1>
          <hr className="line-detail" />
          <h2>
            Oferecemos uma ampla seleção de carros para atender às suas
            necessidades.
            <br />
            Alugue com praticidade e aproveite nossas condições especiais.
          </h2>
        </div>
        <div className="banner-home">
          <img src="assets/bmwx6.png" className="img-fluid" alt="BMWX6" />
        </div>
      </div>

      <div id="steps-container">
        <span className="steps-title">
          Alugar um carro nunca foi tão fácil! Siga apenas 3 passos simples
        </span>
        <div id="steps">
          <div className="step" id="first">
            <div className="icon">
              <i className="bi bi-geo-alt"></i>
            </div>
            <span>Selecione o local</span>
            <p>
              Escolha o ponto de retirada mais conveniente para você, entre
              nossa rede de locações.
            </p>
          </div>
          <div className="step" id="second">
            <div className="icon">
              <i className="bi bi-calendar-week"></i>
            </div>
            <span>Defina a data e hora</span>
            <p>
              Planeje sua retirada com total flexibilidade, escolhendo o melhor
              momento para começar sua jornada.
            </p>
          </div>
          <div className="step" id="third">
            <div className="icon">
              <i className="bi bi-bookmark-check"></i>
            </div>
            <span>Encontre o carro ideal</span>
            <p>
              Explore nossa frota diversificada e escolha o veículo que combina
              perfeitamente com seu estilo e necessidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
