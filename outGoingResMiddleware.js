
const secret = require('./utils');

// const encryptOutGoingResponse = (req, res, next) => {
    
//     console.log("hoho2");

//     const originalSend = res.json;

//     console.log({originalSend})
//     res.json = function (body) {
        
//         // If the response body is a Buffer, convert it to a string
//         if (Buffer.isBuffer(body)) {
//             body = body.toString('utf8');
//         }
//         console.log({ body });

//         try {
//             if (data) {
//                 // Encrypt the outgoing response data
//                 for (const key in data) {
//                     if (Object.hasOwnProperty.call(data, key)) {
//                         const element = data[key];
//                         data[key] = secret.encryptData(element);
//                     }
//                 }
//                 // Call the original send function with the encrypted data
//                 originalSend.call(this, data);
//             }
//         } catch (err) {
//             console.error("outGoingResMiddleware.js: encryptOutGoingResponse", err);
//             res.status(500).send('Error processing request');
//         } finally {
//             console.log("hello222");
//         }
//     };

//     next();
// };

// module.exports = encryptOutGoingResponse;


// Middleware to encrypt response
const encryptOutgoingResponse = (req, res, next) => {
    const chunks = [];
    const originalWrite = res.write;
    const originalEnd = res.end;

    // // Override `res.write` to capture data
    res.write = function (chunk, encoding, callback) {
        chunks.push(chunk);
        originalWrite.call(this, chunk, encoding, callback);
    };

    // Override `res.end` to finalize and encrypt data
    res.end = function (chunk, encoding, callback) {

        if (chunk) {
            chunks.push(chunk);
        }

        const body = Buffer.concat(chunks).toString('utf8');
        const encryptedBody =  secret.encryptData(body);
        console.log({encryptedBody})
        const encryptedBuffer = Buffer.from(encryptedBody, 'base64');
        originalEnd.call(this,encryptedBuffer, 'base64', callback);
    };

    next();
};

module.exports = encryptOutgoingResponse;