import { useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";

// obs: the file.css about this file is the same that index.css,
//error warnings and ConnectionStatus are on the top of whole code


const ConnectionStatus = () => {
    const {stateConnection } =useContext(AppContext);

    return (<>{  stateConnection === "Connecting" ? <p className="ConnectionStatus Connecting">{stateConnection}</p> :

        stateConnection === "Connected" ? <p className="ConnectionStatus ">{stateConnection}</p> :

        stateConnection === "Disconnecting" ? <p className="ConnectionStatus Disconnecting">{stateConnection}</p> :

        stateConnection === "Reconnecting" ? <p className="ConnectionStatus Reconnecting">{stateConnection}</p> :
        <p className="ConnectionStatus Disconnected">{stateConnection}</p>}
    </>)
}

export default ConnectionStatus;