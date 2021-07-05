const express = require("express");
const router = require("./routes")
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors")
const connectDB = require("./config/database")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));

router(app);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})