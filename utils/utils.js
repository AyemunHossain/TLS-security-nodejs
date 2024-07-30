const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const PUBLIC_KEY = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, "public_key.pem"), "utf8");
const PRIVATE_KEY = process.env.PRIVATE_KEY || fs.readFileSync(path.join(__dirname, "private_key.pem"), "utf8");

const encryptData = (data) => {
    try {
        if (!data) return false;
        // Generate a random AES key
        const aesKey = crypto.randomBytes(32); // 256-bit key for AES-256
        const iv = crypto.randomBytes(16); // Initialization vector for AES

        // Encrypt the data with AES key
        const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
        let encryptedData = cipher.update(data, 'utf8', 'base64');
        encryptedData += cipher.final('base64');

        // Encrypt the AES key with RSA public key
        const encryptedAesKey = crypto.publicEncrypt(
            {
                key: PUBLIC_KEY,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            aesKey
        );

        return {
            iv: iv.toString('base64'),
            encryptedData: encryptedData,
            encryptedKey: encryptedAesKey.toString('base64')
        };
    } catch (err) {
        console.log("utils.js: encryptData:", err);
        return false;
    }
};

const decryptData = (encryptedPackage) => {
    try {
        if (!encryptedPackage) return false;

        const { iv, encryptedData, encryptedKey } = encryptedPackage;

        if(!iv || !encryptedData || !encryptedKey) return false;

        // Decrypt the AES key with RSA private key
        const aesKey = crypto.privateDecrypt(
            {
                key: PRIVATE_KEY,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            Buffer.from(encryptedKey, "base64")
        );

        // Decrypt the data with AES key
        const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, Buffer.from(iv, "base64"));
        let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');

        return decryptedData;
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
        if (!fs.existsSync(path.join(__dirname, "public_key.pem")) || !fs.existsSync(path.join(__dirname, "private_key.pem"))) {
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
        if(!data || typeof(data)!='string') return false;

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
        if(!data) return false;

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
        if(!length) return false;
        return crypto.randomBytes(length).toString("hex");
    } catch (err) {
        console.log("utils.js: generateCryptographicallySecureRandomString:", err);
        return false;
    }
};

const generateChecksum = (data) => {
    try {
        if(!data) return false;
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

// Usage example
// newFunction();
// function newFunction() {
//     const encryptedResult = encryptData("This is the data to be encrypted.");
//     if (encryptedResult) {
//         console.log("Encrypted Data:", encryptedResult.encryptedData);
//         console.log("Encrypted AES Key:", encryptedResult.encryptedKey);
//         console.log("Initialization Vector:", encryptedResult.iv);

//         const decryptedResult = decryptData(encryptedResult);
//         console.log("Decrypted Data:", decryptedResult);
//     }
// }