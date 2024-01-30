import { useState } from 'react'
import './App.css'
import UserContextProvider from './UserContextProvider/UserContextProvider'
import Login from './Login/Login';
import Profile from './Profile/Profile'
function App() {

  return (
    <>
      <UserContextProvider>
        <h1>Context API</h1>
        <Login/>
        <Profile/>
      </UserContextProvider>
    </>
  )
}

export default App
