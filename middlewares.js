const config = require("./config");

const checkAuth = (req, res, next) => {
    try {
        const apiKey = req.header("x-api-key");

        if (apiKey && config.apiKey === apiKey) {
            next();
        } else {
            res.status(401).send("Unauthorized call");
        }
    } catch (e) {
        console.error(e);
        res.status(400).send();
    }
};

const checkAdmin = (req, res, next) => {
    try {
        if (
            isValidSignature({
                walletAddress: req.body.walletAddress,
                message: req.body.message,
                signature: req.body.signature
            }) &&
            config.admins.includes(req.body.walletAddress.toLowerCase())
        ) {
            next();
        } else {
            res.status(401).send("Unauthorized call");
        }
    } catch (e) {
        console.error(e);
        res.status(400).send();
    }
};

module.exports = {
    checkAuth,
    checkAdmin
};
