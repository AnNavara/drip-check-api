const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const CharacterService = require(path.join(
    __dirname,
    './services/Character.service'
));

const app = express();
app.use(cors());

app.get('/', async (request, response) => {
    const res = await axios
        .get('https://www.pathofexile.com/character-window/get-characters', {
            withCredentials: true,
            credentials: 'include',
            headers: {
                Connection: 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                // 'User-Agent': 'PostmanRuntime/7.29.0',
                'User-Agent': 'DripCheckApi/0.0.1',
            },
            params: { accountName: 'dtnhdantalian', realm: 'pc' },
        })
        .then((data) => {
            response.send(data.data);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                res.status(500).send('Internal server error');
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
});

app.get('/characters', async (request, response) => {
    const { accountName, realm } = request.query;
    CharacterService.getAll(accountName, realm)
        .then((data) => {
            data.data;
            response.send(data.data);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            response.status(500).send(error);
        });
});

app.listen(3004, () => {
    console.log('Running');
});
