import React from "react";
import "./styles.css";

type MessageItemProps = {
  author: string;
  message: string;
};

function MessageItem({author, message}: MessageItemProps) {
  return (
    <div className="MessageItem">
      <div className="MessageItem__author">{`${author}:` || ""}</div>
      <div className="MessageItem__message">{message || ""}</div>
    </div>
  );
}

export default MessageItem;
