import "./Chat.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "../../assets/pic.png";
import { socket } from "../../lib/constants";

// props: { userID: string, setId: Function }
export default function Chat(props) {
  const id = useParams().id;
  useEffect(() => {
    props.setId(id);
  }, [id]);

  // anything that changes after first render, will be a state only rather than a plain variable
  const [chat, setChat] = useState({
    id: "1",
    participants: ["userID1", "userID2"],
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // listen for the messages
  }, [id]);

  const [recieverID, setRecieverID] = useState("");
  const [recieverProfile, setRecieverProfile] = useState(null);

  useEffect(() => {
    const id = chat.participants.filter((x) => x !== props.userID)[0];
    setRecieverID(id);
  }, [chat.participants, props.userID]);

  useEffect(() => {
    // listen for the reciever's profile
    setRecieverProfile(null);
  }, [recieverID]);

  useEffect(() => {
    socket.off("recvMessage");
    socket.on("recvMessage", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off("recvMessage");
    };
  }, [messages]);

  const [currentMessage, setCurrentMessage] = useState("");

  console.log(messages);

  return (
    <div className="ChatComponent">
      <img src={Background} className="chat-background" />
      <div className="background"></div>

      <div className="chat">
        <div className="header">
          <div className="dp">
            <img
              src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt=""
            />
          </div>
          <div className="info">
            <div className="name">Reciever name</div>
            <div className="status">typing...</div>
            <input
              type="text"
              placeholder="reciever name"
              value={recieverID}
              onChange={(e) => {
                setRecieverID(e.target.value);
              }}
            />
          </div>
          <div className="action">
            <i className="fi fi-rr-search"></i>
          </div>
          <div className="action">
            <i className="fi fi-rr-trash"></i>
          </div>
          <div className="action">
            <i className="fi fi-rr-time-delete"></i>
          </div>
        </div>
        <div className="messages-area">
          {messages.map((message) => {
            if (message.recieverID === props.userID) {
              return (
                <div className="message left">
                  {/* <div className="tagged-message"></div> */}
                  <div className="wrapper">
                    <div className="content">{message.message}</div>
                    <div className="time">{message.time}</div>
                  </div>
                </div>
              );
            }
            return (
              <div className="message right">
                {/* <div className="tagged-message"></div> */}
                <div className="wrapper">
                  <div className="content">{message.message}</div>
                  <div className="time">{message.time}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="wrapper">
            <div className="action">
              <i className="fi fi-rr-clip"></i>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Type a message"
                value={currentMessage}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document.getElementById("send-btn").click();
                  }
                }}
              />
            </div>
            <div className="action">
              <i className="fi fi-rr-grin-alt"></i>
            </div>
            <div
              id="send-btn"
              className="action"
              onClick={() => {
                socket.emit("sendMessage", {
                  message: currentMessage,
                  recieverID: recieverID,
                  time: Date.now(),
                });
                setMessages([
                  ...messages,
                  {
                    message: currentMessage,
                    recieverID: recieverID,
                    time: Date.now(),
                  },
                ]);
                setCurrentMessage("");
              }}
            >
              <i className="fi fi-rr-paper-plane"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
