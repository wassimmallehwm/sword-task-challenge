const bcrypt = require('bcryptjs');

class PasswordEncoder {

    constructor() {
    }

    static instance = new PasswordEncoder();

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

module.exports = PasswordEncoder.instance