import axios from 'axios';


const geonamesBaseUrl = 'https://api.geonames.org/searchJSON';
const geonamesApiKey = 'rhnsapate16';

const weatherbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherbitApiKey = 'b850f7d3b0054b28a93323d17a3c5b96';

const pixabayBaseUrl = 'https://pixabay.com/api/';
const pixabayApiKey = '35773570-bc482719da0d4df59e26d87b9';


const travelData = {
    location: '',
    latitude: 0,
    longitude: 0,
    weather: {},
    imageUrl: '',
    departureDate: "",
    returnDate: "",
  };

  
  const fetchData = async (location, departureDate, returnDate) => {
    try {
      // Fetch Geonames data
      const geoResponse = await axios.get(`${geonamesBaseUrl}?q=${location}&maxRows=1&username=${geonamesApiKey}`);
      const geoData = geoResponse.data.geonames[0];
  
      travelData.location = `${geoData.name}, ${geoData.countryName}`;
      travelData.latitude = geoData.lat;
      travelData.longitude = geoData.lng;
  
      // Fetch Weatherbit data
      const weatherResponse = await axios.get(`${weatherbitBaseUrl}?lat=${travelData.latitude}&lon=${travelData.longitude}&key=${weatherbitApiKey}`);
    //   const weatherResponse = await axios.get(`/weather?lat=${travelData.latitude}&lon=${travelData.longitude}`);
      const weatherData = weatherResponse.data.data[0];
  
      travelData.weather = {
        description: weatherData.weather.description,
        temperature: weatherData.temp,
      };
  
      // Fetch Pixabay data
      const pixabayResponse = await axios.get(`${pixabayBaseUrl}?key=${pixabayApiKey}&q=${encodeURIComponent(travelData.location)}`);
      const imageData = pixabayResponse.data.hits[0];
  
      // Check if there's an image result
      if (pixabayResponse.data.hits.length > 0) {
        travelData.imageUrl = imageData.webformatURL;
      } else {
        console.log('No images found for the given location.');
        travelData.imageUrl = ''; // You can provide a default image URL if needed
      }
    
      travelData.departureDate = departureDate;
      travelData.returnDate = returnDate;

    console.log(travelData);

    updateUI();
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateUI = () => {
    const tripDetails = document.getElementById('trip-details');
  
    const locationElement = document.createElement('p');
    locationElement.textContent = `Location: ${travelData.location}`;
  
    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${travelData.weather.temperature} °C`;

    const weatherDescriptionElement = document.createElement('p');
    weatherDescriptionElement.textContent = `Weather-Forecast: ${travelData.weather.description}`;
  
    const imageElement = document.createElement('img');
    imageElement.src = travelData.imageUrl;
    imageElement.alt = `Image of ${travelData.location}`;

    const departureDateElement = document.createElement("p");
  departureDateElement.textContent = `Departure Date: ${travelData.departureDate}`;
  tripDetails.appendChild(departureDateElement);

    // Create and append the return date element
    const returnDateElement = document.createElement("p");
    returnDateElement.textContent = `Return Date: ${travelData.returnDate}`;
    tripDetails.appendChild(returnDateElement);
  
    tripDetails.innerHTML = '';
    tripDetails.appendChild(locationElement);
    tripDetails.appendChild(temperatureElement);
    tripDetails.appendChild(imageElement);
    tripDetails.appendChild(weatherDescriptionElement);
    tripDetails.appendChild(departureDateElement);
    tripDetails.appendChild(returnDateElement);
    
    console.log('Image URL:', travelData.imageUrl);
  };
  
  export { fetchData };
