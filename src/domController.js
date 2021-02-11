let domController = (() => {

	const clearDOM = () => {

		let flex_container = document.querySelector("#flex-container");
		let weather_info = document.querySelector("#weather-info");
		let futureForecast = document.querySelector("#future-forecast");

		flex_container.removeChild(weather_info);
		flex_container.removeChild(futureForecast);

	};

	const updateTodayDOM = (weatherObj) => {

		clearDOM();

		let description = document.createTextNode(weatherObj.current_description);
		let temp = document.createTextNode(weatherObj.current_temp);
		let feels_like = document.createTextNode(weatherObj.current_feels_like);
		let temp_min = document.createTextNode(weatherObj.current_temp_min);
		let temp_max = document.createTextNode(weatherObj.current_temp_max);
		let name = document.createTextNode(weatherObj.current_name);

		let new_weather_info = document.createElement("div");
		new_weather_info.setAttribute("id","weather-info");

		new_weather_info.appendChild(description);
		new_weather_info.appendChild(name);
		new_weather_info.appendChild(temp);
		new_weather_info.appendChild(feels_like);
		new_weather_info.appendChild(temp_min);
		new_weather_info.appendChild(temp_max);

		let flex_container = document.querySelector("#flex-container");
		flex_container.appendChild(new_weather_info,flex_container);
	};

	const updateFutureData = () => {

	};

	return{updateTodayDOM,updateFutureData};

})();

export{domController}