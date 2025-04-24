
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
    const espaco = document.getElementById('espaco');
    const modalObrigadoFale= document.getElementById('modal-fale-obrigado');


    modalObrigadoFale.addEventListener('submit', function(e) {
      e.preventDefault();
      // Aqui você pode adicionar a lógica para o envio do formulário de Fale Conosco

      abrirModal(modalObrigadoFale); // Abre o modal de agradecimento   
    
    });
    
    
    formFaleConosco.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para o envio do formulário de Fale Conosco
        
        fecharModal(modalFaleConosco); // Fecha o modal de Fale Conosco
        abrirModal(modalObrigadoFale); // Abre o modal de agradecimento   
        
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
    
        // 1. Armazena os dados do form principal
        const formData = new FormData(this);
        sessionStorage.setItem('dadosFormPrincipal', JSON.stringify(Object.fromEntries(formData)));
    
        // 2. Fecha o modal principal (sem abrir outros modais)
        if (espaco.value === 'opcaosim') {
            fecharModal(modalConfirmacao2); 
            abrirModal(modalOpcaoSim); // Modal para ALIADOS
         } else if (espaco.value === 'opcaonao') {
             fecharModal(modalConfirmacao2); 
             abrirModal(modalOpcaoNao); // Modal para ALIANTES
         }  
     
    });
 

    
    formIndicacao.addEventListener('submit', function(e) {
        e.preventDefault();
    


    
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
    

    // ABRIR MODAL FORM FINALf Form-fale-conosco
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
        abrirModal(modalConfirmacao2); // Modal para ALIANTES
    } else if (comunidade.value === 'ALIANTE') {
        fecharModal(modalCadastro); 
        abrirModal(modalConfirmacao); // Modal para ALIADOS
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

    const estadoSelects = document.querySelectorAll('.estado');

    estadoSelects.forEach(estadoSelect => {
      // Preenche os estados
      dadosEstados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option.cloneNode(true));
      });

      // Ao mudar o estado
      estadoSelect.addEventListener('change', function () {
        const siglaSelecionada = this.value;

        // Pega o .cidade dentro do mesmo <form>
        const form = this.closest('form');
        const cidadeSelect = form.querySelector('.cidade');

        if (!cidadeSelect) {
          console.warn('Select .cidade não encontrado!');
          return;
        }

        // Limpa e desabilita
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
    });
  });


 
  /* abaixo menu com overlay versao mobile*/ 
  
  let btnMenu = document.getElementById('btn-abrir-menu')
  let menu = document.getElementById('menu-mobile')
  let overlay = document.getElementById('overlay-menu')
  
  btnMenu.addEventListener('click',()=>{
      menu.classList.add('abrir-menu')
  })
  
  menu.addEventListener('click',()=>{
      menu.classList.remove('abrir-menu')
  })
  
  overlay.addEventListener('click',()=>{
      menu.classList.remove('abrir-menu')
  })
  

// ==============================================
// FUNÇÕES GERAIS
// ==============================================

/**
 * Configura envio para forms SIMPLES (antigos)
 * @param {string} nomeDoForm - ID do formulário (atributo 'name' ou 'id')
 * @param {string} scriptURL - URL do Google Apps Script
 */
