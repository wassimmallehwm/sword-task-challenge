const { ResponseError, ResponseSuccess } = require("../../shared/response");
const { ErrorsHandler, DataGridHandler } = require('../../utils');
const User = require("./user.model");
const UserDto = require("./user.dto");
const { TECHNICIAN } = require("../../constants");
const { isManager } = require("../../utils/permissions-handler/PermissionsHandler");
const RedisCaching = require("../../config/RedisCaching");

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
        { page, limit, filterModel, sortModel },
        user,
        req
    ) => {
        try {
            let filter = DataGridHandler.filterHandler(filterModel)
            let sort = DataGridHandler.sortHadnler(sortModel)
            filter.role = TECHNICIAN

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
                .sort(sort)
                .exec();
            result = result.map(elem => new UserDto(elem))
            if (result) {
                const content = {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                    docs: result
                }
                RedisCaching.cacheData(req, content)
                return new ResponseSuccess({
                    status: 200,
                    content
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