const http = require("http");

//server is Eventemitter
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content_type", "text/html");
    res.write("<h1>I am anurag this is the homepage</h1>");
    res.end();
  }
  if (req.url === "/about") {
    res.write("I am anurag a b_tech student");
    res.end();
  }
  if (req.url === "/contact") {
    res.setHeader("Content_type", "text/plain");
    res.write("I am anurag contact me on 9334759512");
    res.end();
  }
});

//web server

const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Listening on ${PORT} 😊`);
});
