const { ResponseError, ResponseSuccess } = require("../../shared/response");
const { ErrorsHandler } = require('../../utils');
const User = require("./user.model");
const UserDto = require("./user.dto");
const { TECHNICIAN } = require("../../constants");
const { isManager } = require("../../utils/permissions-handler/PermissionsHandler");

SERVICE_NAME = "UserService"

class UserService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new UserService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    findAllPaginated = async (
        { page, limit },
        user
    ) => {
        try {
            let filter = {
                role: TECHNICIAN
            }
            if (!isManager(user))
                return new ResponseError({
                    status: 403,
                    message: "Permission denied !"
                })
            const total = await User.find(filter)
                .count()
                .exec();

            let result = await User.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                //.sort({ [sortField]: sortOrder })
                .exec();
            result = result.map(elem => new UserDto(elem))
            if (result) {
                return new ResponseSuccess({
                    status: 200,
                    content: {
                        page,
                        limit,
                        total,
                        pages: Math.ceil(total / limit),
                        docs: result
                    }
                })
            }
        } catch (err) {
            console.error(err);
            const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:findAllPaginated`)
            return new ResponseError({
                status,
                message
            })
        }
    }
}

module.exports = UserService.getInstance()