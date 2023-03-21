const http = require('http');
const app = require('./app');
const server = http.createServer(app);

// api
server.listen(3000, () => {
  console.log("Server started on port 8000");
});
