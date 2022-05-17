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
};

module.exports = CharacterService;