function configurarEnvioFormulario(nomeDoForm, scriptURL) {
    const form = document.forms[nomeDoForm];
    if (!form) {
      console.warn(`Formulário "${nomeDoForm}" não encontrado.`);
      return;
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      enviarFormulario(this, scriptURL);
    });
  }
  
  /**
   * Envia dados para o Google Sheets (usado por TODOS os forms)
   * @param {HTMLFormElement} form - Elemento do formulário
   * @param {string} url - URL do script
   */
  function enviarFormulario(form, url) {
    const formData = new FormData(form);
  
    // Para modais secundários: combina com dados do form principal
    if (form.name === 'form-opcao-sim' || form.name === 'form-opcao-nao') {
      const dadosPrincipal = JSON.parse(sessionStorage.getItem('dadosFormPrincipal'));
      if (dadosPrincipal) {
        for (const key in dadosPrincipal) {
          if (!formData.has(key)) {
            formData.append(key, dadosPrincipal[key]);
          }
        }
      }
    }
  
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro no servidor');
      return response.json();
    })
    .then(data => {
      alert('Dados salvos com sucesso!');
      form.reset();
      
      // Limpa storage e fecha modal (apenas para forms secundários)
      if (form.name === 'form-opcao-sim' || form.name === 'form-opcao-nao') {
        sessionStorage.removeItem('dadosFormPrincipal');
        fecharModal(form.closest('.modal'));
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Falha ao enviar. Tente novamente.');
    });
  }
  
  // ==============================================
  // CONFIGURAÇÃO DOS FORMULÁRIOS
  // ==============================================
  
  // Forms ANTIGOS (funcionam como antes)
  configurarEnvioFormulario(
    'formulario-contato',
    'https://script.google.com/macros/s/AKfycbw1N2Zw31-amsC4Z_vZcErgAY2swVF35slCAb8aoQ9Utq9Q0PT2lrOjbtdKVxcxQkv22g/exec'
  );
  
  configurarEnvioFormulario(
    'formulario-indicacao',
    'https://script.google.com/macros/s/AKfycbxV9xm-o5jyzQtxL7svJXRBEFXoRIuilHb8xHftEyLGMzpD0sQewWYwR2KqJjlkVc-j/exec'
  );
  
  // NOVO FORM PRINCIPAL (form-confirmacao-2)
  document.forms['form-confirmacao-2']?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 1. Armazena dados do form principal
    const formData = new FormData(this);
    sessionStorage.setItem('dadosFormPrincipal', JSON.stringify(Object.fromEntries(formData)));
    
    // 2. Abre modal baseado na seleção "espaco"
    const espacoValue = document.getElementById('espaco').value;
    if (espacoValue === 'opcaosim') {
      fecharModal(this.closest('.modal'));
      abrirModal(document.getElementById('modal-opcao-sim'));
    } else if (espacoValue === 'opcaonao') {
      fecharModal(this.closest('.modal'));
      abrirModal(document.getElementById('modal-opcao-nao'));
    }
  });
  
  // Forms SECUNDÁRIOS (Sim/Não) - Usam a função geral
  configurarEnvioFormulario(
    'form-opcao-sim',
    'https://script.google.com/macros/s/AKfycbxJL8EvG1nxZUz-m5P2Y2ybF7HYi7sjJzFbmAdnDoUcqk2ikl0U2wyduuzqaoAZhP1b2Q/exec'
  );
  
  configurarEnvioFormulario(
    'form-opcao-nao',
    'https://script.google.com/macros/s/AKfycbxJL8EvG1nxZUz-m5P2Y2ybF7HYi7sjJzFbmAdnDoUcqk2ikl0U2wyduuzqaoAZhP1b2Q/exec'
  );
  
// FORMULÁRIO PRINCIPAL (form-confirmacao-2)
document.forms['form-confirmacao-2']?.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // 1. Armazena dados do form principal
  const formData = new FormData(this);
  const dados = {
    nome: formData.get('nome'),
    link: formData.get('link'),
    porte: formData.get('porte'),
    segmento: formData.get('segmento'),
    espaco: formData.get('espaco')
  };
  
  // Validar campos obrigatórios
  if (!dados.porte || !dados.segmento || !dados.espaco) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return;
  }
  
  console.log('Dados do formulário principal:', dados);
  sessionStorage.setItem('dadosFormPrincipal', JSON.stringify(dados));
  
  // 2. Redireciona baseado na seleção "espaco"
  if (dados.espaco === 'opcaosim') {
    fecharModal(this.closest('.modal'));
    abrirModal(document.getElementById('modal-opcao-sim'));
  } else if (dados.espaco === 'opcaonao') {
    fecharModal(this.closest('.modal'));
    abrirModal(document.getElementById('modal-opcao-nao'));
  }
});

// FORMULÁRIO OPÇÃO SIM
document.getElementById('form-opcao-sim')?.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // 1. Obter dados do form secundário
  const formData = new FormData(this);
  const dadosSecundarios = {
    estado: formData.get('estado'),
    cidade: formData.get('cidade'),
    compartilhe: formData.get('compartilhe')
  };
  
  // 2. Combinar com dados do principal
  const dadosPrincipal = JSON.parse(sessionStorage.getItem('dadosFormPrincipal') || {});
  const dadosCompletos = {...dadosPrincipal, ...dadosSecundarios};
  
  console.log('Dados completos (opção sim):', dadosCompletos);
  enviarDadosConfirmacao(dadosCompletos);
});

// FORMULÁRIO OPÇÃO NÃO
document.getElementById('form-opcao-nao')?.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // 1. Obter dados do form secundário
  const formData = new FormData(this);
  const dadosSecundarios = {
    digital: formData.get('digital')?.toString().trim() || '', // Novo campo digital
    compartilhe: formData.get('compartilhe')
  };
  
  // 2. Combinar com dados do principal
  const dadosPrincipal = JSON.parse(sessionStorage.getItem('dadosFormPrincipal') || {});
  const dadosCompletos = {...dadosPrincipal, ...dadosSecundarios};
  
  console.log('Dados completos (opção não):', dadosCompletos);
  enviarDadosConfirmacao(dadosCompletos);
});

