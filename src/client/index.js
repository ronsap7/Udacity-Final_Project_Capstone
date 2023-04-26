import './styles/style.scss';
import { fetchData } from './js/app';


const initializeApp = () => {
  const submitButton = document.getElementById('submit-btn');
  if (submitButton) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const location = document.getElementById('destination').value;
      const departureDate = document.getElementById("departure-date").value;
      const returnDate = document.getElementById("return-date").value;
      fetchData(location, departureDate, returnDate);
    });
  } else {
    console.error('Submit button not found.');
  }
};

document.addEventListener('DOMContentLoaded', initializeApp);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }
  