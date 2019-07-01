const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
// const http = require('http');
// const contact = require("./contact")

const app = express();

// MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 50000
}));

// routes
// app.use("/api/contact", contact);




// set the static files location /public/img will be /img for users

app.use('/', express.static(path.join(__dirname)));
app.use('/', express.static(path.join(__dirname, '/index.html')));


// Server

const port = process.env.PORT || 8080;
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.listen(port, () => console.log(`Listening on port ${port}...`));