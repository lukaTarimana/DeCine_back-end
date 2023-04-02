// Load configuration.
const config = require("./config");

// Load libraries.
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const ffmpeg = require("fluent-ffmpeg");
const { checkAuth, checkAdmin } = require("./middlewares");
const { isValidSignature, isValidAddress } = require("./utils");
const { body, query, validationResult } = require("express-validator");
const db = require("./db");

// Create IPFS client.
const auth = "Basic " + Buffer.from(config.ipfsProjectId + ":" + config.ipfsProjectSecret).toString("base64");
(async () => {
    const { create } = await import("ipfs");
    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth
        }
    });
    return ipfs;
})();

// Create an express app.
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkAuth);

// Setup MongoDB:
// Single connection instance does not need to be passed around.
mongoose.connect(config.mongoUrl);

// const startStream = async (streamId, socket) => {
//     const fileName = `stream-${streamId}-%s.ts`;

//     ffmpeg("input-stream-url")
//         .format("segment")
//         .outputOptions([
//             "-map 0",
//             "-segment_time",
//             videoSegmentDuration,
//             "-reset_timestamps",
//             "1",
//             "-strftime",
//             "1",
//             `-f segment ${fileName}`
//         ])
//         .on("end", async () => {
//             console.log(`Video stream ${streamId} ended`);
//         })
//         .on("error", (err) => {
//             console.error("Error:", err);
//         })
//         .on("progress", async (progress) => {
//             const currentSegment = `stream-${streamId}_${Math.floor(progress.timemark / videoSegmentDuration)}.ts`;

//             if (fs.existsSync(currentSegment)) {
//                 const content = fs.readFileSync(currentSegment);
//                 const file = await ipfs.add(content);
//                 console.log(`Added video chunk ${file.path} with CID ${file.cid} for stream ${streamId}`);

//                 // Emit the CID to the user
//                 socket.emit("chunk", { streamId, cid: file.cid.toString() });

//                 // Remove the local video chunk file
//                 fs.unlinkSync(currentSegment);
//             }
//         })
//         .run();
// };

// Start the server.
const server = app.listen(config.serverPort, "127.0.0.1", () => {
    console.info(`===== Server Details =====\n
  Port: ${config.serverPort}`);
});

// Create socket.io server.
// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });

// io.on("connection", (socket) => {
//     console.log("User connected");

//     socket.on("create-stream", async (streamId) => {
//         console.log(`Creating stream with ID ${streamId}`);
//         startStream(streamId, socket);
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     });
// });

app.route("/api/register", [
    body(["walletAddress", "message", "signature"]).exists().withMessage("Missing values"),
    body("walletAddress").custom(isValidAddress).withMessage("Invalid wallet address"),
    body().custom(isValidSignature).withMessage("Invalid signature provided")
]).post(async (req, res) => {
    const walletAddress = req.body.walletAddress.toLowerCase();
    let user = await db.getUser(walletAddress);

    if (user) {
        return res.json(user);
    } else {
        user = await db.createUser(walletAddress);
        return res.json(user);
    }
});

app.route("/api/users").get(async (req, res) => {
    const walletAddress = req.query.walletAddress.toLowerCase();
    const user = await db.getUser(walletAddress);
    return res.json(user);
});

app.route("/api/users").post(async (req, res) => {
    const walletAddress = req.body.walletAddress.toLowerCase();
    const username = req.body.username;
    await db.upsertUser(walletAddress, username);
    return res.json("User added successfully");
});

app.route("/api/movies", [
    body(["walletAddress", "message", "signature"]).exists().withMessage("Missing values"),
    body("walletAddress").custom(isValidAddress).withMessage("Invalid wallet address"),
    body().custom(isValidSignature).withMessage("Invalid signature provided")
]).post(async (req, res) => {
    try {
        await db.insertMovie(req.body);
        res.status(200).json("Movie added successfully");
    } catch (e) {
        console.error(e);
        res.status(400).send();
    }
});

app.route("/api/movies").get(async (req, res) => {
    try {
        const movie = await db.getMovie(req.query.movieId);
        res.status(200).json(movie);
    } catch (e) {
        console.error(e);
        res.status(400).send();
    }
});
