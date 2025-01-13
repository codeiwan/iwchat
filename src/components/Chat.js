import { dbService } from "fbase";
import { doc, deleteDoc } from "firebase/firestore";

const Chat = ({ chatObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      console.log(chatObj.id);
      const data = await deleteDoc(doc(dbService, "chats", chatObj.id));
      console.log(data);
    }
  };

  return (
    <div>
      <h4>{chatObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Chat</button>
          <button>Edit Chat</button>
        </>
      )}
    </div>
  );
};

export default Chat;
