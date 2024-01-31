import React, { useContext, useState, useEffect } from "react";
import {Todays,Bottom,Week}  from './RightComponent'
import WeatherContext from "../Context/WeatherContext";
import sun from '../Images/sun.png'
import snow from '../Images/snow.png'
import rain from '../Images/rain.png'
import mist from '../Images/mist.png'

const Right = () =>{

    const{temp,today} = useContext(WeatherContext);
    const [Today,setToday] = useState({time: '12:00',min:'10',max:'20'});
    const [highlights,setHighlights] = useState({humidity : '--' , AirSpeed: '--', GroundLvl: '--',AirPressure: '--', visibility: '--'});
    const [sunTime, setSunTime] = useState({sunRise: '--',sunSet:'--'});

    useEffect(() =>{
        let isValid = false;
        if(temp.length != 0){
            console.log(today)
            const currTime = temp.list[0].dt_txt;
            const date = new Date(currTime);
            const cTime = date.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',hour12: false});
            setToday({time: cTime, min: Math.round((temp.list[0].main.temp_min) - 273.15) , max: Math.round((temp.list[0].main.temp_max) - 273.15)})
            setHighlights({humidity: `${temp.list[0].main.humidity}%`,AirSpeed: `${temp.list[0].wind.speed} m/s`, GroundLvl: temp.list[0].main.grnd_level, AirPressure: `${temp.list[0].main.pressure} hPa`, visibility: `${(temp.list[0].visibility) /1000} Km/h`});

            if(typeof today == 'object'){
                if(today.hasOwnProperty('sys')){
                    isValid = true;
                }else{
                    isValid = false;
                }

                if(isValid){
                    const sunRiseTime = today.sys.sunrise;
                    const sunSetTime = today.sys.sunset;
                    const date2 = new Date(sunRiseTime * 1000)
                    const riseTime = date2.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',seconds: '2-digit'});
                    const date3 = new Date(sunSetTime * 1000)
                    const setTime = date3.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',seconds: '2-digit'});
                    setSunTime({sunRise: `Rise: ${riseTime}`,sunSet: `Set: ${setTime}`});
                }else{
                    setSunTime({sunRise: '--',sunSet: '--'});
                }
            }

            else{
                setHighlights({humidity:"--",AirSpeed:"--",GroundLvl:"--",AirPressure:"--",visibility:"--"})
            }

        
        }
    },[temp,today])


    function setDate(curr){
        const date = new Date(curr);
        return date.toLocaleTimeString('en-US',{year: '2-digit',month:'2-digit',day:'numeric',hour:'2-digit',minute:'2-digit'});
    }

    function setImg(type){
        console.log(type)
        if(type === 'Clouds'){
           return "snow";
        }
        else if(type === 'Mist'){
            return {mist}
        }
        else if(type === 'Rain'){
            return {rain}
        }
        else{
           return {sun};
        }
    }

    
    return(
        <>
            <div className="h-[95vh] w-full p-5 text-white text-2xl flex lg:flex-row sm:flex-col">
                <div className="lg:w-2/3">
                    <h1 className = "pb-4"> Hourly Report </h1> 
                    <div className="flex flex-row lg:h-fit w-full space-x-3 sm:w-36 sm:mb-10">
                        <Todays time = {Today.time} min = {Today.min} max = {Today.max}/>
                        <Todays time = "Monday" min = "10" max = "30"/>
                        <Todays time = "Monday" min = "10" max = "30"/>
                        <Todays time = "Monday" min = "10" max = "30"/>
                        <Todays time = "Monday" min = "10" max = "30"/>
                    </div>

                    <h1 className="sm:mb-5 lg:mb-1"> Today Highlights</h1>
                    <div className = "flex flex-wrap flex-row justify-around w-fit">
                        <Bottom heading = "Humidity" data = {highlights.humidity}/>
                        <Bottom heading = {sunTime.sunRise} data = {sunTime.sunSet} />
                        <Bottom heading = "Air speed" data = {highlights.AirSpeed} />
                        <Bottom heading = "Ground lvl" data = {highlights.GroundLvl}/>
                        <Bottom heading = "Air pressure" data = {highlights.AirPressure}/>
                        <Bottom heading = "Visibility" data = {highlights.visibility}/>
                    </div>
                </div>
               

                <div className = "ml-4 lg:w-1/3 h-full w-full space-y-8">
                    <h1> 24 Hours Forecast</h1>
                    <div className="bg-blue-500 h-4/5 rounded-xl p-5 overflow-y-scroll webkit-scroll">
                    {(temp != 0 ) ?
                        temp.list.slice(0, 8).map((hourlyData, index) => (
                        <Week
                        key={index}
                        time={setDate(hourlyData.dt_txt)}
                        img={sun} 
                        min={Math.round(hourlyData.main.temp_min - 273.15)}
                        max={Math.round(hourlyData.main.temp_max - 273.15)}
                        />
                    )):
                        <p> Loading ...</p>
                    }
                    </div>
                   
                </div>
            </div>
        
        </>
    )
}

export default Right;