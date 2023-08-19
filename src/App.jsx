import "./App.scss";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoChat from "./components/routes/NoChat";
import Chat from "./components/routes/Chat";
import Chats from "./components/common/Chats";

function App() {
  return (
    <BrowserRouter>
      <Chats />
      <Routes>
        <Route path="/" element={<NoChat />} />
        <Route path="/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
