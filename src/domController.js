let domController = (() => {

	const clearDOM = () => {

		let main_content = document.querySelector("#main-content");
		let forecast_content = document.querySelector("#forecast-content");

		function removeAllChildren(parentNode){
			while(parentNode.children[0])
			{
				parentNode.removeChild(parentNode.children[0]);
			}
		};

		removeAllChildren(main_content);
		removeAllChildren(forecast_content);

	

		
		//flex_container.removeChild(futureForecast);

	};

	const updateTodayDOM = (weatherObj) => {
		clearDOM();

		let description = document.createTextNode(weatherObj.current_description.toUpperCase());
		let temp = document.createTextNode(Math.round(parseFloat(weatherObj.current_temp))+'\u00B0'+' F');
		let feels_like = document.createTextNode('FEELS LIKE: '+Math.round(parseFloat(weatherObj.current_feels_like))+'\u00B0'+' F');
		let temp_min = document.createTextNode('LOW: '+Math.round(parseFloat(weatherObj.current_temp_min))+'\u00B0'+' F');
		let temp_max = document.createTextNode('HIGH: '+Math.round(parseFloat(weatherObj.current_temp_max))+'\u00B0'+' F');
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

	const updateSevenDayForecast = (forecastArray) => {

		let forecast_content_div = document.querySelector("#forecast-content");

		for(let i=0;i<forecastArray.length;i++)
		{

			let day_text = document.createTextNode("DAY: " + i);
			let description_text = document.createTextNode(forecastArray[i].description.toUpperCase());
			let temp_min_text = document.createTextNode("LOW: "+Math.round(parseFloat(forecastArray[i].temp_min))+'\u00B0'+' F');
			let temp_max_text = document.createTextNode("HIGH: "+Math.round(parseFloat(forecastArray[i].temp_max))+'\u00B0'+' F');

			let day_div = document.createElement("div");
			day_div.setAttribute("class","day");
			day_div.appendChild(day_text);

			let forecast_description_div = document.createElement("div");
			forecast_description_div.setAttribute("class","forecast-description");
			forecast_description_div.appendChild(description_text);

			let forecast_min_temp_div = document.createElement("div");
			forecast_min_temp_div.setAttribute("class","forecast-min-temp");
			forecast_min_temp_div.appendChild(temp_min_text);

			let forecast_max_temp_div = document.createElement("div");
			forecast_max_temp_div.setAttribute("class","forecast-max-temp");
			forecast_max_temp_div.appendChild(temp_max_text);

			let day_container_div = document.createElement("div");
			day_container_div.setAttribute("class","day-container");
			day_container_div.appendChild(day_div,day_container_div);
			day_container_div.appendChild(forecast_description_div,day_container_div);
			day_container_div.appendChild(forecast_min_temp_div,day_container_div);
			day_container_div.appendChild(forecast_max_temp_div,day_container_div);

			forecast_content_div.appendChild(day_container_div,forecast_content_div);

		}
		
	};

	return{updateTodayDOM,updateSevenDayForecast};

})();

export{domController}