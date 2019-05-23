require("babel-core/register");
require("babel-polyfill");
const { API_ROOT } = require('../config');
import axios from 'axios';

const getOptionHeaderToken = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('webtoken')}`
    }
});

module.exports = {
    getOptionHeaderToken,
    isTokenValid() {
        const endpoint = `${API_ROOT}/tokenCheck`;
        const options = getOptionHeaderToken();
        
        return axios.get( endpoint, options );
    }
}
