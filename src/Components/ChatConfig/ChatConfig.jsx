import "../../Styles/ChatConfigtyles.css";
import { Bot, ImageOff, ChevronLeft } from "lucide-react";

const ChatConfig = ({
  currentChat,
  setIsEditingChat,
  isEditingChat,
  chatInformation,
  setChatInformation,
}) => {
  console.log(chatInformation);
  return (
    <div className="ChatConfigConteiner">
      {/* header button */}
      <button
        className="handleCloseBtn"
        onClick={(e) => {
          e.preventDefault();
          setIsEditingChat(!isEditingChat);
        }}
      >
        <span>
          <ChevronLeft size={20} />
        </span>
        <h2>Back</h2>
      </button>

      <div className="infoConteiner">
        <h4>Manegers:</h4>
        <ul className="ulInfoManegers">
          {Array.from({ length: 5 }).map((_, index) => (
            <li className="liInfoManagers">
              <p className="infoContent" key={index}>{index}</p>
              <p className="infoContent managersName">Matth</p>
              <p className="infoContent cargo">manager</p>



            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatConfig;
