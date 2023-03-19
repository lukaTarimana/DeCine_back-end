const User = require("./dbmodels/User");
const Movie = require("./dbmodels/Movie");

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

module.exports = {
    upsertUser,
    getMovie,
    insertMovie
};
