// Load libraries.
const { ethers } = require("ethers");
const { hashMessage } = require("@ethersproject/hash");
const config = require("./config");


const isValidSignature = ({ walletAddress, message, signature }) => {
    try {
        const verifySigner = ethers.utils.recoverAddress(hashMessage(JSON.stringify(message)), signature);
        const currentTimestamp = Date.now();
        return (
            verifySigner.toLowerCase() === walletAddress.toLowerCase() && // valid wallet address
            Math.abs(message.timestamp - currentTimestamp) < 20 * 1000 && // valid message timestamp
            currentTimestamp < message.timestamp + config.msgDeadline // valid message deadline
        );
    } catch (e) {
        console.error(e);
        return false;
    }
};

const isValidAddress = async (address) => {
    try {
        return ethers.utils.isAddress(await getAddress(address));
    } catch (e) {
        console.error(e);
        return false;
    }
};

const getAddress = async (address) => {
    try {
        let convertedAddress = address.toLowerCase();

        if (convertedAddress.includes(".eth")) {
            convertedAddress = await getEnsAddress(address);
        }

        return ethers.utils.getAddress(convertedAddress).toLowerCase();
    } catch (err) {
        return null;
    }
};

const getEnsAddress = async (address) => {
    const provider = new ethers.providers.JsonRpcProvider(config.jsonRpcProviderMainnet);

    try {
        const resolvedAddress = await provider.resolveName(address);

        try {
            return getAddress(resolvedAddress);
        } catch {
            console.warn(`${resolvedAddress} resolved ENS adrress not valid`);
            return null;
        }
    } catch (e) {
        console.warn(`${address} cannot be resolved`, e);
        return null;
    }
};

module.exports = {
    isValidSignature,
    isValidAddress
};
