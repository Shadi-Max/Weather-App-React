import React, { useState } from 'react'
import './styles.css'

function App() {

  const [data, setData] = useState ({});
  const [location, setLocation] = useState ('');
  const [error, setError] = useState('');

  //setting weather icon according to weather status

  const weatherImg =() => {
    if (data.weather && data.weather.length > 0) {
      if (data.weather[0].main === "Rain") {
        return 'src/assets/weather-icons/rainy.png';
      }
        else if (data.weather[0].main === "Clear") {
          return 'src/assets/weather-icons/clear.png';
      }
        else if (data.weather[0].main === "Drizzle" || data.weather[0].main === "Snow") {
          return 'src/assets/weather-icons/snowy.png';
      }
        else if (data.weather[0].main === "Clouds" && data.weather[0].description !== "few clouds") {
          return 'src/assets/weather-icons/cloudy.png';
      }
        else if (data.weather[0].main === "Clouds" && data.weather[0].description === "few clouds") {
          return 'src/assets/weather-icons/partly-cloudy.png';
      }
      else if (data.weather[0].main === "Haze" || data.weather[0].main === "Smoke" || data.weather[0].main === "Mist" || data.weather[0].main === "Fog") {
        return 'src/assets/weather-icons/misty.png';
      }
    }
      return '';
  };

// setting background color according to weather status

  const weatherBackground =() => {
    if (data.weather && data.weather.length > 0) {
      if (data.weather[0].main === "Rain") {
        return 'linear-gradient(70deg, rgba(137,223,255,1) 0%, rgba(0,127,255,1) 42%, rgba(0,101,189,1) 100%)';
      }
        else if (data.weather[0].main === "Clear") {
          return 'linear-gradient(129deg, rgba(51,173,215,1) 0%, rgba(51,168,201,1) 36%, rgba(254,216,109,1) 78%, rgba(252,214,107,1) 99%)';
      }
        else if (data.weather[0].main === "Drizzle" || data.weather[0].main === "Snow") {
          return 'linear-gradient(129deg, rgba(222,232,240,1) 0%, rgba(146,191,213,1) 35%, rgba(107,149,166,1) 69%, rgba(103,127,142,1) 98%)';
      }
        else if (data.weather[0].main === "Clouds" && data.weather[0].description !== "few clouds") {
          return 'linear-gradient(129deg, rgba(171,207,220,1) 0%, rgba(110,153,171,1) 28%, rgba(90,142,179,1) 64%, rgba(76,118,163,1) 99%)';
      }
        else if (data.weather[0].main === "Clouds" && data.weather[0].description === "few clouds") {
          return 'linear-gradient(129deg, rgba(222,232,240,1) 0%, rgba(156,190,224,1) 33%, rgba(48,174,226,1) 63%, rgba(225,227,108,1) 98%)';
      }
      else if (data.weather[0].main === "Haze" || data.weather[0].main === "Smoke" || data.weather[0].main === "Mist" || data.weather[0].main === "Fog") {
        return 'linear-gradient(129deg, rgba(110,123,134,1) 0%, rgba(85,141,187,1) 28%, rgba(129,161,177,1) 63%, rgba(117,126,136,1) 90%)';
      }
    }
    return '';
  };

// fetching Weather Api Data & handling error in case of entering an invalid city name in the input

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5a261def4f6f6beac87c89fcd32988e7&units=metric`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Invalid City Name');
          }
          return response.json();
        })
        .then((weatherData) => {
          setData(weatherData);
          setError('');
          console.log(weatherData);
        })
        .catch((error) => {
          console.error('Error fetching data', error);
          setError('Invalid City Name');
        });

      setLocation('');
    }
  };

  return (
   <div className='weather-app' style={{background: weatherBackground()}}>
    <div className="searchbar-container">
      <input
       value={location}
       onChange={event => setLocation(event.target.value)}
       onKeyDown={searchLocation}
       placeholder='Enter City Name'
       type='text'
       style={{ borderColor: error ? 'red' : '' }} // Apply red border if there's an error
       />
       <p style={{ color: 'red', fontSize: '0.8rem'}}>{error}</p>
    </div>

    <div className="weather-container"
      style={{ visibility: !error && data.name ? 'visible' : 'hidden' }} // Hide Weather container when entering website or in case of input error
      >
      <div className="primary-weather-data">
        <div className="weather-icon-info-container">
          <h3>{data.weather && data.weather[0].description}</h3>
          <img className='weather-Img' src={weatherImg()} alt="weather icon" />
        </div>
        <hr />
        <div className="weather-infos-right">
          <h2>{data.name}</h2>
          <h3>{data.sys && data.sys.country}</h3>
          <h1>{Math.round(data.main && data.main.temp)}°C</h1>
        </div>
      </div>

      <div className="secondary-weather-data">
        <div className="sec-weather-col">
          <h2>{Math.round(data.main && data.main.feels_like)}°C</h2>
          <h4>Feels Like</h4>
        </div>
        <div className="sec-weather-col">
          <h2>{data.main && data.main.humidity} %</h2>
          <h4>Humidity</h4>
        </div>
        <div className="sec-weather-col">
          <h2>{Math.round(data.wind && data.wind.speed)} k/h</h2>
          <h4>Winds</h4>
        </div>
      </div>

    </div>

   </div>
  )
}

export default App
