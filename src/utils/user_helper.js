import jwt from 'jsonwebtoken'

module.exports = {
    getUserInfo() {
        const token = localStorage.getItem("webtoken")
        return jwt.decode(token) || { name: '' };
    }
}