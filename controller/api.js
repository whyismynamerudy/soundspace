const axios = require('axios');
const apiRouter = require('express').Router();

apiRouter.get('/allLocations', async (req, res) => {
    axios({
        url: "https://uofthacksx.onrender.com/graphql",
        method: 'get',
        data: {
            query: `
                query getAllLocations {
                    id
                    address
                    soundBiteIDs
                }
            `
        }
    }).then((result) => {
        console.log(result.data);
    })
});

module.exports = apiRouter;