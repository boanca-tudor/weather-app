# Lit Weather Widget

The WeatherWidget is a custom web component built using the Lit library. It fetches and displays weather data including current, hourly, and daily forecasts. The component relies on the OpenMeteo API to retrieve weather information based on latitude and longitude.

## Features

- **Fetch Weather Data:** Retrieves current, hourly, and daily weather data based on provided latitude and longitude.
- **Displays weather information:** Displays the weather info for the current day, including minimum and maximum temperatures, and hourly forecasts.
- **Dynamic Rendering:** Renders weather data dynamically based on the fetched information, using Lit's reactive properties and state management to update the UI.
- **Modular Components:** Integrates other custom Lit components for displaying hourly and daily weather data, respectively.

## Properties

- **lat:** Latitude of the location for which weather data is to be fetched *(type: number)*.
- **long:** Longitude of the location for which weather data is to be fetched *(type: number)*.

## States

- **_weatherInfoAvailable:** Indicates whether weather information is available.
- **_hourlyInfo:** Array holding hourly weather data.
- **_dailyInfo:** Array holding daily weather data.
- **_currentInfo:** Object holding current weather information.
- **_timeZone:** String holding the time zone for the given geographic coordinates.

## Usage

1. Import the `weather-widget` component.
2. Place the `<weather-widget>` tag in your HTML file giving it the lat and long parameters.
3. To display/update the widget, click the 'Get weather Forecast' button.

 
