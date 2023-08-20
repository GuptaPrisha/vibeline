import "./Chat.scss";
import Background from "../../assets/pic.png";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const [recieverID, setRecieverID] = useState(null);
  const [recieverProfile, setRecieverProfile] = useState(null);

  useEffect(() => {
    const id = chat.participants.filter((x) => x !== props.userID)[0];
    setRecieverID(id);
  }, [chat.participants, props.userID]);

  useEffect(() => {
    // listen for the reciever's profile
    setRecieverProfile(null);
  }, [recieverID]);

  return (
    <div className="ChatComponent">
      <img src={Background} alt="" />
      <div className="background"></div>

      <div className="header">
        <div className="reciverDp"></div>
        <div className="reciverName">Reciever name</div>
        <div className="search"></div>
        <div className="clearHistory"></div>
        <div className="deleteChat"></div>
      </div>
    </div>
  );
}

// socket.emit("message", {message: message})
