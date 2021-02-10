import {requestAPI} from './requestAPI.js'

let staticListeners = () => {

	let city_search = document.querySelector("#city-search");
	city_search.addEventListener("keyup",function(event){
		if(event.keyCode === 13 && city_search.value != ""){
			requestAPI(city_search.value);
		}
	});
}

export {staticListeners}