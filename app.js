const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");
const path = require("path");
const app = express();
const morgan = require("morgan");
require("dotenv").config();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", routes);

// เสิร์ฟไฟล์ที่อัปโหลดไว้
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

module.exports = app;
