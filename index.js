"use strict";
const http = require("http");
const express = require("express");
const app = express();
const routes = require('./routes/routes');
const inComingReqMiddleware = require("./middleware/inComingReqMiddleware");
const outGoingResMiddleware = require("./middleware/outGoingResMiddleware");

app.use(inComingReqMiddleware);

app.get("/", (req, res, next) => {
    return res.status(200).json({
        status: true,
        status_message: "Hello world!!!"
    });
});

app.use('/api', outGoingResMiddleware, routes);

const server = http.createServer( app);

server.listen(3000, () => {
    console.log("Server running at https://localhost:3000/");
});
