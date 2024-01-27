
//send message method
const OnConnectionCalled = async (connection) => {
  connection.on("SendMessageToUser", (responseMessa) => {
    console.log(responseMessa)
  })

  //check before try to send message 
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    connection
      .invoke("SendMessageToUser", "5d8c9046-0c60-4aba-b447-22879a0542cd"
        , "87c2354b-4e7c-4fe5-9052-45cfebfe713b", "Olá, pessoal!")
      .catch((error) => console.error("Error:", error));

    setMessageInput("");
  }
};


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


const onJoinRoom = async (userId, roomId, connection) => {
  try {
    if (connection && connection.state === signalR.HubConnectionState.Connected) {

      console.log("Attempting to join the chat...");

      await connection.invoke("JoinChat", userId, roomId);

      console.log("Successfully joined the chat");

      //pass by the other component but not used now
      //notation to remeber:: ->
      // setConnection(connection);
    } else {
      console.error("Connection is not established or is not in a connected state.");
      await reconnect();
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.log("an error ocurred by ", error);

    await reconnect();
  }

  connection.on("errormessage", (errorMessage) => {
    console.error(errorMessage);
  });
};

const joinInChatAsync = async (connection) => {
  connection.on("JoinChat", (message) => {
    console.log("User connected successfully:", message);
  });
}

export default { OnConnectionCalled, reconnect, joinInChatAsync, onJoinRoom, };
