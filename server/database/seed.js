const mongoose = require("mongoose");
const passwordEncoder = require('../security/password-encoder/password-encoder');
const User = require('../modules/auth/user.model')
const data = require('./data.json');
const { DATABASE_URL } = require('../config');

const createMockUsers = async (list) => {
    try{
        await mongoose.connect(DATABASE_URL);
        for (let index = 0; index < list.length; index++) {
            let {email, username, firstname, lastname, password, role} = list[index]
            password = await passwordEncoder.hash(password)
            const item = new User({
                email,
                username,
                firstname,
                lastname,
                role,
                password
            });
            await item.save();
        }
        console.log("Data inserted")
        await mongoose.connection.close();
    } catch(error){
        await mongoose.connection.close();
        console.error(error);
    }
}

createMockUsers(data)
.then(() => console.log("success"))
.catch((error) => console.error(error))