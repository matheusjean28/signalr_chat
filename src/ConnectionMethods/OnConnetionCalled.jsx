import * as signalR from "@microsoft/signalr";

//send message method
const OnConnectionCalled = async (connection) => {
  connection.on("SendMessageToUser", (responseMessa) => {
    console.log(responseMessa)
  })

  //check before try to send message 
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    connection
      .invoke("SendMessageToUser", "5d8c9046-0c60-4aba-b447-22879a0542cd",
        "87c2354b-4e7c-4fe5-9052-45cfebfe713b", "Olá, pessoal!")
      .catch((error) => console.error("Error:", error));

    setMessageInput("");
  }
};

7
const onJoinRoomAsyn = async (userId, roomId, userMessage, _token, connection) => {
  const reconnect = async (connection) => {
    console.log("reconnection called");
    try {
      console.log("Attempting to reconnect...");
      await connection.start();
      console.log("Reconnected successfully!");
    } catch (error) {
      console.error("Error during reconnection:", error.message);
    }
  };


  try {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
      console.log("Attempting to join the chat...");

      await connection.invoke("SendMessageToGroup",userId, roomId, userMessage, _token);
    } else {
      console.error("Connection is not established or is not in a connected state.");
      await reconnect();
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.log("an error ocurred by ", error);

    await reconnect(connection);
  }

  connection.on("Error", (errorMessage) => {
    console.error(errorMessage);
  });
};

const sendMessageToUserAsync = async (userId, chatId, currentChat, messageInput, connection) => {
  //reconect connection
  const reconnect = async (connection) => {
    console.log("reconnection called");
    try {
      console.log("Attempting to reconnect...");
      await connection.start();
      console.log("Reconnected successfully!");
    } catch (error) {
      console.error("Error during reconnection:", error.message);
    }
  };


  try {
    console.log(connection.state)
    if (connection && connection.state === signalR.HubConnectionState.Connected) {

      console.log("sendMessageToUserAsync, connection is ok")
      await connection.invoke("SendMessageToUser",
        "5d8c9046-0c60-4aba-b447-22879a0542cd",
        currentChat,
        "messageInput")
    } else {
      console.log(signalR.HubConnectionState)
      console.log(conn)
      await reconnect();
    }
  } catch (error) {
    console.log(error)

  }
}

export { onJoinRoomAsyn, sendMessageToUserAsync }
