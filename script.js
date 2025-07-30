history.scrollRestoration = 'manual';
// --- 1. Selecionando os Elementos do HTML ---
const perguntaElemento = document.getElementById('pergunta');
const opcoesContainer = document.getElementById('opcoes-container');
const resultadoElemento = document.getElementById('resultado');
const quizContainer = document.querySelector('.quiz-container');
const midiaContainer = document.querySelector('.midia-container');
const midiaList = document.querySelector('.midia-list');
const backgroundImage = document.querySelector('.background-image');
const bodyElement = document.body;
// --- 2. Nossa Pergunta Única e Mídias ---
const perguntaUnica = {
    pergunta: "Press Start para descobrir...",
    respostas: [
        { texto: "START", correto: true },
    ]
};

const midias = [
    { tipo: 'img', src: 'fotomadeiro.jpg' },
    { tipo: 'img', src: 'fotomangabeiras.jpg' },
    { tipo: 'img', src: 'dianamo.jpg' },
    { tipo: 'img', src: 'fotoaniverlulu.jpg' },
    { tipo: 'img', src: 'anivertchola.jpg' },
    { tipo: 'img', src: 'beiço.jpg' },
    { tipo: 'img', src: 'fotoliba.jpg' },
    { tipo: 'img', src: 'fotocinema.jpg' },
    { tipo: 'img', src: 'opkiss.jpg' },
    { tipo: 'img', src: 'fotoformatura.jpg' },
    { tipo: 'img', src: 'opfav.jpg' },
    { tipo: 'img', src: 'liba.jpg' },
    { tipo: 'img', src: 'coração.png' },
    // Adicione mais fotos e vídeos aqui
];

// --- 3. Funções Principais ---

// Função para exibir a pergunta e as opções na tela
function mostrarPerguntaUnica() {
    resetarEstado();
    perguntaElemento.innerText = perguntaUnica.pergunta;

    perguntaUnica.respostas.forEach(resposta => {
        const button = document.createElement('button');
        button.innerText = resposta.texto;
        button.classList.add('btn-opcao');
        if (resposta.correto) {
            button.dataset.correto = resposta.correto;
        }
        button.addEventListener('click', selecionarRespostaUnica);
        opcoesContainer.appendChild(button);
    });
}

// Função para limpar o estado anterior (cores, botões antigos)
function resetarEstado() {
    resultadoElemento.innerText = '';
    while (opcoesContainer.firstChild) {
        opcoesContainer.removeChild(opcoesContainer.firstChild);
    }
}

// Função que é chamada quando o usuário clica em uma resposta
function selecionarRespostaUnica(e) {
    const botaoSelecionado = e.target;
    const isCorreto = botaoSelecionado.dataset.correto === "true";

    Array.from(opcoesContainer.children).forEach(button => {
        button.disabled = true;
    });

    if (isCorreto) {
        resultadoElemento.innerText = "Se prepara!!";
        botaoSelecionado.classList.add('correto');

        setTimeout(() => {
            bodyElement.classList.remove('no-scroll');

            quizContainer.classList.add('escondido');
            midiaContainer.classList.remove('escondido');
            mostrarMidias();

            if (backgroundImage) {
                backgroundImage.style.backgroundImage = 'none';
            }
        }, 1500);

    } else {
        resultadoElemento.innerText = "Resposta Incorreta! Tente novamente.";
        botaoSelecionado.classList.add('incorreto');
    }
}

function mostrarMidias() {
    midias.forEach(midia => {
        if (midia.tipo === 'img') {
            const img = document.createElement('img');
            img.src = midia.src;
            midiaList.appendChild(img);
        } else if (midia.tipo === 'video') {
            const video = document.createElement('video');
            video.src = midia.src;
            video.controls = true; // Adiciona controles de reprodução
            midiaList.appendChild(video);
        }
    });
}

// --- 4. Iniciar o Quizz ---
mostrarPerguntaUnica();