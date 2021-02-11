import { domController } from './domController.js'

let requestAPI = (() => {

	let apiKey = 'a72226ceaa46bff6856874cd13357838';

	const getLatLong = async (input) => {
		//if(input.contains(","))
		
		try
		{
			console.log("fetching lat/long");


			let payload = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`);
			let response = await payload.json();

			return response;
		}
		catch(error){
			console.log(error);
		}
	
	};

	const getCityData = async (lat,long) => {
		try
		{
			console.log("fetching city data...");

			let payload = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=imperial`);
			let response = await payload.json();

			return response;
		}

		catch(error){
			console.log(error);
		}
	};

	const requestHandler = async (city_search) =>{
		let payload = await requestAPI.getLatLong(city_search);

		let weather_data = await requestAPI.getCityData(payload.coord.lat,payload.coord.lon);

		console.log(payload);
		console.log(weather_data);

		let weatherObj = createWeatherObj(payload,weather_data);

		return weatherObj;

	};

	const createWeatherObj = (payload,weather_data) => {

		let current_description = weather_data.current.weather[0].description;
		let current_main_descrip = weather_data.current.weather[0].main;
		let current_temp = weather_data.current.temp;
		let current_feels_like = weather_data.current.feels_like;
		let current_temp_min = payload.main.temp_min;
		let current_temp_max = payload.main.temp_max;
		let current_name = payload.name;
		let current_country = payload.sys.country;


		let currentWeatherObj = {

			current_description,
			current_temp,
			current_feels_like,
			current_temp_min,
			current_temp_max,
			current_name,
			current_main_descrip,
			current_country
		};

		return currentWeatherObj;
	};

	return {getLatLong,getCityData,requestHandler};
})();

export {requestAPI}