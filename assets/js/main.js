const apiKey = "7816d9f235c88adc096427a68ca872f2";
const units = "metric";

const cityNameElement = document.getElementById("city-name");
const currTempElement = document.getElementById("curr-temp");
const currConditionElement = document.getElementById("curr-condition");
const currConditionImageElement = document.getElementById("curr-condition-img");
const cityInputElement = document.getElementById("city-input");
const submitButtonElement = document.getElementById("submit-button");
const forecastAreaElement = document.getElementById("forecast-area");

submitButtonElement.addEventListener('click', handleButtonClick);


function handleButtonClick() {
    const cityName = cityInputElement.value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastAreaElement.innerHTML = "";

            const cityName = data.city.name;
            cityNameElement.innerText = cityName;

            const currentCondition = data.list[0].weather[0].main;
            currConditionElement.innerText = currentCondition;

            const currentConditionImageCode = data.list[0].weather[0].icon;
            const currConditionImage = `https://openweathermap.org/img/wn/${currentConditionImageCode}@2x.png`;
            currConditionImageElement.src = currConditionImage;

            const currentTemp = data.list[0].main.temp;
            currTempElement.innerText = currentTemp;
        
            for (let i = 7; i < 40; i+=8) {
                const currentCondition = data.list[i].weather[0].main;
                const currentConditionImageCode = data.list[i].weather[0].icon;
                const currConditionImage = `https://openweathermap.org/img/wn/${currentConditionImageCode}@2x.png`;
                const currentTemp = data.list[i].main.temp;

                const timeStamp = data.list[i].dt;
                const dayOfWeek = new Date(timeStamp * 1000).toLocaleDateString("en-GB", { weekday: 'long' });

                const htmlString = `
                    <div class="col">
                        <h3>${dayOfWeek}</h3>
                        <img src="${currConditionImage}">
                        <h3>${currentCondition}</h3>
                        <h4>${currentTemp}°C</h4>
                    </div>
                `;
                forecastAreaElement.innerHTML += htmlString;
            }
        
        
        });
}