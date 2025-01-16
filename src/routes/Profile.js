import { authService, dbService } from "fbase";
import { collection, orderBy, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const getMyChats = async () => {
    const chats = await getDocs(
      query(
        collection(dbService, "chats"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt", "asc")
      )
    );

    console.log(chats.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyChats();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
