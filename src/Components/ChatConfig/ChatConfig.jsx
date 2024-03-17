import "../../Styles/ChatConfigtyles.css"
import { Bot, ImageOff, ChevronLeft } from "lucide-react";

const ChatConfig = ({ currentChat, setIsEditingChat, isEditingChat }) => {

  return (
    <div className="ChatConfigConteiner">
      <button className="handleCloseBtn" onClick={(e) => {
        e.preventDefault()
        setIsEditingChat(!isEditingChat)
      }}>
        <span>
          <ChevronLeft size={20} />
        </span>
        <h2>Back</h2>
      </button>
    </div>
  );
};

export default ChatConfig;
