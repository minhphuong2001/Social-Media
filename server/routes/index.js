const authRouter = require("./auth");
const postRouter = require("./post");
const uploadRouter = require("./upload");
const errorHandle = require("../middleware/errorHandle");

module.exports = (app) => {
    app.use("/api/auth", authRouter);

    app.use("/api/post", postRouter);

    app.use("/api/upload", uploadRouter);

    app.use(errorHandle);
}