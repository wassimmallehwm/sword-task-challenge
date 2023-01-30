const { ResponseError, ResponseSuccess } = require("../../shared/response");
const { ErrorsHandler, DataGridHandler } = require('../../utils');
const User = require("./user.model");
const UserDto = require("./user.dto");
const { TECHNICIAN } = require("../../constants");

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

    findAllPaginated = async ({ page, limit, filterModel, sortModel }) => {
        try {
            let filter = DataGridHandler.filterHandler(filterModel)
            let sort = DataGridHandler.sortHadnler(sortModel)
            filter.role = TECHNICIAN
            const total = await User.find(filter)
                .count()
                .exec();

            let result = await User.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort)
                .exec();
            if (result) {
                result = result.map(elem => new UserDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content:{
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