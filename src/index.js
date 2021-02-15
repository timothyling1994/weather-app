import './style.css';
import { staticListeners } from './staticListeners.js';
import { requestAPI } from './requestAPI.js';
import { domController } from './domController.js';

function theDomHasLoaded(e) {

	defaultDisplay();
	staticListeners();

}

async function defaultDisplay(){

	let default_value = "San Francisco";
	let weatherObj = await requestAPI.requestHandler(default_value);

	domController.updateTodayDOM(weatherObj.todayWeatherObj);
	domController.updateSevenDayForecast(weatherObj.forecastWeatherArray);
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


