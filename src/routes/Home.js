import { useState } from "react";

const Home = () => {
  const [chat, setChat] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
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
