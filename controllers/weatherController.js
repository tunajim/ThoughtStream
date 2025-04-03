export const fetchWeather = async (location, res) => {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country}&appid=${process.env.WEATHER_API_KEY}`);
		const data = await response.json();
	
		return {
			condition: data.weather[0].description,
			temperature: kelvinToFahrenheit(data.main.temp),
			location: {
				city: location.city,
				country: location.country
			}
		};
	  } catch (error) {
		console.error(error);
		return null;
	  }
};


/**
 *  Kelvin -> Fahrenheit 
 *  ℉=((K-273.15)*1.8)+32  (from w3schools)
 */
function kelvinToFahrenheit(kelvin) {
	return Math.round((kelvin - 273.15) * 1.8 + 32);
}