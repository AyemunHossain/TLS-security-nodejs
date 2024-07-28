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

console.log({decryptData: decryptData("lQxo/bobnUeDlaIsNPTZSbvie2ssAfFlTgohePcK+ZUYWw+yjlyWCFa+0wf/THDfkE/g9WFn/jdPJIvM5eiKv1KDr5/y/EE/1a8yApAWYYdyg9JSqMMu+5Hiteax59qtGjnEoT8dIYXorlFKsjjjIwISICNANBmYpeFmLqmg2jPd3IWtDxIsN4mQvZEp9znHXEK23QHChKT0p1Ts7pnS2EeITevlCTYzjUTJdNVmAmLXLaOGSjBLutnj2X1oop6U2T904TaE2kQI6xdCJYqHSRGkEWUCGZuHyyRzVdt3v1aRFRKnEONzTDFLU4B7uv3qGo91pPMseAxy8c9HOi4bxQ==")})