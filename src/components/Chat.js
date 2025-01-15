import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Chat = ({ chatObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "chats", chatObj.id));
      if (chatObj.attachmentUrl !== "")
        await deleteObject(ref(storageService, chatObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChat(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "chats", chatObj.id), { text: newChat });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newChat} required />
            <input type="submit" value="Update Chat"/>
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{chatObj.text}</h4>
          {chatObj.attachmentUrl && (
            <img src={chatObj.attachmentUrl} width="50px" height="50px" />
          )}
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
