
document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais
    const modalCadastro = document.getElementById('formulario-modal');
    const modalIndicacao = document.getElementById('modal-indicacao');// NOVO
    const modalNovo = document.getElementById('id-do-novo-modal');
    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const formCadastro = document.getElementById('granulado');
    const formIndicacao = document.getElementById('form-indicacao');
    const modalConfirmacao2 = document.getElementById('modal-confirmacao-2');
    const formConfirmacao2 = document.getElementById('form-confirmacao-2');
    const modalMuitoObrigado2= document.getElementById('modal-muito-obrigado');
    const modalOpcaoSim = document.getElementById('modal-opcao-sim');
    const modalOpcaoNao = document.getElementById('modal-opcao-nao');
    const formOpcaoSim = document.getElementById('form-opcao-sim');
    const formOpcaoNao = document.getElementById('form-opcao-nao');
    const modalObrigadoEmpresa = document.getElementById('modal-obrigado-empresa');
    const modalFaleConosco = document.getElementById('modal-fale-conosco');
    const formFaleConosco = document.getElementById('form-fale-conosco');

   
    
    
    
    formFaleConosco.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para o envio do formulário de Fale Conosco
        
        fecharModal(modalFaleConosco); // Fecha o modal de Fale Conosco
        abrirModal(modalMuitoObrigado2); // Abre o modal de agradecimento   
        
});
    formOpcaoSim.addEventListener('submit', function(e) {
        e.preventDefault();
        fecharModal(modalOpcaoSim); // Fecha o modal de opção sim
        abrirModal(modalObrigadoEmpresa); // Abre o modal de agradecimento para empresa
    });

    formOpcaoNao.addEventListener('submit', function(e) {
        e.preventDefault();
        fecharModal(modalOpcaoNao); // Fecha o modal de opção não
        abrirModal(modalObrigadoEmpresa); // Abre o modal de agradecimento para aliados
    });
    
    formConfirmacao2.addEventListener('submit', function(e) {   
        e.preventDefault();


        if (espaco.value === 'opcaosim') {
            fecharModal(modalConfirmacao2); 
            abrirModal(modalOpcaoSim); // Modal para ALIADOS
         } else if (espaco.value === 'opcaonao') {
             fecharModal(modalConfirmacao2); 
             abrirModal(modalOpcaoNao); // Modal para ALIANTES
         }  
         
         // Aqui você pode adicionar a lógica para o envio do formulário de confirmação 2
        
        fecharModal(modalConfirmacao2);
    });
 

    
    formIndicacao.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const estado = document.getElementById('estado');
        const cidade = document.getElementById('cidade');

    
        if (!estado.value) {
            estado.classList.add('campo-invalido');
            alert('Por favor, selecione um estado.');
            estado.focus();
            return;
        }
    
        if (!cidade.value) {
            cidade.classList.add('campo-invalido');
            alert('Por favor, selecione uma cidade.');
            cidade.focus();
            return;
        }
    

    
        // Fecha o modal de indicação
        fecharModal(document.getElementById('modal-indicacao'));
        abrirModal(modalMuitoObrigado2); // Modal para ALIADOS
        // Limpa o formulário
        formIndicacao.reset();
    });
    

    // Função para abrir modal
    function abrirModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar modal
    function fecharModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Reseta o formulário quando fecha o modal de cadastro
        if (modal === modalCadastro) {
            formCadastro.reset();
            document.getElementById('comunidade').classList.remove('campo-invalido');
        }

        // Reseta o formulário de indicação também
        if (modal === modalIndicacao) {
            formIndicacao.reset();
        }
    }

    // ABRIR MODAL CADASTRO
    document.querySelectorAll('.abrir-form-cadastro').forEach(botao => {
        botao.addEventListener('click', function() {
            formCadastro.reset();
            abrirModal(modalCadastro);
        });
    });
    

    // ABRIR MODAL FORM FINALf orm-fale-conosco
    document.getElementById('fale-conosco').addEventListener('click', function() {
        abrirModal(modalFaleConosco);
    });

    // ABRIR MODAL INDICAÇÃO (NOVO!)
    document.querySelectorAll('.abrir-modal-indicacao').forEach(botao => {
        botao.addEventListener('click', function() {
  
        abrirModal(modalIndicacao);
    })
    });

    // FECHAR com botão de fechar
    document.querySelectorAll('.botao-fechar').forEach(function(botao) {
        botao.addEventListener('click', function() {
            const modal = this.closest('.modal');
            fecharModal(modal);
        });
    });

    // FECHAR clicando fora do conteúdo
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            fecharModal(e.target);
        }
    });

    // FECHAR com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modaisAbertos = document.querySelectorAll('.modal[style="display: block;"]');
            modaisAbertos.forEach(fecharModal);
        }
    });

    // SUBMISSÃO DO CADASTRO
// SUBMISSÃO DO CADASTRO
formCadastro.addEventListener('submit', function(e) {
    e.preventDefault();

    const comunidade = document.getElementById('comunidade');
    if (!comunidade.value) {
        comunidade.classList.add('campo-invalido');
        alert('Por favor, selecione uma opção para Comunidade.');
        comunidade.focus();
        return;
    }

    // Fecha o modal de cadastro
    

    // Abre o modal correspondente
    if (comunidade.value === 'ALIADO') {
       fecharModal(modalCadastro); 
       abrirModal(modalConfirmacao); // Modal para ALIADOS
    } else if (comunidade.value === 'ALIANTE') {
        fecharModal(modalCadastro); 
        abrirModal(modalConfirmacao2); // Modal para ALIANTES
    }
});


 /*    // SUBMISSÃO DA INDICAÇÃO (validação básica)
    formIndicacao.addEventListener('submit', function(e) {
        e.preventDefault();

       const estado = document.getElementById('estado');
        const cidade = document.getElementById('cidade');

        if (!estado.value) {
            estado.classList.add('campo-invalido');
            alert('Por favor, selecione um estado.');
            estado.focus();
            return;
        }

        if (!cidade.value) {
            cidade.classList.add('campo-invalido');
            alert('Por favor, selecione uma cidade.');
            cidade.focus();
            return;
        }

        // Aqui você pode enviar os dados via fetch ou outro método

        alert('Indicação enviada com sucesso!');
        fecharModal(modalIndicacao);
    });*/
});

// ---------------------------
// CARREGAR ESTADOS E CIDADES
// ---------------------------

let dadosEstados = [];

fetch('estados-cidades.json')
  .then(res => res.json())
  .then(data => {
    dadosEstados = data.estados;

    const estadoSelect = document.getElementById('estado');

    dadosEstados.forEach(estado => {
      const option = document.createElement('option');
      option.value = estado.sigla;
      option.textContent = estado.nome;
      estadoSelect.appendChild(option);
    });
  });

// Ao mudar o estado, popula as cidades
document.getElementById('estado').addEventListener('change', function () {
  const siglaSelecionada = this.value;
  const cidadeSelect = document.getElementById('cidade');
  
  // Limpa as cidades anteriores
  cidadeSelect.innerHTML = '<option value="" selected disabled hidden>SELECIONE UMA CIDADE</option>';
  cidadeSelect.disabled = true;

  const estadoSelecionado = dadosEstados.find(estado => estado.sigla === siglaSelecionada);
  
  if (estadoSelecionado) {
    estadoSelecionado.cidades.forEach(cidade => {
      const option = document.createElement('option');
      option.value = cidade;
      option.textContent = cidade;
      cidadeSelect.appendChild(option);
    });

    cidadeSelect.disabled = false;
  }
});
