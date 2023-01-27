const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_EXPIRATION, JWT_ACCESS_EXPIRATION } = require("../../config");

class JwtService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new JwtService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    generateToken = (
        {
            id,
            role
        },
        isRefresh = false
    ) => {
        return jwt.sign(
            {
                _id: id,
                role
            },
            JWT_SECRET,
            {
                expiresIn: isRefresh ? JWT_REFRESH_EXPIRATION : JWT_ACCESS_EXPIRATION
            }
        )
    }

    verify = (token) => {
        return jwt.verify(token, JWT_SECRET)
    }

    expiration = (token) => {
        return jwt.decode(token).exp
    }


}

module.exports = JwtService.getInstance()