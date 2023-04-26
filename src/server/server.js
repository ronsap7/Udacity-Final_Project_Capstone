import express from 'express';
import axios from 'axios';

const app = express();
const weatherbitApiKey = '82587e6c132445248cf241e11979e301';
const weatherbitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const weatherResponse = await axios.get(`${weatherbitBaseUrl}?lat=${lat}&lon=${lon}&key=${weatherbitApiKey}`);
    res.json(weatherResponse.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app as server };
