const express = require("express");

const { api } = require("../config.js");

const user = require("./components/user/network");

const app = express();

//router
app.use("/api/user", user);

app.listen(api.port, () => {
  console.log("Api escuchando en el puerto", api.port);
});
