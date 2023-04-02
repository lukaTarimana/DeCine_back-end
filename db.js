const User = require("./dbmodels/User");
const Video = require("./dbmodels/Video");

const upsertUser = async (walletAddress, username) => {
    const user = new User({ walletAddress: walletAddress, userName: username });
    user.save();
};

const insertMovie = async (movie) => {
    const newMovie = new Movie(movie);
    newMovie.save();
};

const getMovie = async (movieId) => {
    return Movie.find({ movieId: movieId });
};

const getUser = async (walletAddress) => {
    return User.findOne({ walletAddress: walletAddress });
};

const createUser = async (walletAddress) => {
    const user = new User({ walletAddress: walletAddress, userName: walletAddress });
    user.save();
    return user;
};

module.exports = {
    upsertUser,
    getMovie,
    insertMovie,
    getUser,
    createUser
};
