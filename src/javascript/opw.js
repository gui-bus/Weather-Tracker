//!Interação
const citySearchInput = document.getElementById("city-search-input");
const citySearchButton = document.getElementById("city-search-button");
//!Exibição
// !City data | Weather info
const cityName = document.getElementById("city-name");
const cityCountry = document.getElementById("city-country");
const weatherMain = document.getElementById("weather-main");
const weatherIcon = document.getElementById("weather-icon");
// !Temperature
const currentTemperature = document.getElementById("current-temperature");
const fellsLikeTemperature = document.getElementById("feels-like-temperature");
const dewPoint = document.getElementById("city-dew_point");
// !Wind | Clouds
const windSpeed = document.getElementById("wind-speed");
const windDeg = document.getElementById("wind-deg");
const windGust = document.getElementById("wind-gust");
const currentClouds = document.getElementById("current-clouds");
// !Rain & Snow
const cityRain = document.getElementById("city-rain_1h");
const citySnow = document.getElementById("city-snow_1h");
// !City time
const cityUtc = document.getElementById("city-utc");
const cityUtcDay = document.getElementById("city-utcDay");
// !Humidity | Pressure | Visibility
const currentHumidity = document.getElementById("current-humidity");
const cityPressure = document.getElementById("city-pressure");
const cityVisibility = document.getElementById("city-visibility");
// !Coords
const cityLatitude = document.getElementById("lat");
const cityLongitude = document.getElementById("lon");
// !Sunrise sunset
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const sunriseContainer = document.getElementById("sunrise-container");
const sunsetContainer = document.getElementById("sunset-container");

const weatherContainer = document.getElementById("weatherContainer");

const api_key = "9a1022c29163cfe2ffeed2610729ef5f";

//!Detecta que o usuario clicou no botão e atribui o valor da barra de pesquisa(nome da cidade) a variavel cityName e então executa a função getCityWeather()
citySearchButton.addEventListener("click", () => {
  let cityName = citySearchInput.value;
  getCityWeather(cityName);
});

//!Função para detectar a posição do usuario e carregar o site com as informaçoes corretas
navigator.geolocation.getCurrentPosition(
  (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getCurrentLocationWeather(lat, lon);
  },
  (err) => {
    if (err.code == 1) {
      alert(
        "Ops! Parece que você negou o acesso à sua localização :( \n\nPara obter o clima do local desejado ative a localização e atualize a pagina ou insira manualmente o nome de uma cidade na barra de pesquisa."
      );
    } else {
      console.log(err);
    }
  }
);

function getCurrentLocationWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

