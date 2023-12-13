import React, { useContext, useState, useEffect } from "react";
import ChatMain from "./ChatMain";
import AppContext from "../Context/AppContext";
import "../Styles/RenderMessage.css";

const RenderAllMessages = () => {
  const { connection, recivedMessages, setRecivedMessages, username } =
    useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceberMensagem", (usuario, mensagem) => {
      var objMessage = { user: usuario, userMessage: mensagem };

      console.log(Object.keys(objMessage));
      setMensagens((prevMensagens) => [...prevMensagens, objMessage]);
      setRecivedMessages((prevMensagens) => [...prevMensagens, objMessage]);
    });

    return () => {};
  }, [connection]);

  //if last message == you then just render usermessa
  return (
    <ul className="RenderMessageConteiner">
      {mensagens.map(({ user, userMessage, index }) => (
        <li
          key={index}
          className={user === username ? "CurrentUser" : "OtherUser"}
        >
          {user === username ? (
            <div className="CurrentUserSide">
              <h4 className="RenderMessageYou"> You</h4>
              <h5 className="RenderMessageYou">{userMessage}</h5>
            </div>
          ) : (
            <div className="OtherUserSide">
              <h4 className="RenderMessageOther"> {user}</h4>
              <h5 className="RenderMessageOther">{userMessage}</h5>
            </div>
          )}
        </li>
      ))}
      <ChatMain />
    </ul>
  );
};

export default RenderAllMessages;
