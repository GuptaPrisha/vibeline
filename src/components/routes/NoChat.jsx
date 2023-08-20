import "./NoChat.scss";

import Background from "../../assets/pic.png";

export default function NoChat() {
  return (
    <div className="NoChatComponent">
      <img src={Background} alt="" />
      <div className="background"></div>
    </div>
  );
}
