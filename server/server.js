const server = require("./app")

server.listen(process.env.SERVER_PORT, () => {
  console.log("server is listening on port")
})