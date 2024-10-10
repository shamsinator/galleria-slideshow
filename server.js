const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("src/app/data.json");
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");

server.use(cors());
server.use(middlewares);

// Custom routes
server.use(jsonServer.rewriter(routes));

// Default router
server.use(router);

server.listen(3500, () => {
  console.log("JSON Server is running on port 3500");
});
