process.env.UV_THREADPOOL_SIZE = Math.ceil(require("os").cpus().length * 1.5);

const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");

// middleware settings
const app = express();
app.use(bodyParser.json());
app.use(router);

console.log("Server listening on port: " + 9999);
app.listen(9999);

process.on("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit();
});

module.exports = app;
