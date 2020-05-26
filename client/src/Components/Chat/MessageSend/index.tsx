import React, {useEffect, useState} from "react";

type MessageSendProps = {
  isOpenConnection: boolean;
  send: (message: string) => void;
};

function MessageSend({isOpenConnection, send}: MessageSendProps) {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="print message"
      />
      <button
        onClick={() => {
          send(value);
          setValue("");
        }}
      >
        Send
      </button>
    </div>
  );
}

export default MessageSend;
