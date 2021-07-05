const authRouter = require("./auth");
const postRouter = require("./post")
const errorHandle = require("../middleware/errorHandle");

module.exports = (app) => {
    app.use("/api/auth", authRouter);

    app.use("/api/post", postRouter);

    app.use(errorHandle);
}