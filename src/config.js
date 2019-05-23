/* dev local */
const BASE_URL = 'http://localhost:8080';
module.exports = {
	BASE_URL,
	API_ROOT: 'http://localhost:8082/api/v1',
	TOKEN_STORAGE_PATH: 'webtoken',
	DATE_FORMAT_DDMMYYYY: 'DD/MM/YYYY',
	basePath(path) {
		return `${BASE_URL}${path}`
	},
}

/* production */
// const BASE_URL = 'http://www.wholeballoons.com/gasManagement-front';
// module.exports = {
// 	API_ROOT: 'http://customer.sheepdigit.com:8082/api/v1',
//  	TOKEN_STORAGE_PATH: 'webtoken',
//  	DATE_FORMAT_DDMMYYYY: 'DD/MM/YYYY',
// 	basePath(path) {
// 		return `${BASE_URL}${path}`
// 	},
// } 
