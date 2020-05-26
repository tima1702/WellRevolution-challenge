import {useEffect, useState, useCallback} from "react";

export type MessageItem = {
  _id: string;
  author: string;
  message: string;
  time: Date;
};

const statuses = {
  disconnected: "Disconnected",
  connect: "Connecting...",
  error: "Connection error! Reconnecting is in progress...",
  connected: "Connected!",
  close: "Connection broken! Reconnecting is in progress...",
};

interface WsConnection {
  isOpenConnection: boolean;
  status: string;
  author: string;
  messages: MessageItem[];
}

interface Actions {
  open: () => void;
  send: (message: string) => void;
  close: () => void;
  setAuthor: (author: string) => void;
}

type Operation = {
  oper: string;
  value: any;
};

function useConnectWs(host: any): [WsConnection, Actions] {
  const [socket, setSocket] = useState<any>();
  const [actions, setActions] = useState({
    open: () => {},
    send: (message: string) => {},
    close: () => {},
    setAuthor: (author: string) => {},
  });
  const [state, setState] = useState({
    isOpenConnection: false,
    author: "",
    status: statuses.disconnected,
    messages: new Array<MessageItem>(),
  });

  useEffect(() => {
    setActions({
      setAuthor: (author: string) => setState({...state, author}),
      open: () => {
        setState({...state, isOpenConnection: true, author: state.author});
        connect(state.author);
      },
      send: (message: string) => {
        socket.send(JSON.stringify({oper: "new_message", message}));
      },
      close: () => {
        setState({...state, isOpenConnection: false});
        socket.close();
      },
    });
  }, [state]);

  const connect = (author: string) => {
    setState({...state, status: statuses.connected, isOpenConnection: true});
    let socket1 = new WebSocket(host);
    socket1.onopen = () =>
      socket1.send(JSON.stringify({oper: "set_name", value: state.author}));
    setSocket(socket1);
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event: any) => {
        const data: Operation = JSON.parse(event.data);

        if (Array.isArray(data.value)) {
          const filt = (arr: MessageItem[]) => {
            const obj: Record<string, MessageItem> = {};

            arr.forEach((item) => (obj[item._id] = item));

            return Object.values(obj);
          };

          setState({
            ...state,
            messages: filt([...state.messages, ...data.value]).sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            ),
          });
        } else {
          setState({
            ...state,
            messages: [...state.messages, data.value],
          });
        }

        socket.onopen = () => {
          changeStatus(statuses.connected);
          socket.send(JSON.stringify({oper: "set_name", value: state.author}));
        };
        socket.onclose = () => changeStatus(statuses.close);
        socket.onerror = () => changeStatus(statuses.error);
      };
    }
  }, [socket, state.messages]);

  const changeStatus = (status: string) => setState({...state, status});

  useEffect(() => {
    if (
      state.isOpenConnection &&
      state.status !== statuses.connected &&
      state.status !== statuses.connect
    ) {
      let timeout: number = 0;
      switch (statuses.error) {
        case statuses.close:
          timeout = window.setTimeout(() => {
            connect(state.author);
          }, 1000);
          break;
        case statuses.error:
          timeout = window.setTimeout(() => {
            connect(state.author);
          }, 1000);
          break;

        default:
          break;
      }

      return () => clearTimeout(timeout);
    }
  }, [state.status]);

  const closeSocket = useCallback(() => socket.close, [socket]);

  useEffect(() => {
    return () => closeSocket();
  }, []);

  return [state, actions];
}

export default useConnectWs;
