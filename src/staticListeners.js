import { requestAPI } from './requestAPI.js'
import { domController } from './domController.js'

let staticListeners = () => {

	let city_search = document.querySelector("#city-search");


	city_search.addEventListener("keyup", async function(event){
		if(event.keyCode === 13 && city_search.value != ""){
			
			let payload = await requestAPI.getLatLong(city_search.value);

			let weather_data = await requestAPI.requestCityData(payload.coord.lat,payload.coord.lon);


			/*
			payload[0].json().then((jsonData) => {

				let description = jsonData.weather[0].description;
				let temp = jsonData.main.temp;
				let feels_like = jsonData.main.feels_like;
				let temp_min = jsonData.main.temp_min;
				let temp_max = jsonData.main.temp_max;
				let name = jsonData.name;


				let weatherObj = {

					description,
					temp,
					feels_like,
					temp_min,
					temp_max,
					name
				}

				domController.updateTodayDOM(weatherObj);
			});*/
			
		}
	});
};

export {staticListeners}