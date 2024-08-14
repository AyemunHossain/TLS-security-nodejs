const secret = require("./utils/utils");

const generateKeys = async() => {
    try {
        await secret.generateKeys();

    } catch (err) {
        console.log("scripts.js: generateKeys:", err);
        return false;
    }
};

(async()=>{
    await generateKeys();
})();