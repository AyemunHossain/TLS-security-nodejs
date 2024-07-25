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

const generateKeys = () => {
    try {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        });

        fs.writeFileSync(path.join(__dirname, "public_key.pem"), publicKey);
        fs.writeFileSync(path.join(__dirname, "private_key.pem"), privateKey);
        return true;
    } catch (err) {
        console.log("utils.js: generateKeys:", err);
        return false;
    }
};


const verifyKeys = () => {
    try {
        if (!fs.existsSync(PUBLIC_KEY) || !fs.existsSync(PRIVATE_KEY)) {
            generateKeys();
            return true;
        }
        return true;
    } catch (err) {
        console.log("utils.js: verifyKeys:", err);
        return false;
    }
};

const verifySignature = (data, signature) => {
    try {
        const buffer = Buffer.from(signature, "base64");
        const verifier = crypto.createVerify("RSA-SHA256");
        verifier.update(data);
        verifier.end();
        return verifier.verify(PUBLIC_KEY, buffer);
    } catch (err) {
        console.log("utils.js: verifySignature:", err);
        return false;
    }
};

const signData = (data) => {
    try {
        const signer = crypto.createSign("RSA-SHA256");
        signer.update(data);
        signer.end();
        return signer.sign(PRIVATE_KEY).toString("base64");
    } catch (err) {
        console.log("utils.js: signData:", err);
        return false;
    }
};

const generateHash = (data) => {
    try {
        const buffer = Buffer.from(data, "utf8");
        const hash = crypto.createHash("sha256");
        hash.update(buffer);
        return hash.digest("hex");
    } catch (err) {
        console.log("utils.js: generateHash:", err);
        return false;
    }
};

const generateCryptographicallySecureRandomString = (length) => {
    try {
        return crypto.randomBytes(length).toString("hex");
    } catch (err) {
        console.log("utils.js: generateCryptographicallySecureRandomString:", err);
        return false;
    }
};

const generateChecksum = (data) => {
    try {
        return crypto.createHash('sha256').update(data).digest('hex');
    } catch (err) {
        console.log("utils.js: generateChecksum:", err);
        return false;
    }
};

module.exports = {
    encryptData,
    decryptData,
    generateKeys,
    verifyKeys,
    verifySignature,
    signData,
    generateHash,
    generateCryptographicallySecureRandomString,
    generateChecksum
};