function att() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    const relogio = `${horas}:${minutos}:${segundos}`;
    document.getElementById("relogio").textContent = relogio;
}
setInterval(att, 1000);

function iniciarContagem() {
    const dataSelecionada = document.getElementById("dataSelecionada").value;


    if (!dataSelecionada) {
        document.getElementById('Temporizador').textContent = "Por favor, seleciona uma data.";
        return;
    }

    const agora = new Date();
    const datafinal = new Date(dataSelecionada);
    const diferenca = datafinal - agora;

    if (diferenca <= 0) {
        document.getElementById('Temporizador').textContent = "Tempo Expirado!";
        return;
    }

    let dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    horas = String(horas).padStart(2, '0');
    minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');

    document.getElementById('Temporizador').textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(() => {

    const dataSelecionada = document.getElementById("dataSelecionada").value;
    if (dataSelecionada) {
        iniciarContagem();
    }
}, 1000);

function alternarTema() {
    const body = document.body;
    const botao = document.getElementById('botaoTema');

    body.classList.toggle('escuro');
    body.classList.toggle('claro');

    if (body.classList.contains('escuro')) {
        botao.textContent = '☀️';
    } else {
        botao.textContent = '🌙';
    }
}
