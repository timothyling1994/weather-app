import './style.css';
import {staticListeners} from './staticListeners.js';
import { requestAPI } from './requestAPI.js'
import { domController } from './domController.js'




function theDomHasLoaded(e) {

	defaultDisplay();
	staticListeners();

}

async function defaultDisplay(){
	let input = "San Francisco";
	let weatherObj = await requestAPI.requestHandler(input);

	domController.updateTodayDOM(weatherObj.currentWeatherObj);
	domController.updateSevenDayForecast(weatherObj.forecastWeatherArray);
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


