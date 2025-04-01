export const fetchWeather = async (location, res) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`);
		const data = await response.json();
	
		return {
			condition: "SUCCESS",
			temperature: 10,
			location: "SUCCESS",
		};
	  } catch (error) {
		console.error(`: ${error}`);
		return null;
	  }
};
