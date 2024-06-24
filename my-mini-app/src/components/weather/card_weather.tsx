
import React, { useEffect, useState } from "react";
import { Box, Header, List, Swiper, Tabs, Text } from "zmp-ui";
import { WeatherComponent } from "./WeatherComponent";


const listCountry = [
    {   
        id: 0,
        alt: "Viet Nam Flag",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg",
        name:  "Viet Nam",
    },
    {   
        id: 1,
        alt: "Russia",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg",
        name:  "Russia",
    },
    {
        id:2,
        alt: "Cuba",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/CU.svg",
        name:  "Cuba",
    },
    {
        id:3,
        alt: "Japan",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg",
        name:  "Japan",
    },
    {   
        id:4,
        alt: "Korea",
        src: "http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg",
        name:  "Korea",
    },
];

 

export const CardWeather = () => {
    
        const [valueLocationName, setValueLocationName] = useState("");

        
        return (
            <Box className="weatherCardTheme" >
                    <Tabs
                    onChange={(value) => {
                        console.log(listCountry[Number.parseInt(value)].name);
                        setValueLocationName(listCountry[Number.parseInt(value)].name);
                        
                    }}
                    
                    defaultActiveKey={listCountry[0].id.toString()}
                    >
                    {(listCountry.map((it) => 
                           <Tabs.Tab 
                           key={it.id}
                           label= {<Box flex flexDirection="column" alignContent="center" >
                                    <img src={it.src} alt={it.alt}  width={30} height={30}/>
                                    <Box height={5}></Box>
                                    <Text.Title type="xSmall">{it.name}</Text.Title>
                                    </Box>}
                            
                        >
                           <Box flex justifyContent="center">
                            <Text.Title>{it.name}</Text.Title>
                           </Box>
                            <WeatherComponent locationName = {valueLocationName}></WeatherComponent>
                           </Tabs.Tab>
                        ))}
                    </Tabs>
            </Box>
        );

}