import React from "react";
import "../Styles/RenderMessage.css";

const RenderMessage = ({ recivedMessages }) => {
  return (
    <ul className="RenderMessageConteiner">
      <h4>You: </h4>
      {recivedMessages.map((message, index) => (
        <li className="RenderMessageLi ">
        <h5 className="RenderMessageH5" key={index}>{message}</h5>
        </li>
      ))}
    </ul>
  );
};

export default RenderMessage;