//!fetch buscar | then então
//!Busca a localização atraves da barra de pesquisa
function getCityWeather(cityName) {
  weatherIcon.src = `./src/images/assets/loading-icon.svg`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

const weatherTranslations = {
  Clear: "Céu limpo",
  Clouds: "Nublado",
  Rain: "Chuva",
  Thunderstorm: "Tempestade",
  Drizzle: "Chuviscos",
  Snow: "Nevasca",
  Mist: "Neblina",
  Smoke: "Fumaça",
  Haze: "Névoa",
  Dust: "Poeira",
  Fog: "Nevoeiro",
  Sand: "Tempestade de areia",
  Ash: "Cinzas vulcânicas",
  Squall: "Rajada de vento",
  Tornado: "Tornado",
};

const cityCountryTranslations = {
  AF: "Afeganistão",
  ZA: "África do Sul",
  AL: "Albânia",
  DE: "Alemanha",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antártida",
  AG: "Antígua e Barbuda",
  SA: "Arábia Saudita",
  DZ: "Argélia",
  AR: "Argentina",
  AM: "Armênia",
  AW: "Aruba",
  AU: "Austrália",
  AT: "Áustria",
  AZ: "Azerbaijão",
  BS: "Bahamas",
  BH: "Bahrein",
  BD: "Bangladesh",
  BB: "Barbados",
  BE: "Bélgica",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermudas",
  BY: "Bielorrússia",
  BO: "Bolívia",
  BA: "Bósnia e Herzegovina",
  BW: "Botswana",
  BR: "Brasil",
  BN: "Brunei",
  BG: "Bulgária",
  BF: "Burkina Faso",
  BI: "Burundi",
  BT: "Butão",
  CV: "Cabo Verde",
  CM: "Camarões",
  KH: "Camboja",
  CA: "Canadá",
  QA: "Catar",
  KZ: "Cazaquistão",
  EA: "Ceuta e Melilla",
  TD: "Chade",
  CL: "Chile",
  CN: "China",
  CY: "Chipre",
  SG: "Cingapura",
  CO: "Colômbia",
  KM: "Comores",
  CG: "Congo - Brazzaville",
  CD: "Congo - Kinshasa",
  KP: "Coreia do Norte",
  KR: "Coreia do Sul",
  CR: "Costa Rica",
  CI: "Costa do Marfim",
  HR: "Croácia",
  CU: "Cuba",
  CW: "Curaçao",
  DG: "Diego Garcia",
  DK: "Dinamarca",
  DJ: "Djibuti",
  DM: "Dominica",
  EG: "Egito",
  SV: "El Salvador",
  AE: "Emirados Árabes Unidos",
  EC: "Equador",
  ER: "Eritreia",
  SK: "Eslováquia",
  SI: "Eslovênia",
  ES: "Espanha",
  US: "Estados Unidos",
  EE: "Estônia",
  ET: "Etiópia",
  FJ: "Fiji",
  PH: "Filipinas",
  FI: "Finlândia",
  FR: "França",
  GA: "Gabão",
  GM: "Gâmbia",
  GE: "Geórgia",
  GS: "Geórgia do Sul e Ilhas Sandwich do Sul",
  GH: "Gana",
  GI: "Gibraltar",
  GR: "Grécia",
  GD: "Granada",
  GL: "Groenlândia",
  GP: "Guadalupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GY: "Guiana",
  GF: "Guiana Francesa",
  GN: "Guiné",
  GW: "Guiné Bissau",
  GQ: "Guiné Equatorial",
  HT: "Haiti",
  HN: "Honduras",
  HK: "Hong Kong, Região Admin. Especial da China",
  HU: "Hungria",
  YE: "Iêmen",
  BV: "Ilha Bouvet",
  CX: "Ilha Christmas",
  CP: "Ilha Clipperton",
  AC: "Ilha de Ascensão",
  IM: "Ilha de Man",
  NF: "Ilha Norfolk",
  AX: "Ilhas Aland",
  KY: "Ilhas Cayman",
  CC: "Ilhas Cocos (Keeling)",
  CK: "Ilhas Cook",
  FO: "Ilhas Faroe",
  HM: "Ilhas Heard e McDonald",
  FK: "Ilhas Malvinas",
  MP: "Ilhas Marianas do Norte",
  MH: "Ilhas Marshall",
  UM: "Ilhas Menores Distantes dos Estados Unidos",
  PN: "Ilhas Pitcairn",
  SB: "Ilhas Salomão",
  TC: "Ilhas Turks e Caicos",
  VG: "Ilhas Virgens Britânicas",
  VI: "Ilhas Virgens dos EUA",
  IN: "Índia",
  ID: "Indonésia",
  IR: "Irã",
  IQ: "Iraque",
  IE: "Irlanda",
  IS: "Islândia",
  IL: "Israel",
  IT: "Itália",
  JM: "Jamaica",
  JP: "Japão",
  JE: "Jersey",
  JO: "Jordânia",
  KW: "Kuwait",
  LA: "Laos",
  LS: "Lesoto",
  LV: "Letônia",
  LB: "Líbano",
  LR: "Libéria",
  LY: "Líbia",
  LI: "Liechtenstein",
  LT: "Lituânia",
  LU: "Luxemburgo",
  MO: "Macau, Região Admin. Especial da China",
  MK: "Macedônia do Norte",
  MG: "Madagascar",
  MY: "Malásia",
  MW: "Malawi",
  MV: "Maldivas",
  ML: "Mali",
  MT: "Malta",
  MA: "Marrocos",
  MQ: "Martinica",
  MU: "Maurício",
  MR: "Mauritânia",
  YT: "Mayotte",
  MX: "México",
  MM: "Mianmar",
  FM: "Micronésia",
  MZ: "Moçambique",
  MD: "Moldávia",
  MC: "Mônaco",
  MN: "Mongólia",
  ME: "Montenegro",
  MS: "Montserrat",
  NA: "Namíbia",
  NR: "Nauru",
  NP: "Nepal",
  NI: "Nicarágua",
  NE: "Níger",
  NG: "Nigéria",
  NU: "Niue",
  NO: "Noruega",
  NC: "Nova Caledônia",
  NZ: "Nova Zelândia",
  OM: "Omã",
  NL: "Países Baixos",
  BQ: "Países Baixos Caribenhos",
  PW: "Palau",
  PA: "Panamá",
  PG: "Papua-Nova Guiné",
  PK: "Paquistão",
  PY: "Paraguai",
  PE: "Peru",
  PF: "Polinésia Francesa",
  PL: "Polônia",
  PR: "Porto Rico",
  PT: "Portugal",
  KE: "Quênia",
  KG: "Quirguistão",
  KI: "Quiribati",
  GB: "Reino Unido",
  CF: "República Centro-Africana",
  CD: "República Democrática do Congo",
  DO: "República Dominicana",
  CZ: "República Tcheca",
  RE: "Reunião",
  RO: "Romênia",
  RW: "Ruanda",
  RU: "Rússia",
  EH: "Saara Ocidental",
  KN: "Saint Kitts e Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre e Miquelon",
  VC: "Saint Vincent e Granadinas",
  WS: "Samoa",
  AS: "Samoa Americana",
  SM: "San Marino",
  SH: "Santa Helena, Ascensão e Tristão da Cunha",
  ST: "São Tomé e Príncipe",
  SN: "Senegal",
  SL: "Serra Leoa",
  RS: "Sérvia",
  SC: "Seychelles",
  SG: "Singapura",
  SX: "Sint Maarten",
  SY: "Síria",
  So: "Somália",
  LK: "Sri Lanka",
  SZ: "Suazilândia",
  SD: "Sudão",
  SS: "Sudão do Sul",
  SE: "Suécia",
  CH: "Suíça",
  SR: "Suriname",
  TJ: "Tadjiquistão",
  TH: "Tailândia",
  TW: "Taiwan",
  TZ: "Tanzânia",
  TF: "Terras Austrais e Antárticas Francesas",
  PS: "Território da Palestina",
  IO: "Território Britânico do Oceano Índico",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad e Tobago",
  TN: "Tunísia",
  TM: "Turcomenistão",
  TR: "Turquia",
  TV: "Tuvalu",
  UA: "Ucrânia",
  UG: "Uganda",
  UY: "Uruguai",
  UZ: "Uzbequistão",
  VU: "Vanuatu",
  VA: "Vaticano",
  VE: "Venezuela",
  VN: "Vietnã",
  WF: "Wallis e Futuna",
  ZM: "Zâmbia",
  ZW: "Zimbábue",
  SS: "Sudão do Sul",
  KP: "Coreia do Norte",
  KR: "Coreia do Sul",
  TW: "Taiwan",
  CW: "Curaçao",
  BQ: "Bonaire, Santo Eustáquio e Saba",
  SX: "Sint Maarten",
  BL: "São Bartolomeu",
  MF: "Saint Martin",
  GG: "Guernsey",
  JE: "Jersey",
  IM: "Ilha de Man",
  XK: "Kosovo",
};

function displayWeather(data) {
  //!Seleciona quais informaçoes do responde.json serão utilizadas(vê no console do dev tools navegador)
  let {
    name,
    timezone,
    coord: { lon, lat },
    weather: [{ icon, description, main }],
    main: { temp, feels_like, humidity },
    wind: { speed, deg, gust },
    rain,
    snow,
    sys: { sunrise, sunset, country },
  } = data;

  //!Atribui os valores obtidos as variaveis
  // !Sunrise sunset
  const sunriseDate = new Date((sunrise + timezone) * 1000);
  const sunriseTimeFormatted = sunriseDate.toLocaleTimeString("pt-BR", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  currentTemperature.textContent = `${Math.round(temp)}°C`;
  sunriseTime.textContent = `${sunriseTimeFormatted}`;
  sunriseContainer.classList.remove("hidden");

  const sunsetDate = new Date((sunset + timezone) * 1000);
  const sunsetTimeFormatted = sunsetDate.toLocaleTimeString("pt-BR", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  sunsetTime.textContent = `${sunsetTimeFormatted}`;
  sunsetContainer.classList.remove("hidden");

  // !City data | Weather info
  cityName.innerHTML = `Confira abaixo os dados climáticos atuais de <br> <span class="font-bold text-mainYellow">${name},</span>`;
  cityCountry.innerHTML = `<span class="font-bold text-mainYellow">${cityCountryTranslations[country]}.</span>`;
  weatherIcon.src = `./src/images/assets/${icon}.svg`;
  weatherMain.innerHTML = `<span class="font-bold">${weatherTranslations[main]}</span>`;

  // !Day | Hour
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const timezoneOffset = timezone;
  const cityDate = new Date(Date.now() + timezoneOffset * 1000);
  const options = {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  };
  const dateFormatted = cityDate.toLocaleDateString("pt-BR", options);

  const timeFormatted = cityDate.toLocaleTimeString("pt-BR", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: undefined,
  });

  // !Transforma a primeira letra do dia da semana em maiúscula
  const firstLetterCapitalized =
    dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

  cityUtc.textContent = `${firstLetterCapitalized}`;

  cityUtcDay.textContent = `${timeFormatted} (GMT${
    timezoneOffset > 0 ? "+" : ""
  }${timezoneOffset / 3600})`;

  //!Temperature
  fellsLikeTemperature.textContent = `${Math.round(feels_like)}°C `;

  // !Dew Point
  const a = 17.27;
  const b = 237.7;
  const ln = Math.log(humidity / 100) + (a * temp) / (b + temp);
  const td = (b * ln) / (a - ln);
  dewPoint.textContent = `${Math.round(td)}°C`;

  // !Wind
  windSpeed.textContent = `${(speed * 3.6).toFixed(2)}km/h`;
  // <------------------------------------------------>
  // ?Wind Direction
  function windDirection(deg) {
    const direcoes = [
      "Norte",
      "Nordeste",
      "Leste",
      "Sudeste",
      "Sul",
      "Sudoeste",
      "Oeste",
      "Noroeste",
    ];
    const index = Math.round(deg / 45) % 8;
    return direcoes[index];
  }
  windDeg.textContent = `${windDirection(deg)} (${deg}°)`;
  // <------------------------------------------------>
  windGust.textContent = `${isNaN(gust) ? "0" : (gust * 3.6).toFixed(2)} km/h`;
  // <------------------------------------------------>

  // !Rain & Snow
  if (rain && rain["1h"]) {
    cityRain.textContent = `${rain["1h"]} mm`;
  } else {
    cityRain.textContent = "0 mm";
  }
  // <------------------------------------------------>
  if (snow && snow["1h"]) {
    citySnow.textContent = `${snow["1h"]} mm`;
  } else {
    citySnow.textContent = "0 mm";
  }

  // !Humidity | Pressure | Visibility
  currentHumidity.textContent = `${humidity}%`;
  cityPressure.innerHTML = data.main.pressure + " hPa";

  if (data.visibility >= 10000) {
    cityVisibility.textContent = "Mais de 10 km";
  } else {
    cityVisibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  }

  // !Coords
  cityLatitude.textContent = `${lat.toFixed(2)}°`;
  cityLongitude.textContent = ` ${lon.toFixed(2)}°`;

  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  weatherContainer.classList.remove("hidden");
}

function validateText(input) {
  const regex = /[^a-zA-ZÀ-ÿ\s]/g;
  if (input.value.match(regex)) {
    input.value = input.value.replace(regex, "");
  }
}

function validateSearchForm() {
  const input = document.getElementById("city-search-input");
  if (input.value.trim() === "") {
    alert("Campo vazio. Digite o nome da cidade antes de pesquisar.");
    return;
  }
}
