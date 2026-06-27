require("dotenv").config();

const http = require("http");

const app = require("./app");

const server = http.createServer(app);

server.timeout = 600000;

server.headersTimeout = 610000;

server.keepAliveTimeout = 600000;

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log("================================");

  console.log("Server Running");

  console.log("Port :", PORT);

  console.log("================================");

});