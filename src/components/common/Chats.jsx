import "./Chats.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../lib/constants";

/// a, b, c -> client emit (socket.emit), serven listen (socket.on)
/// d, e, f -> server emit (socket.emit), client listen (socket.on)

// -> 1
// -> 1 + 1 = 2
// -> 1 + 1 + 1 = 3

// -> 1
// !> 1 - 1 = 0
// -> 1
// !> 1 - 1 = 0
// -> 1

export default function Chats(props) {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.off("user");
    socket.emit("sendUser", { token: localStorage.getItem("token") });
    socket.on("user", (data) => {
      if (data.status !== 200) {
        localStorage.clear();
        props.setUserID(null);
        return;
      }
      const user = data.user;
      setUser(user);
    });

    () => {
      return socket.off("user");
    };
  }, [props.userID]);

  useEffect(() => {
    socket.emit("sendChats", { userID: props.userID });
    socket.on("chats", (data) => {
      setChats(data);
      console.log(data);
    });
    //for unmount use callback
    return () => {
      socket.off("chats");
    };
  }, []);

  if (!user) return null;

  return (
    <div className="ChatsComponent">
      <div className="header">
        <div className="dp">
          <img src={user.dp} alt="" />
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
        {!chats ? (
          <p>connect to people to start chatting</p>
        ) : (
          chats.map((chat) => {
            return (
              <div
                className={`chatCard ${props.id === chat.id ? "active" : ""}`}
                key={chat.id}
                onClick={() => {
                  navigate("/" + chat.id);
                }}
              >
                <div className="profile">
                  <img src={chat.participants[0].dp} alt="dp" />
                </div>
                <div className="box">
                  <div className="name">{chat.participants[0].name}</div>
                  <div className="username">
                    {chat.participants[0].username}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
