import React from "react";
import { useContext } from "react";
import WeatherContext from "../Context/WeatherContext";

const Input = () =>{
    const {getData,temp} = useContext(WeatherContext)
    const value = "hello World";
    return(
        <>
            <>{(temp == "")? value : temp.list[0].main.temp}</>
        </>
    )
}

export default Input;