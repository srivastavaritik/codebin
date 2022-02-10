const express = require('express')
const res = require('express/lib/response')
const app = express()
app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('code-display')
})

app.listen(3000)