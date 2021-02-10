//import Icon from './icon.png';
//import Notes from './data.csv';
//import printMe from './print.js';
import './style.css';
import {staticListeners} from './staticListeners.js';

//a72226ceaa46bff6856874cd13357838


function theDomHasLoaded(e) {

	staticListeners();
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);


