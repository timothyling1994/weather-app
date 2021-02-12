import { requestAPI } from './requestAPI.js'
import { domController } from './domController.js'

let staticListeners = () => {

	let city_search = document.querySelector("#city-search");


	city_search.addEventListener("keyup", async function(event){
		if(event.keyCode === 13 && city_search.value != ""){
				
			let weatherObj = await requestAPI.requestHandler(city_search.value);
			domController.updateTodayDOM(weatherObj.currentWeatherObj);
			domController.updateSevenDayForecast(weatherObj.forecastWeatherArray);
		}
	});
};

export {staticListeners}