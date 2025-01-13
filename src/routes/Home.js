import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const dbChats = await getDocs(collection(dbService, "chats"));
    dbChats.forEach((document) => 
      setChats((prev) => [document.data(), ...prev])
    );
  };

  useEffect(() => {
    getChats();
  }, []);

  console.log(chats);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "chats"), {
      text: chat,
      createdAt: Date.now(),
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
  );
};

export default Home;
