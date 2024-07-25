"use strict";

const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const routes = require('./routes');
const inComingReqMiddleware = require("./inComingReqMiddleware");
const outGoingResMiddleware = require("./outGoingResMiddleware");

app.use(inComingReqMiddleware);

app.get("/", (req, res, next) => {
    return res.status(200).json({
        status: true,
        status_message: "Hello world!!!"
    });
});

app.use('/api', outGoingResMiddleware, routes);

const credentials = {
    key: fs.readFileSync("ssl/private.key"),
    cert: fs.readFileSync("ssl/bundle.crt"),
    dhparam: fs.readFileSync("ssl/dh-strong.pem"),
    requestCert: true,
    rejectUnauthorized: false
};

const server = http.createServer( app);

server.listen(3000, () => {
    console.log("Server running at https://localhost:3000/");
});
