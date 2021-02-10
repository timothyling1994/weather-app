let requestAPI = (() => {

	let apiKey = 'a72226ceaa46bff6856874cd13357838';

	const getLatLong = async (input) => {
		//if(input.contains(","))
		
		try
		{
			console.log("fetching lat/long");


			let payload = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`);
			let response = await payload.json();

			return response;
		}
		catch(error){
			console.log(error);
		}
	
	};

	const requestCityData = async (lat,long) => {
		try
		{
			console.log("fetching city data...");

			let payload = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely,hourly,alerts}&appid=${apiKey}`);
			let response = await payload.json();

			return response;
		}

		catch(error){
			console.log(error);
		}
	};

	const test = () =>{
		console.log("test");
	};

	return {getLatLong,requestCityData,test};
})();

export {requestAPI}