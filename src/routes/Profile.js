import { authService, dbService } from "fbase";
import { collection, orderBy, query, where, onSnapshot } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "components/Chat";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName || "");

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      const user = authService.currentUser;
      await updateProfile(user, { displayName: newDisplayName });
      refreshUser();
    }
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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div style={{ marginTop: 30 }}>
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chatObj={chat}
            isOwner={userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
