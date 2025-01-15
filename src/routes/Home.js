import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Chat from "components/Chat";

const Home = ({ userObj }) => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "chats"), snapshot => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setChats(newArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "chats"), {
      text: chat,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setChat("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setChat(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={chat}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Chat" />
      </form>
      <div>
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chatObj={chat}
            isOwner={chat.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
