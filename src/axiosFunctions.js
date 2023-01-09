import React from 'react';
import axios, * as others from 'axios';

const getCitiesAPICall = (successHandler, errorHandler) => {
    axios
        .get("https://countriesnow.space/api/v0.1/countries")
        .then(function (response) {
            let cities = [];
            let data = response.data.data;

            data.forEach((element) => {
                let array = element.cities;
                cities = cities.concat(array);
            });

            cities.sort();
            successHandler(cities);
        })
        .catch(function (error) {
            errorHandler(error)
        });

};

const getCityInformation = (town, successHandler, errorHandler) => {
    const api_key = 'c7e0b19dfb6b4ea7ace84900230301';

    axios({
        method: 'get',
        url: `http://api.weatherapi.com/v1/current.json`,
        params: {
            key: api_key,
            q: town
        }
    })
        .then(function (response) {
            successHandler(response);
        })
        .catch(function (error) {
            errorHandler(error)
        });
};

const getWeatherIcon = (weather, code, successHandler) => {
    const api_key = 'c7e0b19dfb6b4ea7ace84900230301';

    axios({
        method: 'get',
        url: `https://www.weatherapi.com/docs/weather_conditions.json`,
        params: {
            key: api_key
        }
    })
        .then(function (response) {
            let data = response.data;

            const currentElement = data.find(element => {
                return element.code === code;
            });

            successHandler(currentElement);
        });
}

export { getCitiesAPICall, getCityInformation, getWeatherIcon };