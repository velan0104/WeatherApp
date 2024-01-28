import React from "react";
import sun from '../Images/sun1.png'

const Today =(props) =>{
    return(
        <div className = " min-w-32 h-36 bg-blue-500 rounded-xl flex flex-col text-white text-center justify-between p-2"> 
            <h1> {props.time} </h1>
            <img src = {sun} alt = "sun" className="w-2/5 mx-auto"/>
            <p><span>{props.max}</span> / <span> {props.min} </span></p>
        </div>
    )
}

const Bottom = (props) =>{
    return(
        <div className = "h-44 w-52 rounded-2xl bg-blue-500 m-3 text-white text-center space-y-7 p-2">
            <p> {props.heading}</p>
            <p> Data </p>
            <p> Footer</p>
        
        </div>
    )
}

const Week = (props) =>{
    return(
        <>
        <div className = "bg-transparent w-full h-32 flex text-white justify-shrink px-2 py-4 border-b-gray-400 border-b-2">
            <h1 className="my-auto"> {props.time} </h1>
            <div className="text-center"><img src = {sun} className = " w-1/5 h-fit m-auto"/> <p> Sunny </p> </div>
            <p className="my-auto"> {props.max}/{props.min} </p>

        </div>
    
        </>
    )
}

export {Today,Bottom,Week};