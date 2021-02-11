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
		let payload1 = await requestAPI.getLatLong(city_search);

		let payload2 = await requestAPI.getCityData(payload1.coord.lat,payload1.coord.lon);

		console.log(payload1);
		console.log(payload2);

		let currentWeatherObj = createCurrentWeatherObj(payload1,payload2);
		let forecastWeatherArray = createForecastWeatherObj(payload2);

		//forecastWeatherArray.forEach((day)=>console.log(day));

		return {currentWeatherObj,forecastWeatherArray};

	};

	const createForecastWeatherObj = (payload2) =>{
		let forecastArray = [];


		//skip current day weather
		for (let i = 1;i<8;i++)
		{
			//console.log(payload2.daily[i].weather[0].description);
			//console.log(payload2.daily[i].temp.min);
			//console.log(payload2.daily[i].temp.max);

			let description = payload2.daily[i].weather[0].description;
			let temp_min = payload2.daily[i].temp.min;
			let temp_max = payload2.daily[i].temp.max;

			let forecastObj = {
				description,
				temp_min,
				temp_max
			}

			forecastArray.push(forecastObj);

		}

		return forecastArray;
	};

	const createCurrentWeatherObj = (payload1,payload2) => {

		let current_description = payload2.current.weather[0].description;
		let current_main_descrip = payload2.current.weather[0].main;
		let current_temp = payload2.current.temp;
		let current_feels_like = payload2.current.feels_like;
		let current_temp_min = payload2.daily[0].temp.min;
		let current_temp_max = payload2.daily[0].temp.max;
		let current_name = payload1.name;
		let current_country = payload1.sys.country;
		/*let current_temp_min = payload1.main.temp_min;
		let current_temp_max = payload1.main.temp_max;
		let current_name = payload1.name;
		let current_country = payload1.sys.country;*/


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