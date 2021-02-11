let domController = (() => {

	const clearDOM = () => {

		let main_content = document.querySelector("#main-content");
		let weather_info = document.querySelector("#weather-info");
		let futureForecast = document.querySelector("#future-forecast");

		console.log(weather_info);
		
		if(weather_info != null)
		{
			main_content.removeChild(weather_info);
		}
		
		//flex_container.removeChild(futureForecast);

	};

	const updateTodayDOM = (weatherObj) => {

		clearDOM();

		let description = document.createTextNode(weatherObj.current_description.toUpperCase());
		let temp = document.createTextNode(Math.round(parseInt(weatherObj.current_temp))+'\u00B0'+' F');
		let feels_like = document.createTextNode('FEELS LIKE: '+Math.round(parseInt(weatherObj.current_feels_like))+'\u00B0'+' F');
		let temp_min = document.createTextNode('LOW: '+Math.round(parseInt(weatherObj.current_temp_min))+'\u00B0'+' F');
		let temp_max = document.createTextNode('HIGH: '+Math.round(parseInt(weatherObj.current_temp_max))+'\u00B0'+' F');
		let name = document.createTextNode(weatherObj.current_name.toUpperCase()+', ' + weatherObj.current_country.toUpperCase());

		let new_weather_info = document.createElement("div");
		new_weather_info.setAttribute("id","weather-info");

		let description_div = document.createElement("div");
		description_div.setAttribute("id","description");
		description_div.appendChild(description);

		let city_div = document.createElement("div");
		city_div.setAttribute("id","city-name");
		city_div.appendChild(name);

		let temp_container = document.createElement("div");
		temp_container.setAttribute("id","temp-container");

		let flex_item_1 = document.createElement("div");
		flex_item_1.setAttribute("id","flex-item-1");

		let temp_div = document.createElement("div");
		temp_div.setAttribute("id","temp");
		temp_div.appendChild(temp);

		flex_item_1.appendChild(temp_div,flex_item_1);

		temp_container.appendChild(flex_item_1,temp_container);

		let divider_div = document.createElement("div");
		divider_div.setAttribute("id","divider");

		temp_container.appendChild(divider_div,temp_container);

		let flex_item_2 = document.createElement("div");
		flex_item_2.setAttribute("id","flex-item-2");

		let feels_like_div = document.createElement("div");
		feels_like_div.setAttribute("id","feels-like");
		feels_like_div.appendChild(feels_like);

		let max_temp_div = document.createElement("div");
		max_temp_div.setAttribute("id","max-temp");
		max_temp_div.appendChild(temp_max);

		let min_temp_div = document.createElement("div");
		min_temp_div.setAttribute("id","min-temp");
		min_temp_div.appendChild(temp_min);

		flex_item_2.appendChild(feels_like_div,flex_item_2);
		flex_item_2.appendChild(max_temp_div,flex_item_2);
		flex_item_2.appendChild(min_temp_div,flex_item_2);

		temp_container.appendChild(flex_item_2,temp_container);
		
		new_weather_info.appendChild(description_div,new_weather_info);
		new_weather_info.appendChild(city_div,new_weather_info);
		new_weather_info.appendChild(temp_container,new_weather_info);



		let main_content = document.querySelector("#main-content");
		main_content.appendChild(new_weather_info,main_content);
	};

	const updateFutureData = () => {

	};

	return{updateTodayDOM,updateFutureData};

})();

export{domController}