const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");
const { connect } = require("http2");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3600;

//log requests
app.use(morgan("tiny"));

//connect mongodb
connectDB();
//parse request
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);