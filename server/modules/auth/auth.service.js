const { ResponseError, ResponseSuccess } = require("../../shared/response");
const { AuthResponse } = require("./auth-response");
const { ErrorsHandler } = require('../../utils');
const { JwtService, PasswordEncoder } = require('../../security');
const User = require("../users/user.model");
const UserDto = require("../users/user.dto");
const { INVALID_DATA, ACCOUNT_NOT_FOUND, INVALID_CREDENTIALS } = require("../../constants");


class AuthService {

    constructor() {
    }

    static instance = new AuthService();

    authenticate = async ({ username, password }) => {
        try {
            if (!username || !password)
                return new ResponseError({
                    status: 400,
                    message: INVALID_DATA
                })
            const filter = {
                $or: [
                    { username: username},
                    { email: username}
                ]
            }

            const user = await User.findOne(filter);
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: ACCOUNT_NOT_FOUND
                })

            const isMatch = await PasswordEncoder.compare(password, user.password);
            if (!isMatch)
                return new ResponseError({
                    status: 400,
                    message: INVALID_CREDENTIALS
                })

            const response = new AuthResponse({
                user: new UserDto(user),
                access_token: JwtService.generateToken(user),
                refresh_token: JwtService.generateToken(user, true)
            })
            return new ResponseSuccess({
                status: 200,
                content: response
            });
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AuthService:login"))
        }
    }

    refresh_token = async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user)
                return new ResponseError({
                    status: 404,
                    message: ACCOUNT_NOT_FOUND
                })

            const response = new AuthResponse({
                access_token: JwtService.generateToken(user),
                refresh_token: JwtService.generateToken(user, true)
            })
            return new ResponseSuccess({
                status: 200,
                content: response
            });
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, "AuthService:refresh_token"))
        }
    }
}

module.exports = AuthService.instance