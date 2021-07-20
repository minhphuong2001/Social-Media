const authRouter = require("./auth");
const postRouter = require("./post");
const uploadRouter = require("./upload"); 
const conversationRouter = require("./conversation"); 
const messageRouter = require("./message"); 
const errorHandle = require("../middleware/errorHandle");

module.exports = (app) => {
    app.use("/api/auth", authRouter);

    app.use("/api/post", postRouter);

    app.use("/api/upload", uploadRouter);

    app.use("/api/conversation", conversationRouter);

    app.use("/api/message", messageRouter);

    app.use(errorHandle);
}