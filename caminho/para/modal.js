document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais
    const modalCadastro = document.getElementById('formulario-modal');
    const modalIndicacao = document.getElementById('modal-indicacao');// NOVO
    const modalNovo = document.getElementById('id-do-novo-modal');
    const modalConfirmacao = document.getElementById('modal-confirmacao');
    const formCadastro = document.getElementById('granulado');
    const formIndicacao = document.getElementById('form-indicacao');
    const modalConfirmacao2 = document.getElementById('modal-confirmacao-2');
    const modalMuitoObrigado2= document.getElementById('modal-muito-obrigado');

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
    document.getElementById('abrir-form-cadastro').addEventListener('click', function() {
        formCadastro.reset();
        abrirModal(modalCadastro);
    });

    // ABRIR MODAL INDICAÇÃO (NOVO!)
    document.getElementById('abrir-modal-indicacao').addEventListener('click', function(e) {
        e.preventDefault();
        carregarEstados(); // carrega os estados ao abrir o modal
        abrirModal(modalIndicacao);
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

function carregarEstados() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then(response => response.json())
        .then(estados => {
            const estadoSelect = document.getElementById('estado');
            while (estadoSelect.options.length > 1) {
                estadoSelect.remove(1);
            }

            estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.sigla;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });

            estadoSelect.disabled = false;
        })
        .catch(error => console.error('Erro ao carregar estados:', error));
}

document.getElementById('estado').addEventListener('change', function() {
    const siglaEstado = this.value;
    const cidadeSelect = document.getElementById('cidade');

    cidadeSelect.innerHTML = '<option value="" selected disabled hidden>SELECIONE UMA CIDADE</option>';
    cidadeSelect.disabled = true;

    if (siglaEstado) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios?orderBy=nome`)
            .then(response => response.json())
            .then(cidades => {
                cidades.forEach(cidade => {
                    const option = document.createElement('option');
                    option.value = cidade.nome;
                    option.textContent = cidade.nome;
                    cidadeSelect.appendChild(option);
                });

                cidadeSelect.disabled = false;
            })
            .catch(error => console.error('Erro ao carregar cidades:', error));
    }
});