// FUNÇÃO DE ENVIO (MANTIDA COMO NO SEU CÓDIGO ORIGINAL)
async function enviarDadosConfirmacao(dados) {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbxfI5MZ0DpTYOMEIW95vW5fhrdvxTD2zy_PkWCbmLEzWnZotKRjD-K9fCJR_cpVL-jgqg/exec';
    
    // Converter para FormData para garantir compatibilidade
    const formData = new URLSearchParams();
    for (const key in dados) {
      formData.append(key, dados[key] || '');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    const text = await response.text();
    let data = {};
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.warn('Resposta não é JSON válido:', text);
    }

    if (!response.ok) {
      throw new Error(data.message || `Erro HTTP: ${response.status}`);
    }

    console.log('Resposta completa do servidor:', data);
    alert(data.message || 'Formulário enviado com sucesso!');
    
    // Limpar storage e fechar modal após envio bem-sucedido
    sessionStorage.removeItem('dadosFormPrincipal');
    fecharModal(document.querySelector('.modal[style="display: block;"]'));
    
    return true;
    
  } catch (error) {
    console.error('Erro detalhado:', error);
    alert('Erro ao enviar: ' + (error.message || 'Verifique o console para mais detalhes'));
    return false;
  }
}

// FUNÇÕES AUXILIARES (MODAIS) - MANTIDAS COMO NO SEU CÓDIGO
function abrirModal(modal) {
  if (modal) modal.style.display = 'block';
}

function fecharModal(modal) {
  if (modal) modal.style.display = 'none';
}


  document.getElementById('form-fale-conosco').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Criar objeto FormData
    const formData = new FormData(this);
    
    // Obter todos os valores
    const dados = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      telefone: formData.get('campoTelefone'),
      comunidade: formData.get('comunidade'),
      mensagem: formData.get('mensagem')
    };
    
    // Limpar telefone (remover caracteres não numéricos)
    dados.telefone = dados.telefone.replace(/\D/g, '');
    
    // Validar campos obrigatórios
    if (!dados.comunidade) {
      alert('Por favor, selecione uma comunidade');
      return;
    }
    
    console.log('Dados do formulário:', dados);
    
    // Aqui você pode enviar os dados para o servidor
    enviarDadosFaleConosco(dados);
  });
  
  async function enviarDadosFaleConosco(dados) {
    try {
      const url = 'https://script.google.com/macros/s/AKfycby3aqb28cJak4shtjVHgPfIkUpMYjUtiYDMMQhcodcst8EKNYV3HNOALBKRBdruW3sT1A/exec';
      
      // Converter para FormData para garantir compatibilidade
      const formData = new URLSearchParams();
      formData.append('nome', dados.nome || '');
      formData.append('email', dados.email || '');
      formData.append('campoTelefone', dados.telefone || '');
      formData.append('comunidade', dados.comunidade || '');
      formData.append('mensagem', dados.mensagem || '');
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });
  
      const text = await response.text();
      let data = {};
      
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.warn('Resposta não é JSON válido:', text);
      }
  
      if (!response.ok) {
        throw new Error(data.message || `Erro HTTP: ${response.status}`);
      }
  
      console.log('Resposta completa do servidor:', data);
      alert(data.message || 'Mensagem enviada com sucesso!');
      return true;
      
    } catch (error) {
      console.error('Erro detalhado:', error);
      alert('Erro ao enviar: ' + (error.message || 'Verifique o console para mais detalhes'));
      return false;
    }
  }



  // LOGICA PRA TELEFONE
  function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function (e) {
      let cursor = input.selectionStart;
      let valor = e.target.value.replace(/\D/g, '');

      if (valor.length > 11) valor = valor.slice(0, 11);

      let formatado = "";

      if (valor.length > 0) {
        formatado += `(${valor.slice(0, 2)}`;
      }
      if (valor.length >= 3) {
        formatado += `) ${valor.slice(2, 3)}`;
      }
      if (valor.length >= 4) {
        formatado += ` ${valor.slice(3, 7)}`;
      }
      if (valor.length >= 8) {
        formatado += `-${valor.slice(7)}`;
      } else if (valor.length > 7) {
        formatado += `-${valor.slice(7)}`;
      }

      e.target.value = formatado;

      // Ajusta posição do cursor pra não pular
      input.setSelectionRange(cursor, cursor);
    });
  }

  // Aplica em todos os inputs com a classe 'campo-telefone'
  document.querySelectorAll('.campo-telefone').forEach(aplicarMascaraTelefone);