const path = require('path');
const express = require('express');
const cors = require('cors');
const CharacterService = require(path.join(
    __dirname,
    './services/Character.service'
));

const app = express();
app.use(cors());

app.get('/account', async (request, response) => {
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

app.get('/character', async (request, response) => {
    const { accountName, realm, characterName } = request.query;
    CharacterService.getOne(accountName, realm, characterName)
        .then(({ items, passives }) => {
            const data = items.data;
            data.passives = passives.data;
            response.send(data);
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
