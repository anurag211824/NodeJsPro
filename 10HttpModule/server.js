import http from "http";

// Server is EventEmitter
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>I am Anurag, this is the homepage</h1>");
    res.end();
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "text/plain");
    res.write("I am Anurag, a B.Tech student");
    res.end();
  } else if (req.url === "/contact") {
    res.setHeader("Content-Type", "text/plain");
    res.write("I am Anurag, contact me on 9334759512");
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.write("404 Not Found");
    res.end();
  }
});

// Start the web server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} 😊`);
});
