import "./Chats.scss";

import { useNavigate } from "react-router-dom";

/// a, b, c -> client emit (socket.emit), serven listen (socket.on)
/// d, e, f -> server emit (socket.emit), client listen (socket.on)

export default function Chats(props) {
  const navigate = useNavigate();

  return (
    <div className="ChatsComponent">
      <div className="header">
        <div className="dp">
          <img
            src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            alt=""
          />
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
          <div
            className="action"
            onClick={() => {
              props.setUserID(prompt("Username"));
            }}
          >
            <i className="fi fi-rr-edit"></i>
          </div>
        </div>
      </div>
      <div className="chats">
        {props.userID}
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
