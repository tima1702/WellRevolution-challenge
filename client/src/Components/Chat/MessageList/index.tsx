import React from "react";
import {MessageItem as MessageItemType} from "../../../utils/useConnect";
import MessageItem from "../MessageItem";
import "./styles.css";

type MessageListProps = {
  list: Record<number, MessageItemType>;
};

function MessageList({list}: MessageListProps) {
  console.log("LIST", list);
  console.log(JSON.stringify(list));

  return (
    <div className="MessageList">
      {Object.values(list).map((item) => {
        console.log("ttt", item);

        return (
          <MessageItem
            key={item._id}
            author={item.author}
            message={item.message}
          />
        );
      })}
    </div>
  );
}

export default MessageList;
