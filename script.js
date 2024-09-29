// Função para lidar com o envio do formulário
function handleSubmit(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  // Redireciona para a página do catálogo
  window.location.href = 'usuariopage.html';
}

// Adiciona o evento de submissão ao formulário quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginform');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});





// Função para lidar com o envio do formulário
function handleCadastrarSubmit(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  // Redireciona para a página de login
  window.location.href = 'login.html';
}

// Adiciona o evento de submissão ao formulário quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-cadastro');
  if (form) {
    form.addEventListener('submit', handleCadastrarSubmit);
  }
});





document.querySelectorAll('.alugar-btn').forEach(button => {
  button.addEventListener('click', function(event) {
      event.preventDefault();  // Previne o comportamento padrão do botão/link

      // Exibe o formulário de aluguel
      const alugarDiv = document.getElementById('alugar');
      alugarDiv.style.display = 'block';

      // Faz o redirecionamento suave para a div do formulário
      alugarDiv.scrollIntoView({ behavior: 'smooth' });
  });
});

