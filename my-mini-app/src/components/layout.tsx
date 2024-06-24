
import React from "react";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import {Box } from "zmp-ui";
import HomePage from "pages/index";
import UserPage from "pages/user";
import { Navigation } from "./navigation";
import { PostPage } from "pages/post";
import { WeatherPage } from "pages/weather";




export const Layout : FC = () => {
    return (
        <Box className="h-screnn">

                <Routes>
                    <Route path="/" element = {<HomePage/>}></Route>
                    <Route path="/user" element = {<UserPage/>}></Route>
                    <Route path="/weather" element = {<WeatherPage/>}></Route>
                    <Route path="/post" element = {<PostPage/>}></Route>
                </Routes>
                <Navigation/>
        </Box>
    );
}