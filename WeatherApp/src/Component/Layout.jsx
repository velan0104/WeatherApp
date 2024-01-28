import React from "react";
import Left from "./Left";
import Right from "./Right";

const Layout = () =>{
    return(
        <>
        <div>
            <div className = "w-screen h-screen bg-blue-700 flex flex-row">
                <div className="w-1/4 m-5">
                    <Left/>   
                </div> 
                <div className = "w-3/4 my-5">
                    <Right/>
                </div>
                
            </div>
        </div>
        
        </>
    )
}

export default Layout;