import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "./components/common/Chats";
import Chat from "./components/routes/Chat";
import Login from "./components/routes/Login";
import NoChat from "./components/routes/NoChat";
import { socket } from "./lib/constants";

function App() {
  const [chatID, setChatID] = useState();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    if (!userID) return;
    socket.emit("join", { userID: userID });
  }, [userID]);

  if (!userID) return <Login setUserID={setUserID} />;

  return (
    <BrowserRouter>
      <div id="app">
        <Chats id={chatID} userID={userID} setUserID={setUserID} />
        <Routes>
          <Route path="/" element={<NoChat />} />
          <Route
            path="/:id"
            element={
              <Chat setId={setChatID} userID={userID} setUserID={setUserID} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
