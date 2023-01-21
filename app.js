const express = require('express');
const app = express();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const schema = require('./schema');
const apiRouter = require('./controller/api')

require('dotenv').config();

mongoose.connect(String(process.env.MONGODB_URL), {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to db");
    })
    .catch((error) => {
        console.log("error", error);
    });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// const schema = buildSchema(`
//     type Location {
//         address: String!
//         soundLevelIds: [Int!]
//         id: Int!
//     },
//     type SoundBite {
//         address: String!
//         avgDecibel: Float
//         id: Int!
//     },
//     type Query {
//         location(id: Int!): Location
//         locationAllSoundLevels(id: Int!): [SoundBite!]
//         soundBite(id: Int!): SoundBite
//     },
//     type Mutation {
//         updateLocation(id: Int!): Location
//     }
// `);

app.use("/api", apiRouter);

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))

app.use(cors());
app.use(express.json()); //allows backend to recieve JSON data from frontend

module.exports = app;

//for mongodb, admin root