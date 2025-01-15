import { dbService } from "fbase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

const Chat = ({ chatObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      console.log(chatObj.id);
      const data = await deleteDoc(doc(dbService, "chats", chatObj.id));
      console.log(data);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div>
      {editing ? (
        <>
          <form>
            <input value={newChat} required />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{chatObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Chat</button>
              <button onClick={toggleEditing}>Edit Chat</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
