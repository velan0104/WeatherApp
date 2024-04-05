import React, { useState, useEffect } from 'react';
import WeatherContext from '../Context/WeatherContext';

const Data = ({ children }) => {
  const [name, setName] = useState("Mumbai");
  const [cordinates, setCordinates] = useState([]);
  const [temp, setTemp] = useState("");

  useEffect( ()=>{
    setName("Mumbai")
  },[])

  const getData = async () => {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=318343aa3e7ebfcc0a606fa6ed31ed65`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCordinates(data);
      console.log(data);
    } catch (error) {
      console.log('Error:', error);
      setCordinates([]);
    }
  };

  const getTemp = async () => {
    if (cordinates.length > 0) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cordinates[0].lat}&lon=${cordinates[0].lon}&appid=318343aa3e7ebfcc0a606fa6ed31ed65`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTemp(data);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };

  useEffect(() => {
    if (cordinates.length > 0) {
      console.log(typeof cordinates);
      console.log(cordinates[0].lat);
      console.log(cordinates[0].lon);
      getTemp();
    } else {
      console.log("enter name please");
    }
  }, [cordinates]);

  useEffect(() => {
    if (typeof temp === 'object') {
      console.log(temp.list[0].main.temp);
    }
  }, [temp]);

  return (
    <WeatherContext.Provider value={{ temp, setTemp, cordinates, setCordinates, name, setName, getData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default Data;
