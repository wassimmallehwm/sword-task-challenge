const Task = require("./task.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");
const MessageBroker = require('../../config/MessageBroker')
const { isManager } = require("../../utils/permissions-handler/PermissionsHandler");
const { NOTIFICATION_QUEUE } = require("../../constants");
const UserDto = require("../users/user.dto");
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
                this.nullOrEmpty(data.title) ||
                this.nullOrEmpty(data.summary) ||
                this.nullOrEmpty(createdBy)
            )
                return new ResponseError({
                    status: 400,
                    message: `Task information missing!`
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

    findAll = async (query, user) => {
        try {
            if (!isManager(user)) {
                query.createdBy = user._id
            }
            const result = await Task.find(query)
                .populate({
                    path: 'createdBy',
                    model: 'User',
                    select: 'email username firstname lastname role'
                });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Task not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:findAll`))
        }
    }

    findAllPaginated = async (
        { page, limit, sortField, sortOrder, search },
        user
    ) => {
        try {
            let filter = {}
            if (search && search.trim() !== "") {
                filter = { title: { $regex: search, $options: 'i' } }
            }
            if (!isManager(user)) {
                filter.createdBy = user._id
            }
            const total = await Task.find(filter)
                .count()
                .exec();

            let result = await Task.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                //.sort({ [sortField]: sortOrder })
                .populate({
                    path: 'createdBy',
                    model: 'User',
                });
            result = result.map(elem => {
                return { ...elem.toJSON(), createdBy: new UserDto(elem.createdBy) }
            })
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

    findById = async (id, user) => {
        try {
            let filter = { _id: id }
            if (!isManager(user)) {
                filter.createdBy = user._id
            }
            const result = await Task.findById(filter)
                .populate({
                    path: 'createdBy',
                    model: 'User',
                    select: 'email username firstname lastname role'
                });
            if (!result) {
                return new ResponseError({
                    status: 404,
                    message: `Task not found !`
                })
            }
            return new ResponseSuccess({
                status: 200,
                content: result
            })

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:findById`))
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
                console.log(task.createdBy )
                console.log(user._id )
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
                const { title, summary, isPerformed, performedAt} = data
            let result = await Task.findOneAndUpdate({ _id: id },
                { title, summary, isPerformed, performedAt},
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
            if (task.createdBy != user._id)
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
            MessageBroker.sendMessage(NOTIFICATION_QUEUE, {
                title: task.title,
                performer: task.createdBy,
                date: task.performedAt
            })
        }
    }
}

module.exports = TaskService.getInstance()
