import decode from 'jwt-decode';
import { TOKEN_STORAGE_PATH, API_ROOT } from '../config';
import axios from 'axios'

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || API_ROOT;
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(name, password) {
    return this.fetch(`${this.domain}/login`, {
      method: 'POST',
      body: { data: {
          name,
          password,
        }
      }
    })
      .then((res) => {
        this.setToken(res.data.token);
        return Promise.resolve(res);
      })
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem(TOKEN_STORAGE_PATH, idToken);
  }

  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_PATH);
  }

  logout() {
    localStorage.removeItem(TOKEN_STORAGE_PATH);
  }

  getProfile() {
    return decode(this.getToken());
  }

  fetch(url, options) {

    return axios.post( url, options.body )
      .then(this._checkStatus)

  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}