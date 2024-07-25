const secret = require('./utils');

const decryptIncomingRequest = (req, res, next) => {
    console.log("heeee");

    if (req.method === 'GET') {
        if (Object.keys(req.query).length) {
            for (const key in req.query) {
                if (Object.hasOwnProperty.call(req.query, key)) {
                    const element = req.query[key];
                    req.query[key] = secret.decryptData(element);
                }
            }
        }
    } else if (req.method === 'POST') {
        if (req.body) {
            for (const key in req.body) {
                if (Object.hasOwnProperty.call(req.body, key)) {
                    const element = req.body[key];
                    req.body[key] = secret.decryptData(element);
                }
            }
        }
    }

    next();
};

module.exports = decryptIncomingRequest;