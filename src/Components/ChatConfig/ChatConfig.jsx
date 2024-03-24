import '../../Styles/ChatConfigtyles.css'
import { ChevronLeft, UserPlus } from 'lucide-react'
import ConteinerLeft from './ConteinerLeft'
import ModalAddUserManager from './ModalAddUserManager'

const ChatConfig = ({
    currentChat,
    setIsEditingChat,
    isEditingChat,
    chatInformation,
    setChatInformation,
}) => {
    const { chatName } = chatInformation
    console.log(chatInformation)
    return (
        <div className="ChatConfigConteiner">
            <ModalAddUserManager />
            {/* header button */}
            <ConteinerLeft chatName={chatName} />

            {/* card info about manager */}
            <div className="infoConteiner">
                <h4>Current Users:</h4>
                <ul className="ulInfoManegers ">
                    {Array.from({ length: 100 }).map((_, index) => (
                        <li className="liInfoManagers">
                            <p className="infoContent" key={index}></p>
                            <p className="infoContent managersName">Matth</p>
                            <p className="infoContent cargo">manager</p>
                            {/* check if cargo is != normaluser */}
                            <span className="addAsManeger">
                                <UserPlus size={15} />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* button  close */}
            <button
                className="handleCloseBtn"
                onClick={(e) => {
                    e.preventDefault()
                    setIsEditingChat(!isEditingChat)
                }}
            >
                <span>
                    <ChevronLeft size={20} />
                </span>
                <h2>Back</h2>
            </button>
        </div>
    )
}

export default ChatConfig
