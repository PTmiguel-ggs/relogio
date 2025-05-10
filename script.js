console.log("test")
function att() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, 0)
    const minutos = String(agora.getMinutes()).padStart(2, 0)
    const segundos = String(agora.getSeconds()).padStart(2, 0)
    const relogio = horas + ":" + minutos + ":" + segundos
    document.getElementById("relogio").textContent = relogio
}
setInterval(att, 1000)

function iniciarContagem() {
    const agora = new Date();
    const dataSelecionada = document.getElementById("dataSelecionada").value 
    const datafinal = new Date(dataSelecionada)
    const diferenca = datafinal - agora

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) /1000 * 60 * 60)
    const minutos = Math.floor((diferenca % (1000 * 60 * 60 )) / 1000 * 60)
    const segundos = Math.floor((diferenca % (1000 * 60 ) ) / 1000)

    console.log(agora)
    console.log(dataSelecionada)
    console.log(datafinal)
    console.log(diferenca)
    console.log(dias)
    console.log(horas)
    console.log(minutos)
    console.log(segundos)
}   
