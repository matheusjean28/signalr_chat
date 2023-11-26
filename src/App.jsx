import { useState } from 'react'
import ChatMain from './Components/ChatMain'
import Profile from './Components/Profile'
import './App.css'

function App() {

  return (
    <>
    <div className="MainGrid">  
      <ChatMain />
      <Profile />
    </div>
    </>
  )
}

export default App
