const Chat = ({ chatObj, isOwner }) => {
  return (
    <div>
      <h4>{chatObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Chat</button>
          <button>Edit Chat</button>
        </>
      )}
    </div>
  );
};

export default Chat;
