import '../Styles/CreateRoom.css'
import { useState } from 'react';
import ProfileSettings from "./ProfileSettings";
import axios from 'axios';
const CreateRoom = () => {
    const [chatName, setChatName] = useState('')
    const [maxUser, setMaxUsers] = useState(10);//defoult is '10
    const [chatDesc, setChatDesc] = useState('');

    //styles for wrong Field
    const [isValidName, setIsValidName] = useState(false)
    const [isValidMaxUsers, setIsValidMaxUsers] = useState(false)
    const [isValidDesc, setIsValidDesc] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const [createdSucess, setCreatedSucess] = useState(false)
    const [responseCreatedRoom, setResponseCreatedRoom] = useState(
        {
            chatID: "3d66cd0b-f658-4f5d-b30e-f6c37eb3f41c",
            chatName: "testedesala",
            onlineUser: 3
        })


    const checkFields = (value, field) => {
        switch (field) {
            case "ChatName":
                if (value.length < 5) {
                    showError("Chat Name must be have more the 5 letters!")
                    setIsValidName(false)
                }
                else {
                    setIsValidName(value.length > 0);
                    setIsValidName(true)
                    setErrorMessage("")
                    setChatName(value)
                }

                break;
            case 'MaxUsers':
                if (value <= 2) {
                    showError("Max user must be more than 2!");
                    setIsValidMaxUsers(false);

                } else {
                    setIsValidMaxUsers(true);
                    setErrorMessage('');
                    setMaxUsers(value)
                }
                break;
            case 'ChatDesc':
                if (value.length <= 30) {
                    showError("Description must be longer!");
                    setIsValidDesc(false);

                } else {
                    setIsValidDesc(true);
                    setErrorMessage('');
                    setChatDesc(value)
                }
                break
            default:
                console.error("field not found!");
                break;
        }
    }

    const showError = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    }

    const _createChat = async () => {
        if (isValidName &&
            isValidMaxUsers &&
            isValidDesc) {
            console.log("creating a room")
            try {
                const resp = await axios.post('http://localhost:5178/CreateRoom?chatName=testedesala&onlineUser=3&userId=5d8c9046-0c60-4aba-b447-22879a0542cd');
                if (!resp.status ==  200) {
                    showError("resp");
                    throw new Error("Fail at create room!")
                } else {
                    console.log("status ",resp.status)
                    setResponseCreatedRoom(resp.data)
                    setCreatedSucess(true)
                    
                }
            } catch (error) {
                console.log(error)
            }

        } else {
            console.log("some of condition is not true")
        }
    }


    return <>
        <div className="CreateRoomConteiner">
            {errorMessage && (
                <div className="errorNotification">
                    <h5>{errorMessage}</h5>
                </div>
            )}
            {/* next feature is create a field 
            to ask if chat is public or closed ´private
        */}
            <div className="ConteinerLeft">
                {createdSucess ?(
                    <div className="createdChat">
                        <h2>Your Room Was Created!</h2>
                        <p>Now you can gather all your friends in one place!</p>
                        <div className="CreateInfoConteiner">
                            <h5 className='DescCreatedChat' >ChatName:</h5>
                            <h5>{responseCreatedRoom.chatName.toUpperCase()}</h5>

                            <h5 className='DescCreatedChat' >Max Users:</h5>
                            <h5>{responseCreatedRoom.onlineUser}</h5>

                        </div>
                        <h4 className='warningFeature'>At this moment your chat is Public <br />we are working to create a new feature "Private Rooms"!</h4>

                    </div>)
                    : <form className="CreateChatForm">
                        <h2>CREATE CHAT</h2>
                        <input onChange={(e) => {
                            e.preventDefault();
                            checkFields(e.target.value, "ChatName")
                        }} name='ChatName' className={!isValidName ? 'formInputs wrongField' : 'formInputs'} type="text" placeholder='Chat Name' />
                        <input onChange={(e) => {
                            e.preventDefault();
                            checkFields(e.target.value, 'MaxUsers')
                        }} name='MaxUsers' className={!isValidMaxUsers ? 'formInputs wrongField' : 'formInputs'} type="number" placeholder='Max Users at room' />
                        <p className='chatDesc'>Chat Description</p>
                        <textarea onChange={(e) => {
                            e.preventDefault();
                            checkFields(e.target.value, 'ChatDesc')
                        }} name='ChatDesc' className={!isValidDesc ? ' Desc formInputs wrongField' : ' formInputs Desc'} type="text" placeholder='Chat Description' />
                        <button className='formBtnCreate' onClick={(e) => {
                            e.preventDefault()
                            console.log(isValidName,
                                isValidMaxUsers,
                                isValidDesc,)
                            _createChat()
                        }}>CREATE</button>
                    </form>}


            </div>
            <ProfileSettings />
        </div>
    </>
}

export default CreateRoom;