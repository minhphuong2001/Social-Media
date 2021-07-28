const express = require("express");
const router = require("./routes")
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/database");
const http = require("http");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));

// socket
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((value) => value.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(value => value.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((value) => value.userId === userId);
}

io.on("connection", (socket) => {
    //when connect
    console.log("Connect socketIO successfully!");
    // io.emit("Welcome", "Hello this is socket server!")

    // take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });


    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            content
        })
    })

    //when disconnect
    socket.on("disconnect", () => {
        console.log("Disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })

})

// router
router(app);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})