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




const latitude = 41.5454;
const longitude = -8.4265;

const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe%2FLisbon`;

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const current = data.current_weather;
        const daily = data.daily;

        // Atualizar dados atuais
        document.getElementById("temperature").textContent = `${Math.round(current.temperature)}°C`;
        document.getElementById("location").textContent = "Braga, PT";
        document.getElementById("windSpeed").textContent = `Vento: ${Math.round(current.windspeed)} km/h`;
        document.getElementById("precipitationChance").textContent = `Chuva: ${daily.precipitation_probability_max[0] ?? "--"}%`;

        // Atualizar nascer e pôr do sol
        const sunrise = new Date(daily.sunrise[0]);
        const sunset = new Date(daily.sunset[0]);
        document.getElementById("sunriseTime").textContent = `${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}h`;
        document.getElementById("sunsetTime").textContent = `${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}h`;

        // Calcular duração do dia
        const dayLengthMs = sunset - sunrise;
        const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
        const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("dayLength").textContent = `${hours} h ${minutes} m`;

        // Atualizar previsão para os próximos dias
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = ""; // Limpar conteúdo anterior

        for (let i = 0; i < 4; i++) {
            const dayName = new Date(daily.time[i]).toLocaleDateString("pt-PT", { weekday: "short" });
            const icon = getWeatherIcon(daily.precipitation_probability_max[i]);
            const highTemp = Math.round(daily.temperature_2m_max[i]);
            const lowTemp = Math.round(daily.temperature_2m_min[i]);

            const forecastDay = document.createElement("div");
            forecastDay.className = "forecast-day bg-white/5 backdrop-blur-sm rounded-xl p-3 w-20 text-center border border-white/10 shadow-sm hover:bg-white/10 transition-all duration-200 cursor-pointer transform hover:-translate-y-1";
            forecastDay.innerHTML = `
                <div class="day-name text-xs font-medium mb-1 opacity-80">${i === 0 ? "Hoje" : dayName}</div>
                <div class="forecast-icon text-2xl my-1 drop-shadow-md">${icon}</div>
                <div class="high-temp text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">${highTemp}°</div>
                <div class="low-temp text-xs opacity-70">${lowTemp}°</div>
            `;
            forecastContainer.appendChild(forecastDay);
        }

    } catch (error) {
        console.error("Erro ao obter dados do tempo:", error);
    }
}

function getWeatherIcon(precipitationProbability) {
    if (precipitationProbability >= 70) return "🌧️";
    if (precipitationProbability >= 30) return "⛅";
    return "☀️";
}

function updateDateTime() {
    const now = new Date();
    const weekdays = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    const day = weekdays[now.getDay()];
    const time = now.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
    document.getElementById("dateTime").textContent = `${day}, ${time}`;
}

// Inicializar
updateDateTime();
fetchWeather();
setInterval(updateDateTime, 60000); // Atualizar hora a cada minuto
setInterval(fetchWeather, 60000); // Atualiza a cada 1 minuto

