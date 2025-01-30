import React from "react";

const Home: React.FC = () => {
  return (
    <section id="home" className="text-center">
      <div className="container my-5">
        <h1>
          Encontre o carro ideal para sua jornada com rapidez e economia na
          DriveNIT.
        </h1>
        <hr className="my-4" />
        <h2>
          Oferecemos uma ampla seleção de carros para atender às suas
          necessidades.
          <br />
          Alugue com praticidade e aproveite nossas condições especiais.
        </h2>
      </div>
      <div>
        <img
          src="/assets/bmwx6.png"
          alt="BMWX6"
          className="img-fluid"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
};

export default Home;
