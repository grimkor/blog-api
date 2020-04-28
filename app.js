const express = require("express");
const http = require("http");
const postsRoute = require("./routes/posts");
const imagesRoute = require("./routes/images");

const app = express();
server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("hello world");
});

postsRoute(app);
imagesRoute(app);

const PORT = process.env.API_PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
