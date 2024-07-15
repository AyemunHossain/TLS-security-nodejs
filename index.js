"use strict";
const fs = require("fs");;
const https = require("https");
const express = require("express");
const app = express();


const credentials = {
    key: fs.readFileSync("ssl/private.key"),
    cert: fs.readFileSync("ssl/bundle.crt"),
    dhparam: fs.readFileSync("ssl/dh-strong.pem"),
    requestCert: true,
    rejectUnauthorized: false,
};

const server = https.createServer(credentials, app);

server.listen(3000, () => {
    console.log("Server running at https://localhost:3000/");
});
