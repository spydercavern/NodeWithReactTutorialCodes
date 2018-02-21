// common js modules in the server as nodejs has only support for modules
// node js do not have in built support for es2015 modules natively yet.

const express = require("express");

// instantiate an express app
const app = express();

// we are using heroku hosting, so whenever heroku runs it injects the PORT value to the environment variables.
const PORT = process.env.PORT || 5000;

// default router
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.get("/test", (req, res) => {
  res.send({
    data: "test",
    status: "success"
  });
});

// start express app to listen to this port.
app.listen(PORT);
