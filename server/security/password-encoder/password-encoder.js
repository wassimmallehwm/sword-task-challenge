const bcrypt = require('bcryptjs');

class PasswordEncoder {

    instance;

    constructor() {
    }

    static createInstance() {
        return new PasswordEncoder()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    hash = async (password) => {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    compare = async (password, hashedPassword) => {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
    }

}

module.exports = PasswordEncoder.getInstance()