import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Chat from "components/Chat";
import ChatFactory from "components/ChatFactory";

const Home = ({ userObj }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(dbService, "chats"),
        orderBy("createdAt", "desc")
      ),
      snapshot => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setChats(newArray);
      }
    );
  }, []);

  return (
    <div className="container">
      <ChatFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chatObj={chat}
            isOwner={chat.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
