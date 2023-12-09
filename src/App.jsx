import { useState } from 'react'
import AppContext from './Context/AppContext'
import ChatMain from './Components/ChatMain'
import Profile from './Components/Profile'
import WebSocketDemo from './Components/Demo.Component'
import './App.css'

function App() {
  const [username, setUsername] = useState('matheus');
  const [recivedMessages, setRecivedMessages] = useState([]);
  
  return (
    <>
    <AppContext.Provider value={{username,setUsername, recivedMessages, setRecivedMessages}}>
    <div className="MainGrid">  
      {/* <ChatMain /> */}
      <WebSocketDemo/>
      <Profile />

    </div>
    </AppContext.Provider>
    </>
  )
}

export default App
