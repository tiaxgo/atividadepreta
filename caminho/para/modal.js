document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais
    const modalCadastro = document.getElementById('formulario-modal');
    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const formCadastro = document.getElementById('granulado'); // ID do seu formulário
  
    // Função para abrir modal
    function abrirModal(modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  
    // Função para fechar modal
    function fecharModal(modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  
    // Abrir modal de cadastro (ex: botão "FIQUE SABENDO")
    // Substitua 'abrir-form-cadastro' pelo ID do seu botão
    document.getElementById('abrir-form-cadastro').addEventListener('click', function() {
      abrirModal(modalCadastro);
    });
  
    // Envio do formulário (botão "QUERO RECEBER AS NOVIDADES")
    formCadastro.addEventListener('submit', function(e) {
      e.preventDefault(); // Impede o envio padrão do formulário
  /*
      // Validação básica - adapte conforme necessário
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
  
      if (!nome || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }*/
  
      // Fecha o modal de cadastro e abre o de confirmação
      fecharModal(modalCadastro);
      abrirModal(modalConfirmacao);
  
      // Aqui você pode adicionar o envio AJAX dos dados
      // enviarDadosFormulario();
    });
  
    // Fechar modais ao clicar no "X"
    document.querySelectorAll('.botao-fechar').forEach(function(botao) {
      botao.addEventListener('click', function() {
        const modal = this.closest('.modal');
        fecharModal(modal);
      });
    });
  
    // Fechar ao clicar fora do modal
    window.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal')) {
        fecharModal(e.target);
      }
    });
  
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const modaisAbertos = document.querySelectorAll('.modal[style="display: block;"]');
        modaisAbertos.forEach(fecharModal);
      }
    });
  });
  
  // Função opcional para enviar dados
  function enviarDadosFormulario() {
    const formData = new FormData(document.getElementById('granulado'));
    
    fetch('sua-api-de-envio', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso:', data);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }