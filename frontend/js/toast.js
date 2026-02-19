function criarContainerToast() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function tocarSom(tipo) {
    let audio = new Audio();
    
    if (tipo === 'sucesso') {
        audio.src = '../audio/sucesso.mp3';
    } else if (tipo === 'erro') {
        audio.src = '../audio/erro.mp3';
    } else {
        audio.src = '../audio/aviso.mp3';
    }

    audio.play().catch(erro => console.log(erro));
}

function mostrarToast(mensagem, tipo = 'aviso') {
    const container = criarContainerToast();

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerText = mensagem;

    container.appendChild(toast);
    
    tocarSom(tipo);

    setTimeout(() => {
        toast.classList.add('mostrar');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('mostrar');
        toast.classList.add('esconder');
        
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, 3500);
}