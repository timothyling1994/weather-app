let requestAPI = (() => {

	let apiKey = 'a72226ceaa46bff6856874cd13357838';

	let weatherConditionsIconCodeMap = {
		"Thunderstorm":"11d",
		"Drizzle":"09d",
		"Snow":"13d",
		"Atmosphere":"50d",
		"Clear":"01d",
		"Mist":"50d",
		"Smoke":"50d",
		"Haze":"50d",
		"Dust":"50d",
		"Fog":"50d",
		"Sand":"50d",
		"Ash":"50d",
		"Squall":"50d",
		"Tornado":"50d",
		"Rain":{
			"light rain":"10d",
			"moderate rain":"10d",
			"heavy intensity rain":"10d",
			"very heavy rain":"10d",
			"extreme rain":"10d",
			"freezing rain":"13d",
			"light intensity shower rain":"09d",
			"shower rain":"09d",
			"heavy intensity shower rain":"09d",
			"ragged shower rain":"09d"
		},
		"Clouds":{
			"few clouds":"02d",
			"scattered clouds":"03d",
			"broken clouds":"04d",
			"overcast clouds":"04d"
		}
	}

	const requestLatLong = async (input) => {
		
		try
		{
			console.log("fetching lat/long");

			let payload = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`);

			let response = await payload.json();

			return response;
		}

		//catching network/permission issues, rejects promise
		catch(error){
			throwError(error);
		}
	
	};

	const requestCityData = async (lat,long) => {
		try
		{
			console.log("fetching city data...");

			let payload = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=imperial`);
			let response = await payload.json();

			return response;
		}

		//catching network/permission issues
		catch(error){
			throwError(error);
		}
	};

	const requestHandler = async (city_search) =>{
		let payload1;
		let payload2;
		let todayWeatherObj;
		let forecastWeatherArray;

		try {
			payload1 = await requestAPI.requestLatLong(city_search);
			if (payload1.cod == '404')
			{
				return throwError("City Not Found!");
			}
			else
			{
				payload2 = await requestAPI.requestCityData(payload1.coord.lat,payload1.coord.lon);
				console.log("Payload 1: "+ payload1);
				console.log("Payload 2: "+payload2);
				todayWeatherObj = createtodayWeatherObj(payload1,payload2);
				forecastWeatherArray = createForecastWeatherObj(payload2);
			}
		} 
		catch (error){
			throwError(error);
		}
		
		//forecastWeatherArray.forEach((day)=>console.log(day));

		return {todayWeatherObj,forecastWeatherArray};

	};

	const throwError = (msg) => {
		return Promise.reject("Rejected due to: " + msg);
	};

	const createForecastWeatherObj = (payload2) =>{
		let forecastArray = [];


		//skip current day weather
		for (let i = 1;i<8;i++)
		{

			let main_description = payload2.daily[i].weather[0].main;
			let description = payload2.daily[i].weather[0].description;
			let temp_min = payload2.daily[i].temp.min;
			let temp_max = payload2.daily[i].temp.max;
			let icon_code;

			if(main_description != 'Rain' && main_description != 'Clouds')
			{

				icon_code=weatherConditionsIconCodeMap[main_description];
			}
			else
			{
				icon_code=weatherConditionsIconCodeMap[main_description][description];
			}

			let forecastObj = {
				description,
				temp_min,
				temp_max,
				icon_code
			}

			forecastArray.push(forecastObj);

		}

		return forecastArray;
	};

	const createtodayWeatherObj = (payload1,payload2) => {

		let current_description = payload2.current.weather[0].description;
		let current_main_descrip = payload2.current.weather[0].main;
		let current_temp = payload2.current.temp;
		let current_feels_like = payload2.current.feels_like;
		let current_temp_min = payload2.daily[0].temp.min;
		let current_temp_max = payload2.daily[0].temp.max;
		let current_name = payload1.name;
		let current_country = payload1.sys.country;

		let icon_code;


		if(current_main_descrip != 'Rain' && current_main_descrip != 'Clouds')
		{

			icon_code=weatherConditionsIconCodeMap[current_main_descrip];
		}
		else
		{
			icon_code=weatherConditionsIconCodeMap[current_main_descrip][current_description];
		}

		let todayWeatherObj = {

			current_description,
			current_temp,
			current_feels_like,
			current_temp_min,
			current_temp_max,
			current_name,
			current_main_descrip,
			current_country,
			icon_code,
		};

		return todayWeatherObj;
	};

	return {requestLatLong,requestCityData,requestHandler};
})();

export {requestAPI}