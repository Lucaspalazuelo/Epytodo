const path = require('path');

const express = require('express')
const app = express()
const port = 3000
const body_parser = require('body-parser');
var bcrypt = require('bcryptjs')

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
require('./routes/user/user')(app, bcrypt)
require('./routes/todos/todos')(app, bcrypt)

app.listen(port, function(err) {
    if (err) {
        console.log(`something gone wrong`, err)
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
})
