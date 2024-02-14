import '../../Styles/ScreenErrorComponent.css'
import AppContext from '../../Context/AppContext';
import { useContext } from 'react';

const ScreenErrorComponent = ( ) => {
    const {errorMessage} = useContext(AppContext);
    
    //take error message and display

    return (
        <div className="errorConteiner">
            <div className="leftErrorConteiner">
                <h1 className='Opserror'>Ooops!</h1>
                <h3>An Error Was Ocurred</h3>
                <br />
                <h6 className='workinhError'>We are working to fix that</h6>

                <p>{errorMessage}</p>
                <p>"Sorry, there was an issue trying to connect to the chat. This could be due to a connection failure to our servers or an internal problem. Please try again later. If the issue persists, please contact technical support for assistance."</p>
                <div className="errorActions">
                    <button>LOGOUT</button>
                    <button>FIND HELP</button>
                </div>
            </div>

            <div className="rigthErrorConteiner">
                <img src="src\assets\disconnect.png" alt="https://www.flaticon.com/free-icon/disconnect_11932981?term=disconnection&page=1&position=95&origin=search&related_id=11932981" />
            </div>
        </div>
    )
}

export default ScreenErrorComponent;