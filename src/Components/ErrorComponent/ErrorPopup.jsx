import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import '../../index.css'

const PopUpMessage = () => {
    const { popMessage } = useContext(AppContext)
    if (popMessage === "Sucess at CreateAccount!" || popMessage === "Loggin Sucess") {
        return (
            <div className="errorLogin sucessLoginConnect">
                <p>{popMessage}</p>
            </div>)
    } else {
        return (
            <div className="errorLogin ">
                <p>{popMessage}</p>
            </div>)
    }
}

export default PopUpMessage;