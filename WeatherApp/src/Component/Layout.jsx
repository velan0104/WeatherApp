import React from "react";
import Left from "./Left";
import Right from "./Right";

const Layout = () =>{
    return(
        <>
        <div>
            <div className = "w-screen h-screen bg-blue-700 flex lg:flex-row md:flex-col sm:flex-col sm:overflow-y-scroll sm:overflow-x-hidden lg:overflow-y-hidden">
                <div className="lg:w-1/4 m-5">
                    <Left/>   
                </div> 
                <div className = "lg:w-3/4 my-5">
                    <Right/>
                </div>
                
            </div>
        </div>
        
        </>
    )
}

export default Layout;