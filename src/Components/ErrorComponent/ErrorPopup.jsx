import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import '../../index.css'
const ErrorPopup = () => {
    const { errorMessage } = useContext(AppContext)

    console.log(errorMessage)
    return (
        <div className="errorLogin">
            <p>{errorMessage}</p>
        </div>
    )
}

export default ErrorPopup;