const mongoose = require("mongoose");
const passwordEncoder = require('../security/password-encoder/password-encoder');
const User = require('../modules/users/user.model')
const users = require('./users.json');
const { DATABASE_URL } = require('../config');


module.exports.createMockUsers = async () => {
    try{
        await mongoose.connect(DATABASE_URL);

        //Check if users already created
        const count = await User.count()
        if(count != undefined && count > 0){
            console.log("Users data already initialized")
            return ;
        }

        for (let index = 0; index < users.length; index++) {
            let {email, username, firstname, lastname, password, role} = users[index]
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
        console.log("Users data inserted")
        await mongoose.connection.close();
    } catch(error){
        await mongoose.connection.close();
        console.error("Could not seed database", error);
    }
}