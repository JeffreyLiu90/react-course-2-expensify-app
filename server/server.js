const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "..", "public");

//use public directory to set up static assets
app.use(express.static(publicPath));

//if what person request isnt in public folder, give baxck index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(3000, () => {
  console.log("Server is up!");
});
