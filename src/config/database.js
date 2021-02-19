const mongoose = require('mongoose');

const dotenv = require('dotenv');
const credentials = require("./credentials");

dotenv.config();

mongoose.Promise = global.Promise;

const { uri, options } = credentials;

mongoose.connect(uri, options)
    .then(() => { console.log("Connected to GraphQl DB database!"); })
    .catch((error) => {
        console.error("GraphQl DB Connection failed!");
        console.error(error.message);
        process.exit(1);
    });

const database = mongoose.connection;

// database.on("error", console.error.bind(console, "Database Connection Error:"));

module.exports = database;
