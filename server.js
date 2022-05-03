const express = require("express");
const establishConnection = require("./config/db");
const app = express();
var cors = require("cors");
establishConnection();

app.use(cors());
//Init Middleware

app.use(express.json({ extended: false }));
//Define routes

app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server started on port : " + PORT));
