const WebSocketLib = require("ws");

interface Operation {
  oper: string;
  vlaue: any;
}

interface Client {
  ws: any;
  author: string;
}

class WebSocketServer {
  private _clients: any;
  private _handleNewMessage: (author: string, message: string) => void;
  private _openConnectionMessage: (data) => void;

  constructor() {
    this._clients = {};
  }

  public set openConnectionMessage(cb: () => void) {
    this._openConnectionMessage = cb;
  }

  public onNewMessage(callback: (author: string, value: string) => any) {
    this._handleNewMessage = (author, message) => {
      callback(author, message).then((record) =>
        this.send({
          oper: "new_message",
          value: record,
        })
      );
    };
  }

  public setMessageOnOpen(cb: (data) => any) {
    this._openConnectionMessage = cb;
  }

  public send(message: any) {
    Object.values(this._clients).forEach(({ws}) => {
      ws.send(JSON.stringify(message));
    });
  }

  public start(port: number) {
    const wss = new WebSocketLib.Server({port});

    console.log(this._clients);

    wss.on("connection", async (ws) => {
      const id = new Date().getTime();
      this._clients[id] = {ws, author: ""};

      if (this._openConnectionMessage) {
        this._openConnectionMessage((data: Operation) => {
          ws.send(JSON.stringify(data));
        });
      }

      console.log(`Active clients: ${Object.keys(this._clients).length}`);

      ws.on("message", (raw) => {
        try {
          const data = JSON.parse(raw);

          switch (data.oper) {
            case "set_name":
              this._clients[id].author = data.value;
              this.send({
                oper: "system_message",
                value: {
                  time: new Date(),
                  __id: new Date().toString(),
                  author: "system",
                  message: `${data.value} connected`,
                },
              });
              break;
            case "new_message":
              this._handleNewMessage(this._clients[id].author, data.message);

              break;
            default:
          }
        } catch (err) {
          console.error(err);
        }
      });

      ws.on("close", () => {
        this.send({
          oper: "system_message",
          value: {
            time: new Date(),
            __id: new Date(),
            author: "system",
            message: `${
              (this._clients[id] && this._clients[id].author) || "user"
            } disconnected`,
          },
        });
        delete this._clients[id];
      });
    });
  }
}

module.exports = WebSocketServer;
