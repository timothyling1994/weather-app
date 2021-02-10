async function requestAPI(input){
	let apiKey = 'a72226ceaa46bff6856874cd13357838';
	//if(input.contains(","))
	{
		try{
			console.log("fetching...");
			let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`);
			let json = await response.json();
			console.log(json);
		}
		catch(error){
			console.log(error);
		}
	}
};

export {requestAPI}