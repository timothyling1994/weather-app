import { requestAPI } from './requestAPI.js'
import { domController } from './domController.js'

let staticListeners = () => {

	let city_search = document.querySelector("#city-search");


	city_search.addEventListener("keyup", async function(event){
		if(event.keyCode === 13 && city_search.value != ""){
			
			let payload = await requestAPI.getLatLong(city_search.value);

			let weather_data = await requestAPI.requestCityData(payload.coord.lat,payload.coord.lon);

			console.log(payload);
			console.log(weather_data);

			let current_description = weather_data.current.weather[0].description;
			let current_main_descrip = weather_data.current.weather[0].main;
			let current_temp = weather_data.current.temp;
			let current_feels_like = weather_data.current.feels_like;
			let current_temp_min = payload.main.temp_min;
			let current_temp_max = payload.main.temp_max;
			let current_name = payload.name;


			let currentWeatherObj = {

				current_description,
				current_temp,
				current_feels_like,
				current_temp_min,
				current_temp_max,
				current_name,
				current_main_descrip
			};

			domController.updateTodayDOM(currentWeatherObj);
			
		}
	});
};

export {staticListeners}