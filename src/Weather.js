import React, { useState } from "react";
import { TextField } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  getCitiesAPICall,
  getCityInformation,
  getWeatherIcon,
} from "./axiosFunctions";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

function Weather() {
  const [list, setList] = useState([]);
  const [reducedList, setReducedList] = useState([]);
  const [value, setValue] = useState("");
  const [cityWeatherInfo, setCityWeatherInfo] = useState({
    name: "",
    temp_c: "",
    feelslike_c: "",
    text: "",
    icon: "",
    wind_kph: "",
    code: "",
  });
  const [retrievedIconName, setRetrievedIconName] = useState("");

  const [t] = useTranslation();
  console.log(i18n.language);

  const filterOptions = createFilterOptions({
    limit: 15,
  });

  const errorHandler = (error) => {
    console.error(error);
  };

  const successHandler = (cities) => {
    if (list.length === 0) {
      setList(cities);
      setReducedList(cities);
    }
  };

  const handleFocus = () => {
    getCitiesAPICall(successHandler, errorHandler);
  };

  const onChange = (event, newValue) => {
    setValue(newValue.toLowerCase());
    const reducedListToSet = list.filter((city) =>
      city.toLowerCase().includes(newValue)
    );

    setReducedList(reducedListToSet);

    const city = list.filter(
      (city) => city.toLowerCase() == newValue.toLowerCase()
    );

    const town = city.length >= 1 ? city[0] : "";

    if (town) {
      getCityInformation(town, handleCityWeather, errorHandler);
    }
  };

  const handleCityWeather = (response) => {
    const {
      location,
      current: { feelslike_c, temp_c, wind_kph, condition },
    } = response.data;

    setCityWeatherInfo({
      name: location.name,
      temp_c: temp_c,
      feelslike_c: feelslike_c,
      text: condition.text,
      icon: condition.icon,
      wind_kph: wind_kph,
      code: condition.code,
    });

    getWeatherIcon(condition.text, condition.code, weatherIconSuccess);
  };

  const weatherIconSuccess = (result) => {
    console.log(result.icon);
    console.log(`/src/icon/${result.icon}.png`);
    setRetrievedIconName(result.icon);
  };

  return (
    <div className="container">
      <Autocomplete
        filterOptions={filterOptions}
        disablePortal
        id="cities-field"
        options={reducedList}
        onChange={onChange}
        onInputChange={onChange}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            onFocus={handleFocus}
            {...params}
            value={value}
            label="Weather"
          />
        )}
      />
      <h1>{cityWeatherInfo.name}</h1>
      {cityWeatherInfo.temp_c && (
        <h4>
          {t("temperature")} {cityWeatherInfo.temp_c} ℃
        </h4>
      )}
      {cityWeatherInfo.feelslike_c && (
        <h4>
          {t("feelsLike")} {cityWeatherInfo.feelslike_c} ℃
        </h4>
      )}
      {cityWeatherInfo.text && (
        <h4>
          {t("weatherCondition")} {cityWeatherInfo.text}
        </h4>
      )}
      {retrievedIconName && cityWeatherInfo.icon && (
        <h4>
          {t("weatherIcon")}{" "}
          {<img src={require(`./icon/${retrievedIconName}.png`)} alt={"ss"} />}
        </h4>
      )}
      {cityWeatherInfo.wind_kph && (
        <h4>
          {t("windSpeed")} {cityWeatherInfo.wind_kph} km/h
        </h4>
      )}
    </div>
  );
}

export default Weather;
