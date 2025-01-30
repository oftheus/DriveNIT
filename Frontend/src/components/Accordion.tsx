import React from "react";

//Aqui, define-se o componente Accordion, que é uma seção de interface de usuário com funcionalidade de expansão e colapso
//Esse código cria um item de accordion reutilizável, onde cada instância pode ser configurada com um título, um conteúdo, e um id

// Define a interface para os props do componente Accordion
// A interface `AccordionProps` especifica os dados (propriedades) que o componente Accordion espera receber
interface AccordionProps {
  id: string; //Identificador único para cada item do accordion
  title: string; //O título que será exibido no botão do accordion
  content: string; //O conteúdo que será mostrado quando o accordion for expandido
}

// Componente funcional Accordion que utiliza os props definidos na interface e retorna a estrutura HTML p/ o accordion
// Ele utiliza classes do Bootstrap, como accordion-item, accordion-header e accordion-collapse, p/ aplicar estilos e comportamento
const Accordion: React.FC<AccordionProps> = ({ id, title, content }) => (
  <div className="accordion-item">
    {/* Cabeçalho do accordion */}
    {/* 
    O cabeçalho contém um botão expansível (accordion-button), que:
     - Controla a visibilidade do conteúdo associado ao clicar.
     - Utiliza atributos como data-bs-toggle e data-bs-target do Bootstrap p/ habilitar a funcionalidade de colapso.
     - O atributo aria-expanded indica o estado inicial do botão (expandido ou não).
    */}
    <h2 className="accordion-header">
      <button
        className="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${id}`} // Define o alvo do colapso como o elemento com o ID correspondente
        aria-expanded="true"
        aria-controls={id} // Relaciona o botão ao conteúdo controlado
      >
        {title}
      </button>
    </h2>
    {/* Conteúdo do accordion, que será exibido ou escondido */}
    {/* 
    O conteúdo associado é definido em uma div com o mesmo id especificado no botão. 
    Isso permite que o Bootstrap associe o botão ao conteúdo correspondente.
    */}
    <div
      id={id}
      className="accordion-collapse collapse show"
      data-bs-parent="#accordionExample" //usado para agrupar os itens do acordeão, garantindo que apenas um item esteja expandido por vez dentro do grupo.
    >
      <div className="accordion-body">{content}</div>{" "}
      {/* Exibe o conteúdo passado como prop */}
    </div>
  </div>
);

export default Accordion;
