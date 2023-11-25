import { useState } from 'react'
import ChatMain from './Components/ChatMain'
import Profile from './Components/Profile'
import { WebSocketDemo } from './Components/Example'
import './App.css'

function App() {

  return (
    <>
    <div className="MainGrid">  
      <WebSocketDemo/>
      <Profile />
      {/* <ChatMain /> */}
    </div>
    </>
  )
}

export default App
