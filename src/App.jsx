import './App.css'
import WeatherContext from './Context/WeatherContext'
import {useState,useEffect} from 'react';

import Layout from './Component/Layout';
function App() {

  const [name, setName] = useState("");
  const [cordinates, setCordinates] = useState([]);
  const [temp, setTemp] = useState("");
  const [today,setToday] = useState("");
  const [input , setInput] = useState("");
  const [location,setLocation] = useState({lat: '', lon:''});

  useEffect(() =>{
    const getCurrentPosition = () =>{
      return new Promise((resolve,reject) =>{
        navigator.geolocation.getCurrentPosition(
          (position) =>{
            resolve(position.coords);
          },
          (error) =>{
            reject(error.message);
          }
        )
      });
    }

    const fetchData = async() =>{
      try{
        if(navigator.geolocation){
          const position = await getCurrentPosition();
          const {latitude,longitude} = position;
          setLocation({lat:latitude,lon:longitude});
        }
      }catch(error){
        console.log(error);
      }
    }

    fetchData();
  },[])
  

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
      setLocation({lat: data[0].lat, lon: data[0].lon})
      console.log(data);
    } catch (error) {
      console.log('Error:', error);
      setCordinates([]);
    }
  };

  const getTemp = async () => {
    if (cordinates.length > 0) {
         
      console.log("Latitude: " + location.lat + "    " + ", Longitude: " + location.lon);
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=318343aa3e7ebfcc0a606fa6ed31ed65`;
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





  return (
    <>
    <WeatherContext.Provider value = {{name,setName,temp,setTemp,cordinates,setCordinates,getData,handleKeyUp,today,input}}>
        <Layout/>
    </WeatherContext.Provider>
    </>
  )
}

export default App
