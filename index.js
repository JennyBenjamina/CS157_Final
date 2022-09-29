const express = require("express");
const database = require("./database.js");
const app = express();

const routes = require("./routes/wiki.js");
const userRoutes = require("./routes/user.js");

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));



app.use("/wiki", routes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000);
//app.listen(3000) in repl environment