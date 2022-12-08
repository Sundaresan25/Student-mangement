const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const AuthRoute = require("./routes/auth");

const uri =""

// async function connect() {
//   try {
//     await mongoose.connect(uri);
//     console.log("Connected");
//   } catch (error) {
//     console.log(error, "err");
//   }
// }

// connect();

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("open", (err) => {
  console.log("DB Established");
});

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uplods", express.static("uplods"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use("/api", AuthRoute);
