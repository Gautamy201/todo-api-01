const http = require("http");
const port = process.env.PORT || 3000;
const cors = require("cors");
const app = require("./app");
const server = http.createServer(app);
app.use(cors());

server.listen(port, () => console.log("server start " + port));
