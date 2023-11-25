import React from 'react';
import useWebSocket from 'react-use-websocket';
import '../Styles/ChatMain.css';

export default function ChatMain() {
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket('wss://kaazing.com/echo');

    const sendMessage = () => {
        const message = { text: 'Hello, world!' };
        sendJsonMessage(message);
    };

    console.log('WebSocket Ready State:', readyState);

    return (
        <>
            <div className="ChatMainContainer">
                <button onClick={sendMessage}>Enviar Mensagem</button>
                <div>Última mensagem recebida: {lastJsonMessage && lastJsonMessage.text}</div>
            </div>
        </>
    );
}
