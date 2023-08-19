import "./App.scss";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoChat from "./components/routes/NoChat";
import Chat from "./components/routes/Chat";
import Chats from "./components/common/Chats";
import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  return (
    <BrowserRouter>
      <div id="app">
        <Chats id={id} />
        <Routes>
          <Route path="/" element={<NoChat />} />
          <Route path="/:id" element={<Chat setId={setId} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
