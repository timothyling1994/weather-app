import './style.css';
import {staticListeners} from './staticListeners.js';
import { requestAPI } from './requestAPI.js'
import { domController } from './domController.js'




function theDomHasLoaded(e) {

	staticListeners();
	defaultDisplay();

}

async function defaultDisplay(){
	let input = "San Francisco";
	let weatherObj = await requestAPI.requestHandler(input);
	domController.updateTodayDOM(weatherObj);
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


