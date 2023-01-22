const axios = require('axios');
const apiRouter = require('express').Router();

apiRouter.get('/allLocations', async (req, res) => {
    await fetch("https://uofthacksx.onrender.com/graphql", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query:`
                getAllLocations {
                    id
                    address
                    soundBiteIDs
                }
            `
        })
    }).then((result) => {
        console.log(result.json());
        res.send(result.json());
    })
});

module.exports = apiRouter;