import { requestAPI } from './requestAPI.js'
import { domController } from './domController.js'

let staticListeners = () => {

	let city_search = document.querySelector("#city-search");


	city_search.addEventListener("keyup", async function(event){
		if(event.keyCode === 13 && city_search.value != ""){
			
			try {
				let weatherObj = await requestAPI.requestHandler(city_search.value);

				console.log(weatherObj);
				if(weatherObj.todayWeatherObj != undefined && weatherObj.forecastWeatherArray !=undefined)
				{
					domController.updateTodayDOM(weatherObj.todayWeatherObj);
					domController.updateSevenDayForecast(weatherObj.forecastWeatherArray);
				}
			}
			catch(error){
				console.log(error);
			}	
		
		}
	});
};

export {staticListeners}