import { authService, dbService } from "fbase";
import { collection, orderBy, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "components/Chat";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(dbService, "chats"),
        where("creatorId", "==", userObj.uid),
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
  }, [userObj.uid]);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chatObj={chat}
            isOwner={userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Profile;
