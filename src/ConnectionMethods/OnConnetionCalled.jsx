const OnConnetionCalled = () => {};

//next feature
const handleManualReconnect = () => {
  if (
    connection &&
    connection.state === signalR.HubConnectionState.Disconnected
  ) {
    connection
      .start()
      .then(() => {
        setConnectionStatus("Connected");
        console.log("Reconnected manually");
      })
      .catch((error) =>
        console.error("Manual reconnection attempt failed:", error)
      );
  }
};

export default OnConnetionCalled;
