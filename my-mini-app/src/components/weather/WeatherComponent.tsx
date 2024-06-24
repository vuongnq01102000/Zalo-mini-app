import React from "react";
import { useEffect, useState } from "react";
import { Progress } from "zmp-ui";


interface WeatherComponentProps {
    locationName: string;
  }
  
  export const WeatherComponent: React.FC<WeatherComponentProps> = ({ locationName }) => {
    const [temperature, setTemperature] = useState<number | null>(null);
  
    useEffect(() => {

      const fetchWeather = async () => {
        try {
            
        
          const response = await fetch(
            
            `https://api.openweathermap.org/data/2.5/weather?lat=15.5330997&lon=95.2188795&appid=f495085c1d8716b6220ec5681b8fb8c8&units=metric`
        );
          const data = await response.json();
          console.log(data);
          setTemperature(data.main.temp);
        } catch (err) {
          console.error("Error fetching weather data:", err);
        }
      };
  
      fetchWeather();
    }, [locationName]);
  
    return (
      <div>
        {temperature !== null ? (
          <p>Current temperature in {locationName} is: {temperature}&#8457;</p>
        ) : (
          <Progress completed={30} maxCompleted={100} trailColor="red"/>
        )}
      </div>
    );
  };