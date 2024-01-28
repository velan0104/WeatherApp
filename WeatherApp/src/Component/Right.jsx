import React, { useContext, useState, useEffect } from "react";
import {Today,Bottom,Week}  from './RightComponent'
import WeatherContext from "../Context/WeatherContext";
const Right = () =>{

    const{temp} = useContext(WeatherContext);
    const [today,setToday] = useState({time: '12:00',min:'10',max:'20'});

    useEffect(() =>{
        if(temp.length != 0){
            const currTime = temp.list[0].dt_txt;
            const date = new Date(currTime);
            const cTime = date.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',hour12: false});
            setToday({time: cTime, min: Math.round((temp.list[0].main.temp_min) - 273.15) , max: Math.round((temp.list[0].main.temp_max) - 273.15)})
        }
    },[temp])

    
    return(
        <>
            <div className="h-[95vh] w-full p-5 text-white text-2xl flex flex-row">
                <div className="w-2/3">
                    <h1 className = "pb-8"> Hourly Report </h1> 
                    <div className="flex flex-row h-44 w-full space-x-5">
                        <Today time = {today.time} min = {today.min} max = {today.max}/>
                        <Today time = "Monday" min = "10" max = "30"/>
                        <Today time = "Monday" min = "10" max = "30"/>
                        <Today time = "Monday" min = "10" max = "30"/>
                        <Today time = "Monday" min = "10" max = "30"/>
                    </div>

                    <h1 className="mb-5"> Today Highlights</h1>
                    <div className = "flex flex-wrap flex-row justify-around w-fit">
                        <Bottom heading = "Humidity"/>
                        <Bottom heading = "sunrise"/>
                        <Bottom heading = "Air speed"/>
                        <Bottom heading = "Ground lvl"/>
                        <Bottom heading = "Air pressure"/>
                        <Bottom heading = "Feels like"/>
                    </div>
                </div>
               

                <div className = "ml-4 h-full w-full space-y-8">
                    <h1> 24 Hours Forecast</h1>
                    <div className="bg-blue-500 h-4/5 rounded-xl p-5 overflow-y-scroll">
                    {(temp != 0 ) ?
                        temp.list.slice(0, 8).map((hourlyData, index) => (
                        <Week
                        key={index}
                        time={hourlyData.dt_txt} // Use the actual time from your data
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