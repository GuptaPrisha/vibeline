import "./Chats.scss";

import { useNavigate } from "react-router-dom";

export default function Chats(props) {
  const navigate = useNavigate();

  return (
    <div className="ChatsComponent">
      <div className="header">
        <div className="dp"></div>
        <div className="search"></div>
      </div>
      <div className="chats">
        <div
          className={`chatCard ${props.id === "1" ? "active" : ""}`}
          onClick={() => {
            navigate("/1");
          }}
        >
          <div className="profile"></div>
          <div className="name">Chat 1</div>
        </div>
        <div
          className={`chatCard ${props.id === "2" ? "active" : ""}`}
          onClick={() => {
            navigate("/2");
          }}
        >
          <div className="profile"></div>
          <div className="name">Chat 2</div>
        </div>
      </div>
    </div>
  );
}
