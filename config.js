const dotenv = require("dotenv");
dotenv.config();

const config = {
    serverPort: parseInt(process.env.SERVER_PORT || "8000", 10),
    mongoUrl: process.env.MONGO_URL,
    whitelist: ["127.0.0.1"],
    apiKey: process.env.API_SECRET_KEY,
    jsonRpcProviderMainnet: process.env.JSON_RPC_PROVIDER_MAINNET,
    dctAddress: process.env.DCT_ADDRESS,
    dclAddress: process.env.DCL_ADDRESS,
    dcNftAddress: process.env.DC_NFT_ADDRESS,
    admins: JSON.parse(process.env.ADMINS).map((address) => address.toLowerCase()),
    signerPrivateKey: process.env.SIGNER_KEY,
    chainId: process.env.CHAIN_ID,
    dctDecimals: process.env.DCT_DECIMALS,
    dclDecimals: process.env.DCL_DECIMALS,
    msgDeadline: process.env.MSG_DEADLINE,
    ipfsProjectId: process.env.IPFS_PROJECT_ID,
    ipfsProjectSecret: process.env.IPFS_PROJECT_SECRET
};

module.exports = {
    ...config
};
