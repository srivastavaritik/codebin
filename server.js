const express = require("express");
const res = require("express/lib/response");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const code = `Welcome to text-share! 

# Use the commands in the top right corner
  to create a new file to share with others`;
  res.render("code-display", { code });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.listen(3000);
