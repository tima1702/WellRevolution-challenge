import React, {useEffect} from "react";
import MessageList from "./MessageList";
import MessageSend from "./MessageSend";
import useConnectWS from "../../utils/useConnect";
import "./styles.css";

function Chat() {
  const [state, actions] = useConnectWS("ws://127.0.0.1:9090");

  console.log("2", state);
  if (!state.isOpenConnection) {
    return (
      <div className="Chat">
        <input
          value={state.author}
          placeholder="Enter Name"
          onChange={(e) => actions.setAuthor(e.target.value)}
        />
        <button onClick={() => (state.author ? actions.open() : null)}>
          Connect
        </button>
      </div>
    );
  }

  return (
    <div className="Chat">
      <MessageList list={state.messages} />
      <MessageSend
        isOpenConnection={state.isOpenConnection}
        send={actions.send}
      />
      {state.status}
    </div>
  );
}

export default Chat;
