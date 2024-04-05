import React, { useContext, useState, useEffect } from "react";
import {Todays,Bottom,Week}  from './RightComponent'
import WeatherContext from "../Context/WeatherContext";
import DataNotFound from '../Images/DataNotFound.png';
import mist from '../Images/mist.png';
import rain from '../Images/rain.png';
import snow from '../Images/snow.png';
import sun from '../Images/sun.png';

const Right = () =>{

    const{temp,today} = useContext(WeatherContext);
    const [Today,setToday] = useState({time: '12:00',min:'10',max:'20'});
    const [highlights,setHighlights] = useState({humidity : '--' , AirSpeed: '--', GroundLvl: '--',AirPressure: '--', visibility: '--'});
    const [sunTime, setSunTime] = useState({sunRise: '--',sunSet:'--'});
    const [data,setData] = useState([]);

    useEffect(() =>{
        let isValid = false;
        if(temp.length != 0){
            console.log(today)
            setData(HourlyData(temp));
            console.log(data);
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
        return date.toLocaleTimeString('en-US',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
    }

    function icons(curr){
        if(curr === 'Clouds'){
            return "cloudy_snowing";
        }else if(curr === 'Mist'){
            return "Mist";
        }else if(curr === 'Rain'){
            return 'Rainy';
        }else{
            return "Sunny";
        }

    }

    function image(curr){
        if(curr === 'Clouds'){
            return snow;
        }else if(curr === 'Mist'){
            return mist;
        }else if(curr === 'Rain'){
            return rain;
        }else{
            return sun;
        }

    }

    function HourlyData(temp){
        const tempData = [];
        let tempArr = temp.list;
        const distinctDate = new Set();

        for(let i = 0; i < tempArr.length; i++){
            let date = tempArr[i].dt_txt;
            const dateObj = new Date(date);
            let formatDate = dateObj.toLocaleDateString('en-US',{day:'numeric',month:'short'})
            distinctDate.add(formatDate)
        }

        for(let i = 0; i < tempArr.length; i++){
            let date = tempArr[i].dt_txt;
            const dateObj = new Date(date);
            let formatDate = dateObj.toLocaleDateString('en-US',{day:'numeric',month:'short'});
            if(distinctDate.has(formatDate)){
                tempData.push({date: formatDate, type: tempArr[i].weather[0].main,min: Math.round(tempArr[i].main.temp_min - 273.15),max: Math.round(tempArr[i].main.temp_max - 273.15)})
                distinctDate.delete(formatDate);
            }
        }
        return tempData.slice(1,tempData.length);
    }

    
    return(
        <>
            <div className="h-[95vh] w-full p-5 text-white text-2xl flex lg:flex-row sm:flex-col">
                <div className="lg:w-2/3">
                    <h1 className = "pb-4 text-white"> Weekly Report </h1> 
                    <div className="flex flex-row lg:h-fit min-w-full space-x-3 sm:w-36 sm:mb-10 overflow-x-auto m-auto">
                        { (data.length > 0)?
                            data.map((hourlyData,index) => (
                                <Todays
                                key = {index}
                                img = {image(hourlyData.type)}
                                time = {hourlyData.date} 
                                min = {hourlyData.min} 
                                max = {hourlyData.max}
                                />
                            )):
                            <div className = "">
                                <img src = {DataNotFound} height = "120px" width = "100px" alt = "Data Not Found"/>
                                <p>Please enter the city name</p>
                            </div>
                        }
                    </div>

                    <h1 className="sm:mb-5 lg:mb-1 text-white"> Today Highlights</h1>
                    <div className = "flex flex-wrap flex-row justify-around w-fit">
                        <Bottom heading = "Humidity" data = {highlights.humidity}/>
                        <Bottom heading = {sunTime.sunRise} data = {sunTime.sunSet} />
                        <Bottom heading = "Air speed" data = {highlights.AirSpeed} />
                        <Bottom heading = "Ground lvl" data = {highlights.GroundLvl}/>
                        <Bottom heading = "Air pressure" data = {highlights.AirPressure}/>
                        <Bottom heading = "Visibility" data = {highlights.visibility}/>
                    </div>
                </div>
               

                <div className = "ml-4 lg:w-1/3 h-full w-full space-y-2">
                    <h1 className = "text-white"> 24 Hours Forecast</h1>
                    <div className="bg-green-500 h-4/5 rounded-xl p-5 overflow-y-auto webkit-scroll">
                    {(temp != 0 ) ?
                        temp.list.slice(0, 8).map((hourlyData, index) => (
                        <Week
                        key={index}
                        time={setDate(hourlyData.dt_txt)}
                        img={image(hourlyData.weather[0].main)} 
                        type = {hourlyData.weather[0].main}
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
