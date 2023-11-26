import { useState } from 'react'
import AppContext from './Context/AppContext'
import { useContext } from 'react'
import ChatMain from './Components/ChatMain'
import Profile from './Components/Profile'
import './App.css'

function App() {
  return (
    <>
    {/* <AppContext.Provider value={}> */}
    <div className="MainGrid">  
      <ChatMain />
      <Profile />
    </div>
    {/* </AppContext.Provider> */}
    </>
  )
}

export default App
