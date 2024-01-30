import './App.css'
import WeatherContext from './Context/WeatherContext'
import {useState,useEffect} from 'react';
import Input from './Component/Input';

import Layout from './Component/Layout';
function App() {
  
  const [name, setName] = useState("");
  const [cordinates, setCordinates] = useState([]);
  const [temp, setTemp] = useState("");
  const [today,setToday] = useState("");
  const [input , setInput] = useState("");


  const handleKeyUp = (e) =>{
    if(name != "" && e.key == 'Enter'){
        if(name == ""){
            alert("Please enter the name")
        }
        setInput(name.charAt(0).toUpperCase() + name.slice(1,name.length).toLowerCase());
        getData();
        currTemp();
    }
    
  } 


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

  const currTemp = async() =>{
    if(cordinates.length > 0){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cordinates[0].state}&appid=318343aa3e7ebfcc0a606fa6ed31ed65`;
      try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        setToday(data);
        console.log(data);
      }catch(error){
        console.log("error");
        setToday("");
      }
    }
  }

  useEffect(() => {
    if (cordinates.length > 0) {
      console.log(typeof cordinates);
      console.log(cordinates[0].lat);
      console.log(cordinates[0].lon);
      getTemp();
      currTemp();
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
    <>
    <WeatherContext.Provider value = {{name,setName,temp,setTemp,cordinates,setCordinates,getData,handleKeyUp,today,input}}>
        <Layout/>
    </WeatherContext.Provider>
    </>
  )
}

export default App
