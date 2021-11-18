const http = require("http");
const parser = require("./src/utils/parse.js");

PORT = 3005;
const sourcePathName = "./big_downloaded_files/test.csv";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Below starts working parser
    parser(sourcePathName);

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404! Wrong route");
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Data was written into result.csv");
});

server.listen(PORT, "localhost", () => {
  console.log("Server listening on port: ", PORT);
});
