const Task = require("./task.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");
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
                this.nullOrEmpty(data.label) ||
                this.nullOrEmpty(data.description) ||
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
            if (result) {
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }

        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:create`))
        }
    }

    findAll = async (query) => {
        try {
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

    findAllPaginated = async ({ page, limit, sortField, sortOrder, search }) => {
        try {
            let filter = {}
            if (search && search.trim() !== "") {
                filter = { label: { $regex: search, $options: 'i' } }
            }
            const total = await Task.find(filter)
                .count()
                .exec();

            let result = await Task.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ [sortField]: sortOrder })
                .populate({
                    path: 'createdBy',
                    model: 'User',
                    select: 'email username firstname lastname role'
                }).exec();

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

    findById = async (id) => {
        try {
            const result = await Task.findById(id)
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

    update = async (id, data) => {
        try {
            const task = await Task.findById(id)
            if (!task)
                return new ResponseError({
                    status: 404,
                    message: "Task not found !"
                })
            let result = await Task.findOneAndUpdate({ _id: id }, data, { new: true });
            result = await result
                .populate({
                    path: 'createdBy',
                    model: 'User',
                    select: 'email username firstname lastname role'
                });

            return new ResponseSuccess({
                status: 200,
                content: result
            })
        } catch (err) {
            return new ResponseError(ErrorsHandler.handle(err, `${SERVICE_NAME}:update`))
        }
    }

    delete = async (id) => {
        try {
            const task = await Task.findById(id)
            if (!task)
                return new ResponseError({
                    status: 404,
                    message: "Task not found !"
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
}

module.exports = TaskService.getInstance()
