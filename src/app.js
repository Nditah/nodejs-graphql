const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');

const schema = require('./schema/schema')
const database = require("./config");

dotenv.config();

database.once("open", () => {
    console.log("Successfully connected to the database!");
});

database.on("close", () => {
    database.removeAllListeners();
});

const app = express();

const hostname = "127.0.0.1";
const port = process.env.APP_PORT;

app.get("/", (req, res) => {
    res.json({
        success: true,
        payload: [],
        message: `Graphql Server is running at http://${hostname}:${port}/graphql`,
    });
});

//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //Directing express-graphql to use this schema to map out the graph 
    schema,
    //Directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));

// listen for requests
const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});


process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
process.on("SIGQUIT", shutDown);

let connections = [];

server.on("connection", (connection) => {
    connections.push(connection);
    // eslint-disable-next-line no-return-assign
    connection.on("close", () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
    console.log("Received kill signal, shutting down gracefully");
    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        database.close(() => {
            console.log("Mongoose connection disconnected");
            process.exit(0);
        });
        console.log("Closed out remaining connections");
        process.exit(0);
    });

    setTimeout(() => {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

module.exports = app;
