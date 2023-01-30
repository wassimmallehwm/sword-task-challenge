const Task = require("./task.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler, DataGridHandler } = require("../../utils");
const MessageBroker = require('../../config/MessageBroker')
const { isManager } = require("../../utils/permissions-handler/PermissionsHandler");
const { NOTIFICATION_QUEUE } = require("../../constants");
const UserDto = require("../users/user.dto");
const RedisCaching = require("../../config/RedisCaching");
const SERVICE_NAME = "TaskService"

class TaskService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new TaskService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    create = async (data, createdBy) => {
        try {
            if (
                (this.nullOrEmpty(data.title) ||
                    this.nullOrEmpty(data.summary) ||
                    this.nullOrEmpty(createdBy)) ||
                (data.isPerformed && this.nullOrEmpty(data.performedAt))
            )
                return new ResponseError({
                    status: 400,
                    message: `Invalid task data !`
                })

            if (data.summary.length > 2500)
                return new ResponseError({
                    status: 400,
                    message: `Summary must not exceed 2500 characters !`
                })

            const task = new Task({ ...data, createdBy });

            let result = await task.save();
            result = await result
                .populate({
                    path: 'createdBy',
                    model: 'User',
                    select: 'email username firstname lastname role'
                });
            this.sendNotificationToManager(result)
            if (result) {
                return new ResponseSuccess({
                    status: 201,
                    content: result
                })
            }

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:create`))
        }
    }

    findAllPaginated = async (
        { page, limit, filterModel, sortModel },
        user,
        req
    ) => {
        try {
            let filter = DataGridHandler.filterHandler(filterModel)
            let sort = DataGridHandler.sortHadnler(sortModel)
            if (!isManager(user)) {
                filter.createdBy = user._id
            }
            const total = await Task.find(filter)
                .count()
                .exec();

            let result = await Task.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort)
                .populate({
                    path: 'createdBy',
                    model: 'User',
                });
            result = result.map(elem => {
                return { ...elem.toJSON(), createdBy: new UserDto(elem.createdBy) }
            })
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

    update = async (id, data, user) => {
        try {
            const task = await Task.findById(id)
            if (!task)
                return new ResponseError({
                    status: 404,
                    message: "Task not found !"
                })
            if (task.createdBy != user._id)
                return new ResponseError({
                    status: 403,
                    message: "Permission denied !"
                })
            if (task.isPerformed)
                return new ResponseError({
                    status: 400,
                    message: "Task already performed !"
                })
            const { title, summary, isPerformed, performedAt } = data

            if (summary && summary.length > 2500)
                return new ResponseError({
                    status: 400,
                    message: `Summary must not exceed 2500 characters !`
                })
            let result = await Task.findOneAndUpdate({ _id: id },
                { title, summary, isPerformed, performedAt },
                { new: true });
            result = await result
                .populate({
                    path: 'createdBy',
                    model: 'User',
                    select: 'email username firstname lastname role'
                });
            this.sendNotificationToManager(result)
            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:update`))
        }
    }

    delete = async (id, user) => {
        try {
            const task = await Task.findById(id)
            if (!task)
                return new ResponseError({
                    status: 404,
                    message: "Task not found !"
                })
            if (!isManager(user))
                return new ResponseError({
                    status: 403,
                    message: "Permission denied !"
                })
            const result = await Task.deleteOne({ _id: id });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`))
        }
    }

    nullOrEmpty = (data) => {
        return !data || data.trim() == ""
    }

    sendNotificationToManager = (task) => {
        if (task.isPerformed) {
            console.log("Task performed")
            MessageBroker.sendMessage(NOTIFICATION_QUEUE, {
                title: task.title,
                performer: task.createdBy,
                date: task.performedAt
            })
        }
    }
}

module.exports = TaskService.getInstance()
