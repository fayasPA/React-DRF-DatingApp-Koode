import Header from "../Header/Header";
import ChatContainer from "./ChatContainer";

function Messages() {

  return (
    <div className="h-screen">
      <div className="w-100 h-[10%] flex justify-center items-center border-b-4">
        <Header title="ChatBox" subtitle="" />
      </div>
      <div className="h-[90%]">
        <ChatContainer />
      </div>
    </div>
  )
}

export default Messages;