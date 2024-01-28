import React, { useEffect } from "react";
import { useState, useContext } from 'react';
import sun from '../Images/sun.png'
import snow from '../Images/snow.png'
import rain from '../Images/rain.png'
import WeatherContext from "../Context/WeatherContext";
const Left = () =>{
    const [city,setCity] = useState("");
    const {handleKeyUp,setName,cordinates,name,temp,today} = useContext(WeatherContext);
    const [temperature,setTemperature] = useState({temp: '12',desc: 'Mostly Cloudly'});
    const [location,setLocation] = useState({city: "Mumbai" ,state: 'Maharashtra',country: 'India'});
    const [img,setImg] = useState(sun);

    useEffect(() =>{
        if(temp != 0){
            const type = temp.list[0].weather[0].main
            if(type === 'Clouds'){
                setImg(snow);
                console.log("Entered snow")
            }
            else if(type === 'Mist'){
                setImg(mist);
                console.log("Entered mist")
            }
            else if(type === 'Rain'){
                setImg(rain);
                console.log("Entered rain")
            }
            else{
                setImg(sun);
                console.log("Entered sun")
            }
        }
    },[temp])

    useEffect(() => {
        setName(city) 
    },[city]);

    useEffect(() =>{
        if(cordinates.length != 0){
        setLocation({city: cordinates[0].name, state: cordinates[0].state, country : cordinates[0].country})
        console.log(temperature.deg);
        }
    },[cordinates])

    useEffect(() =>{
        if(temp.length != 0){
            setTemperature({temp: temp.list[0].main.temp , desc: temp.list[0].weather[0].description})
        }
    },[temp])

    const date = new Date();
    const day = date.toLocaleDateString('en-US',{weekday:'short'});
    const time = new Intl.DateTimeFormat('en-US',{hour: '2-digit',minute:'2-digit',hour12:false}).format(date);
    

    return(


        <>
            <div className = "rounded-lg bg-transparent shadow-2xl shadow-white h-[95vh] w-full p-5 space-y-5 flex-col text-white ">
                <div className = "flex bg-white rounded-full h-10">
                    <span className="material-symbols-outlined my-auto px-2 text-gray-400"> search </span>
                    <input 
                        type = "text"
                        placeholder = "Enter city name..."
                        className = " w-full m-2 h-fit focus:outline-none text-gray-700"
                        value = {city}
                        onChange = {(e) => setCity(e.target.value)}
                        onKeyUp = {handleKeyUp}
                    />
                </div>
                
                <div className="text-3xl px-7"> {location.city} </div>
                <img src = {img} className = " w-2/3 text-center mx-auto"/>
                <div className="px-7 space-y-5">
                    <div className="text-5xl"> {temperature.temp} <sup>o</sup>C</div>
                    <div className="text-2xl">{day} {time}</div>
                    <div className="text-2xl"><span className="material-symbols-outlined text-3xl align-middle"> partly_cloudy_day</span>{temperature.desc}</div>
                    <div className="text-2xl"><span className="material-symbols-outlined text-2xl align-middle">location_on</span>{location.state} , {location.country} </div>
                </div>
                
            </div>
        </>
    )
}

export default Left;