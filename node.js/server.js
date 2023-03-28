const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// api
server.listen(port, () => {
  console.log("Server started on port 8000");
});
