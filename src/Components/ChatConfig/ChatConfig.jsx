import '../../Styles/ChatConfigtyles.css'
import { Bot, ImageOff, ChevronLeft, AtSignIcon } from 'lucide-react'

const ChatConfig = ({
    currentChat,
    setIsEditingChat,
    isEditingChat,
    chatInformation,
    setChatInformation,
}) => {
    const {chatName } = chatInformation;
    console.log(chatInformation)
    return (
        <div className="ChatConfigConteiner">
            {/* header button */}
            <div className="leftInfoConteiner">
              <span className='chatNameSpan'>
                <h4>{chatName}</h4>
                <AtSignIcon size={12}/>
              </span>

            </div>

            {/* card info about manager */}
            <div className="infoConteiner">
                <h4>Manegers:</h4>
                <ul className="ulInfoManegers ">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li className="liInfoManagers">
                            <p className="infoContent" key={index}>
                                {}
                            </p>
                            <p className="infoContent managersName">Matth</p>
                            <p className="infoContent cargo">manager</p>
                        </li>
                    ))}
                </ul>
                <h4 className='currentUsersCards'>Current Users:</h4>
                <ul className="ulInfoManegers ">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li className="liInfoManagers">
                            <p className="infoContent" key={index}>
                                {}
                            </p>
                            <p className="infoContent managersName">Matth</p>
                            <p className="infoContent cargo">manager</p>
                        </li>
                    ))}
                </ul>
            </div>

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
