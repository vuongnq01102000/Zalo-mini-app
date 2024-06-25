import React, { FC, useEffect, useState } from "react";
import { Convert, LocationData } from "types/Location";
import { Box, Page, Spinner, Tabs, Text } from "zmp-ui";

const listCountry = [
    {
        id: 0,
        alt: "Viet Nam Flag",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg",
        name: "Viet Nam",
    },
    {
        id: 1,
        alt: "Russia",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg",
        name: "Russia",
    },
    {
        id: 2,
        alt: "Cuba",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/CU.svg",
        name: "Cuba",
    },
    {
        id: 3,
        alt: "Japan",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg",
        name: "Japan",
    },
    {
        id: 4,
        alt: "Korea",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg",
        name: "Korea",
    },
];

export function TabBarWeather({ onChangeTab }) {
    const [valueLocationName, setValueLocationName] = useState("");

    return (
        <Tabs
            onChange={(value) => {
                const selectedLocationName = listCountry[Number.parseInt(value)].name;
                console.log(selectedLocationName);
                setValueLocationName(selectedLocationName);
                onChangeTab(selectedLocationName); // Gọi hàm cập nhật từ props
            }}
            defaultActiveKey={listCountry[0].id.toString()}
        >
            {listCountry.map((it, index: React.Key) => (
                <Tabs.Tab
                    key={index}
                    label={
                        <Box flex flexDirection="column" alignContent="center">
                            <img src={it.src} alt={it.alt} width={30} height={30} />
                            <Box height={5}></Box>
                            <Text.Title type="xSmall">{it.name}</Text.Title>
                        </Box>
                    }
                ></Tabs.Tab>
            ))}
        </Tabs>
    );
}

export const CardWeather: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState(listCountry[0].name);
    const [weatherData, setWeatherData] = useState<LocationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const key = import.meta.env.VITE_REACT_APP_API_KEY_WEATHER;
                if (!key) {
                    throw new Error("VITE_API_KEY_WEATHER is not defined");
                }

                const response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${key}&q=${selectedLocation}&aqi=no`
                );
                const data = await response.json();

                console.log("Response JSON:", data);

                // Assuming that Convert.toLocation expects a JSON string
                const res = Convert.toLocation(JSON.stringify(data));

                setWeatherData(res);
                console.log("Converted Location:", res);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedLocation]);

    return (
        <Box>
            <TabBarWeather onChangeTab={setSelectedLocation} />
            <Page className="weatherCardDetail" hideScrollbar={true}>
                 {isLoading == true ? (
                    <Box flex flexDirection="column" alignContent="center">
                        <Spinner visible={isLoading} />
                    </Box>
                ) : (
                    <>

                            {weatherData && (
                                <div style={{
                                    backgroundColor : "white",
                                    borderRadius: "5%",
                                    padding: "5%",
                                    margin: "3%",
                                    
                                }}> 
                                    <Box flex  justifyContent="center" ><Text.Title size="xLarge">{weatherData.current.temp_c}°C</Text.Title></Box>
                                    <Box flex  justifyContent="center" ><Text.Title size="normal">
                                    {weatherData.location.name},{" "}
                                    {weatherData.location.region},{" "}
                                    {weatherData.location.country}
                                        </Text.Title></Box>
                                        <Box flex  justifyContent="center" ><Text.Title size="small">
                                    {weatherData.location.localtime}
                                        </Text.Title></Box>

                                      
                                    <Box  flex  justifyContent="space-between" alignContent="center"  pt={5}>
                                        <Box  flex flexDirection="column" alignContent="flex-start" >
                                            
                                            <Box flex  justifyContent="center" flexDirection="row" >
                                                <Text.Title size="small">Condition:</Text.Title> 
                                                <Box ml={1}><Text size="normal">{weatherData.current.condition.text}</Text></Box>
                                            </Box>
                                            <Box flex  justifyContent="center" flexDirection="row" >
                                                <Text.Title size="small">Wind:</Text.Title> 
                                                <Box ml={1}><Text size="normal"> 
                                                {weatherData.current.wind_kph} kph (
                                                    {weatherData.current.wind_dir})
                                                    </Text></Box>
                                            </Box>
                                            <Box flex  justifyContent="center" flexDirection="row" >
                                                <Text.Title size="small">Humidity:</Text.Title> 
                                                <Box ml={1}><Text size="normal"> {weatherData.current.humidity}%</Text></Box>
                                            </Box>
                                            
                                        </Box>
                                        <Box>
                                            <img src={weatherData.current.condition.icon} alt="cat" width={80}/>
                                        </Box>
                                    </Box>
                                    
                                </div>
                            )}
                    </> 
              )} 

               
            </Page>
        </Box>
    );
};
