import { useState } from "react";
import AppRouter from "components/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} IWChat</footer>
    </>
  );
}

export default App;
