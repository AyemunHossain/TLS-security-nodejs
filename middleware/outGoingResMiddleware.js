
const secret = require('../utils/utils');

// Middleware to encrypt response
const encryptOutgoingResponse = (req, res, next) => {
    const chunks = [];
    const originalWrite = res.write;
    const originalEnd = res.end;

    // Override `res.write` to capture data
    res.write = function (chunk, encoding, callback) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
        originalWrite.apply(res, arguments);
    };

    // Override `res.end` to finalize and encrypt data
    res.end = function (chunk, encoding, callback) {
        if (chunk) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
        }

        const body = Buffer.concat(chunks).toString('utf8');
        const encryptedBody = secret.encryptData(body);
        const encryptedBodyString = JSON.stringify(encryptedBody);
        
        // Convert the encrypted body to a buffer
        const encryptedBuffer = Buffer.from(encryptedBodyString, 'utf8');
        
        // Set the content length to the encrypted buffer length
        res.setHeader(`Content-Length`, encryptedBodyString.length);
        res.setHeader('Content-Type', 'application/json');

        // Call the original `end` with the encrypted buffer
        originalEnd.call(this, encryptedBuffer, encoding, callback);
    };

    next();
};

module.exports = encryptOutgoingResponse;