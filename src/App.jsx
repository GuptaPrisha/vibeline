import "./App.scss";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoChat from "./components/routes/NoChat";
import Chat from "./components/routes/Chat";
import Chats from "./components/common/Chats";
import { useEffect, useState } from "react";
import { socket } from "./lib/constants";
import Login from "./components/routes/Login";

function App() {
  const [id, setId] = useState();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    socket.emit("join", { userID: userID });
  }, [userID]);

  if (!userID) return <Login setUserID={setUserID} />;

  return (
    <BrowserRouter>
      <div id="app">
        <Chats id={id} userID={userID} setUserID={setUserID} />
        <Routes>
          <Route path="/" element={<NoChat />} />
          <Route
            path="/:id"
            element={
              <Chat setId={setId} userID={userID} setUserID={setUserID} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
