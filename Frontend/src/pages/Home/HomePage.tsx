import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ReservationModal from "../../components/ModalForm.tsx/ReservationModal";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <div id="main-container">
            <div className="text-container">
              <h1>
                Encontre o carro ideal para sua jornada com rapidez e economia
                na DriveNIT.
              </h1>
              <hr className="line-detail" />
              <h2>
                Oferecemos uma ampla seleção de carros para atender às suas
                necessidades.
                <br /> Alugue com praticidade e aproveite nossas condições
                especiais.
              </h2>
            </div>
            <div className="banner-home">
              <img src="/assets/bmwx6.png" className="img-fluid" alt="BMW X6" />
            </div>
          </div>
        </section>
      </main>
      <ReservationModal />
    </>
  );
};

export default HomePage;
