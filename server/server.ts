const Server = require("./ws");
const mongoose = require("mongoose");

const ws = new Server();

mongoose.connect("mongodb://db:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = mongoose.model("Message", {
  author: String,
  message: String,
  time: Date,
});

interface MessageRecord {
  _id: string;
  author: string;
  message: string;
  time: Date;
}

ws.onNewMessage(async (author: string, value: string) =>
  new Message({
    author,
    message: value,
    time: new Date(),
  }).save()
);

ws.setMessageOnOpen((callback) => {
  Message.find({}, "author message time", function (err, list) {
    if (err) return console.log("ERROR:", err);
    callback({
      oper: "list",
      value: list.map(({_id, message, time, author}: MessageRecord) => ({
        author,
        _id,
        message,
        time: time,
      })),
    });
  })
    .sort("-time")
    .limit(20);
});

ws.start(9090);
