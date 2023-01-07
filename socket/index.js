const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Socket init and sending msg to client
io.on("connection", (socket) => {
  socket.on("setdata", (arg) => {
    io.emit("sentToAdmin", arg);
  });
});
