import React from "react";

const Todays =(props) =>{
    return(
        <div className = " lg:min-w-32 lg:h-36 sm:h-32 sm:min-w-28 bg-green-500 rounded-xl flex flex-col text-white text-center justify-between p-2"> 
            <h1> {props.time} </h1>
            <img src = {props.img} alt = "sun" className="w-2/5 mx-auto"/>
            <p><span>{props.max}</span> / <span> {props.min} </span></p>
        </div>
    )
}

const Bottom = (props) =>{
    return(
        <div className = "h-42 w-48 rounded-2xl bg-green-500 m-3 text-white text-center space-y-7 p-5">
            <p> {props.heading} </p>
            <p> {props.data}</p>
        </div>
    )
}

const Week = (props) =>{
    return(
        <>
        <div className = "bg-transparent w-full h-32 flex text-white justify-evenly px-2 py-4 border-b-gray-400 border-b-2">
            <h1 className="my-auto min-w-28"> {props.time} </h1>

            <div className="text-center"> <img src = {props.img} alt = "sun" className="w-2/5 mx-auto"/> <p> {props.type} </p> </div>
            <p className="my-auto text-xl"> {props.max}/{props.min} </p>

        </div>
    
        </>
    )
}

export {Todays,Bottom,Week};
