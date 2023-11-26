import useWebSocket from "react-use-websocket";
import '../Styles/RenderMessage.css'
export default function RenderMessage() {
  const { lastJsonMessage, readyState } = useWebSocket(
    "ws://localhost:5146"
  );
 

  return (
    <>
      <div className="RenderMessageConteiner">
        <h4>You: {lastJsonMessage && lastJsonMessage.text}</h4>
      </div>
    </>
  );
}
