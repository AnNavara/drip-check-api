const axios = require('axios');
const API_URL = 'https://www.pathofexile.com/character-window/';
axios.defaults.baseURL = API_URL;

const CharacterService = {
    async getAll(accountName, realm) {
        return axios.get('/get-characters', {
            withCredentials: true,
            credentials: 'include',
            headers: {
                Connection: 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                // 'User-Agent': 'PostmanRuntime/7.29.0',
                'User-Agent': 'DripCheckApi/0.0.1',
            },
            params: { accountName, realm },
        });
    },

    async getOne(accountName, realm, character) {
        // Make concurrent
        const items = await axios.get('/get-items', {
            withCredentials: true,
            credentials: 'include',
            headers: {
                Connection: 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'User-Agent': 'DripCheckApi/0.0.1',
            },
            params: { accountName, realm, character },
        });

        const passives = await axios.get('/get-passive-skills', {
            withCredentials: true,
            credentials: 'include',
            headers: {
                Connection: 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'User-Agent': 'DripCheckApi/0.0.1',
            },
            params: { accountName, realm, character },
        });

        return { items, passives };
    },
};

module.exports = CharacterService;
