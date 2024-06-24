import { CardWeather } from "components/weather/card_weather";
import React from "react";
import { Page } from "zmp-ui";


export const WeatherPage = () => {
    return (
        <Page >
           <CardWeather></CardWeather>
        </Page>
    );
}