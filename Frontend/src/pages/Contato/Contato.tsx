import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "bootstrap/js/dist/modal";

const Contato: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Define uma função chamada "handleSubmit" que é executada quando um formulário é enviado.
  // Essa função recebe um evento do tipo "React.FormEvent<HTMLFormElement>",
  // que é o evento gerado pela submissão do formulário.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Impede o comportamento padrão do navegador, que seria recarregar a página ao enviar o formulário.
    event.preventDefault();
    // Atualiza o estado para indicar que o formulário está em processo de envio.
    // Isso pode ser usado para desabilitar botões ou exibir feedback ao usuário enquanto o envio está em andamento.
    setIsSubmitting(true);
    // Simula um atraso de 2 segundos usando "setTimeout" para representar um processo assíncrono,
    // como uma requisição a um servidor ou uma operação de validação.
    setTimeout(() => {
      // Verifica se a referência "modalRef" está atribuída e aponta para um elemento válido no DOM.
      if (modalRef.current) {
        // Cria uma instância do componente "Modal" (provavelmente uma biblioteca de modal, como Bootstrap),
        // passando o elemento referenciado (modalRef.current) como argumento.
        const modalInstance = new Modal(modalRef.current);
        // Exibe o modal chamando o método "show" na instância criada.
        modalInstance.show();
      }
      setIsSubmitting(false);
    }, 2000); // Define o atraso de 2 segundos antes de executar o código no callback.
  };

  return (
    <main>
      <section id="contato-container">
        <span>Fale Conosco</span>
        <p id="paragrafo1-contato">
          Na DriveNIT, estamos sempre prontos para ajudar você! Se você tiver
          dúvidas, sugestões ou precisar de assistência, não hesite em entrar em
          contato conosco.
        </p>
        <p>
          Preencha o formulário abaixo e responderemos o mais rápido possível.
        </p>
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Nome"
              required
            />
            <label htmlFor="floatingInput">Nome</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="nome@exemplo.com"
              required
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <div className="form-floating" id="messagem-textarea">
            <textarea
              className="form-control"
              placeholder="Deixe sua mensagem aqui."
              id="floatingTextarea2"
              style={{ height: "150px" }}
              required
            ></textarea>
            <label htmlFor="floatingTextarea2">Mensagem</label>
          </div>
          <button
            id="submitBtn"
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden" role="status">
                  Loading...
                </span>
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </form>
        <hr />
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="successModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Mensagem Enviada
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Sua mensagem foi enviada com sucesso! Em breve entraremos em
              contato.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contato;
