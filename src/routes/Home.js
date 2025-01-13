import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const dbChats = await getDocs(collection(dbService, "chats"));
    dbChats.forEach((document) => {
      const chatObject = { ...document.data(), id: document.id };
      setChats((prev) => [chatObject, ...prev])
    });
  };

  useEffect(() => {
    getChats();
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
        <input type="submit" value="Chat" />
      </form>
      <div>
        {chats.map((chat) => (
          <div key={chat.id}>
            <h4>{chat.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
