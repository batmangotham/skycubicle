const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
// const http = require('http');
// const contact = require("./contact")
// Route imports
const contact = require("./app/routes/contact");
const app = express();
// template engine
app.set('views', './app/views')
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
// MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 50000
}));


// local
mongoose.connect('mongodb://localhost/skycubicle', {
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to MongoDB...")
}).catch(err => {
  console.error("Could not connect to MongoDB")
  console.log(err);
});




// routes
app.use("/api/contact", contact);




// set the static files location /public/img will be /img for users

app.use('/', express.static(path.join(__dirname)));
app.use('/', express.static(path.join(__dirname, '/index.html')));


// Server

const port = process.env.PORT || 8080;
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.listen(port, () => console.log(`Listening on port ${port}...`));