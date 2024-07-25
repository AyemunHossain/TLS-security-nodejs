const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const PUBLIC_KEY = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, "public_key.pem"));
const PRIVATE_KEY = process.env.PRIVATE_KEY || fs.readFileSync(path.join(__dirname, "private_key.pem"));

const encryptData = (data) => {
    try {
        const buffer = Buffer.from(data, "utf8");
        const encrypted = crypto.publicEncrypt(
            {
                key: PUBLIC_KEY,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            buffer
        );
        return encrypted.toString("base64");
    } catch (err) {
        console.log("utils.js: encryptData:", err);
        return false;
    }
};

const decryptData = (data) => {
    try {
        const buffer = Buffer.from(data, "base64");
        const decrypted = crypto.privateDecrypt(
            {
                key: PRIVATE_KEY,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            buffer
        );
        return decrypted.toString("utf8");
    } catch (err) {
        console.log("utils.js: decryptData:", err);
        return false;
    }
};

console.log({decryptData: decryptData("v3p5vnJRKhrcy6JxxvWBFWzuksRqVAKpExMP1RbgAH7nPzm3vyYzEZ8pgBLqbPlEu9YC3V3xmYyGuw9Jl474iTwXczlVfpqDnoyj1WkRu+reeT4XBkSQYiTyM/QsFsnbmHJl+i59H4xDeBNPv7d3P3mYbbXIo85PDRFTCktqSfE6EDCwgXks4X1nAfSd6cqZ3ojAJLAxRvOAUXwfD93rAjdTZ1omEiXFCV3nOFvB019pdy+qDGvd+ib/gbbznLokA0Uin8+X4CW2OJRMPQPXC8xT/Iw0+PF4xsIxLynEpq2Ot/Yx6tVsAdqfo0xW9uutlCEfh0o59tfTnbRcIszMeA==")})