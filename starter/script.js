'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const card = `<article class="country ${className}">
<img class="country__img" src="${data.flags.svg}" />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    2
  )} people</p>
  <p class="country__row"><span>🗣️</span>${
    Object.values(data.languages)[0]
  }</p> 
  <p class="country__row"><span>💰</span>${
    Object.values(data.currencies)[0].name
  }</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', card);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
// Ajax call country 1
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

// Render country 1
// renderCountry(data);

//Get neighbour country (2)
// const neighbour = data.borders?.[0];

// Ajax call country 2
// const request2 = new XMLHttpRequest();
// request2.open(
//   'GET',
//   `https://restcountries.com/v3.1/alpha/${neighbour}
// `
// );
// request2.send();

// request2.addEventListener('load', function () {
//   const [data2] = JSON.parse(this.responseText);
//   console.log(data2);

// Render neighbour country
// renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('netherlands');
// getCountryAndNeighbour('germany');
// getCountryAndNeighbour('sweden');

// Callback hell
// setTimeout(() => {
//   console.log('1 second passed!');
//   setTimeout(() => {
//     console.log('2 second passed!');
//     setTimeout(() => {
//       console.log('3 second passed!');
//       setTimeout(() => {
//         console.log('4 second passed!');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const getCountry = function (country) {
// Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0]; //optional chaining

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       // console.log(data);
//       [data] = data;
//       renderCountry(data, 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥!`);
//       renderError(`💥💥Something went wrong💥💥, ${err.message}. Try Again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// getCountry('germany');

// btn.addEventListener('click', function () {
//   getCountry('germany');
// });

/*-------------------------
--------Challenge01--------
---------------------------
*/

const whereAmI = function (lat, lng) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${lat}&lon=${lng}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(
        `You are in ${data.features[0].properties.geocoding.city},${data.features[0].properties.geocoding.country}.`
      );

      return fetch(
        `https://restcountries.com/v3.1/name/${data.features[0].properties.geocoding.country}`
      );
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Country not found, ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message}💥💥`));
};

whereAmI(19.037, 72.873);
whereAmI(52.508, 13.381);
whereAmI(-33.933, 18.474);
/*
Test data: 
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude) 
§ Coordinates 2: 19.037, 72.873 
§ Coordinates 3: -33.933, 18.474
*/
