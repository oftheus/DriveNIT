// Type definition for a Car object returned by the API
interface Carro {
  id: string;
  marca: string;
  modelo: string;
}

// Initialize all tooltips on the page
const tooltipTriggerList = Array.from(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
tooltipTriggerList.forEach((tooltipTriggerEl) => {
  new window.bootstrap.Tooltip(tooltipTriggerEl);
});

// Function to handle the reservation form submission
document
  .getElementById("reserva-form")
  ?.addEventListener("submit", async function (event: SubmitEvent) {
    event.preventDefault();

    // Safely cast elements and retrieve their values
    const nome = (document.getElementById("nome") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const carroId = (document.getElementById("carro") as HTMLSelectElement)
      .value;
    const dataRetirada = (
      document.getElementById("data-retirada") as HTMLInputElement
    ).value;
    const dataDevolucao = (
      document.getElementById("data-devolucao") as HTMLInputElement
    ).value;

    const reserva = { nome, email, dataRetirada, dataDevolucao };

    // Disable submit button and show spinner
    const submitBtn = document.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span class="visually-hidden" role="status">Loading...</span>
      `;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/reservas?carroId=${carroId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reserva),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        const toastSuccessEl = document.getElementById(
          "reservationToast"
        ) as HTMLElement;
        const toastSuccess = new window.bootstrap.Toast(toastSuccessEl, {
          autohide: true,
          delay: 3000,
        });
        toastSuccess.show();

        // Reset form after successful submission
        (document.getElementById("reserva-form") as HTMLFormElement).reset();
      } else {
        const toastErrorEl = document.getElementById(
          "errorToast"
        ) as HTMLElement;
        const toastError = new window.bootstrap.Toast(toastErrorEl);
        toastError.show();
      }
    } catch (error) {
      console.error("Erro ao realizar a reserva:", error);

      const toastErrorEl = document.getElementById("errorToast") as HTMLElement;
      const toastError = new window.bootstrap.Toast(toastErrorEl);
      toastError.show();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Reservar";
      }
    }
  });

// Function to load cars based on the selected category
document
  .getElementById("categoria")
  ?.addEventListener("change", async function (event: Event) {
    const categoriaSelecionada = (event.target as HTMLSelectElement).value;
    const carroSelect = document.getElementById("carro") as HTMLSelectElement;

    // Clear existing options
    carroSelect.innerHTML =
      "<option selected disabled>Selecione um carro</option>";

    try {
      const response = await fetch(
        `http://localhost:8080/api/carros?categoria=${categoriaSelecionada}`
      );
      const carros: Carro[] = await response.json();

      carros.forEach((carro) => {
        const option = document.createElement("option");
        option.value = carro.id;
        option.textContent = `${carro.marca} - ${carro.modelo}`;
        carroSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }
  });
