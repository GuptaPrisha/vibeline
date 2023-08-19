import "./Chat.scss";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Chat(props) {
  const id = useParams().id;

  useEffect(() => {
    props.setId(id);
  }, [id]);

  return <div className="ChatComponent">vhb</div>;
}
