import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="chat">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container chatEdit">
            <input
              onChange={onChange}
              value={newChat}
              required
              placeholder="Edit your chat"
              autoFous
              className="formInput"
            />
            <input type="submit" value="Update Chat" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancle
          </button>
        </>
      ) : (
        <>
          <h4>{chatObj.text}</h4>
          {chatObj.attachmentUrl && (
            <img src={chatObj.attachmentUrl} width="50px" height="50px" alt="chatImg"/>
          )}
          {isOwner && (
            <div className="chat__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
