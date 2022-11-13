const express = require("express");
const res = require("express/lib/response");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}))

const Document = require("./models/Document")
const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://admin:8480pass@codebin.gk99noa.mongodb.net",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.get("/", (req, res) => {
  const code = `Welcome to text-share! 

# Use the commands in the top right corner
  to create a new file to share with others`;
  res.render("code-display", { code, language: 'plaintext' });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post('/save', async(req,res) => {
  const value = req.body.value
  try {
    const document = await Document.create({value})
    res.redirect(`/${document.id}`)
  } catch (error) {
    res.render('new', {value})
  }
  console.log(value)
})

app.get('/:id/duplicate', async(req,res)=>{
  const id = req.params.id;
  try {
    const document = await Document.findById(id);

    res.render("new", { value: document.value });
  } catch (error) {
    res.redirect(`/${id}`);
  }
})

app.get('/:id', async(req, res) => {
  const id = req.params.id
  try {
    const document = await Document.findById(id)

    res.render('code-display',{code:  document.value, id})
  } catch (error) {
    res.redirect('/')
  }
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
