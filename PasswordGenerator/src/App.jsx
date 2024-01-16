import './App.css'
import { useCallback, useEffect, useState,useRef } from 'react';
function App() {
  
  const passwordRef = useRef(null);
  const [length,setLength] = useState(12);
  const [isNum,setIsNum] = useState(false);
  const [isSplChar, setIsSplChar] = useState(false);
  const [password,setPassword] = useState("");

  const getPassword = useCallback(()=>{
    let str = "abcdefghijklmnopqrstuvwxyz";
    let pass ="";
    if(isNum){
      str += "0123456789";
    }
    if(isSplChar){
      str += "!@#$%^&*";
    }

    for(let i = 0; i < length; i++){
      let n = Math.floor(Math.random() * str.length);
      pass += str[n];
    }
    setPassword(pass);
  },[length,isNum,isSplChar,setPassword])

  useEffect(() =>{
    getPassword();
  },[isNum,isSplChar,length])

  const copyPassword = () =>{
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
  }
  return (
    <>
      <div className = "w-screen h-screen bg-[#8B78E6]">
        <h1 className = "text-3xl font-bold text-center text-white p-3"> Password Generator </h1>
        <div className = "w-[550px] bg-[#baaef5] text-center mx-auto relative m-11 rounded-xl p-5">
          <label className = "text-white text-lg"> Password </label>
          <input type = "text" className = "h-[50px] w-96 mt-6 rounded-lg  bg-white focus:outline-none p-5" value = {password} readOnly ref = {passwordRef}/>
          <i className="fa-regular fa-copy text-white text-bold text-2xl mt-3 ml-2 bg-purple-500 p-2 rounded-md cursor-pointer" onClick = {copyPassword}></i>
          <div className = "flex flex-row mt-7 ml-10">
            <input type = "range" min={6} max={30} value={length} className = "cursor-pointer mr-2"  onChange = {(e) =>{
              setLength(e.target.value);
            }}/>
            <label> Length: {length} </label>
            <input type = "checkbox" className='ml-3 mr-1 cursor-pointer space-x-0' onChange = {() => {
              setIsNum((prevNum) => !prevNum)
            }}/>
            <label> Numbers </label>
            <input type = "checkbox" className='cursor-pointer ml-3 mr-2' onChange = {() =>{
              setIsSplChar((prevChar) => !prevChar)
            }}/>
            <label> Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
