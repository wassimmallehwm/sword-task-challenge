const Notification = require("./notification.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler, DataGridHandler } = require("../../utils");
const { NOTIFICATION_QUEUE } = require("../../constants");

const SERVICE_NAME = "NotificationsService"

class NotificationsService {

    instance;

    constructor() {
    }

    static createInstance() {
        return new NotificationsService()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    save = async (data) => {
        try {
            const item = new Notification(data);
            let result = await item.save();
            return result;
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:save`)
            )
        }
    }

    sendNotificaton = async (io, data, group) => {
        try {
            const notif = await this.save(data)
            io.sockets.in(group).emit(NOTIFICATION_QUEUE, notif);
        } catch (err) {
            console.error("Notification failed: " + err);
        }
    }

    findAllPaginated = async ({ page, limit }) => {
        try {
            const total = await Notification.find()
                .count()
                .exec();

            let result = await Notification.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({_id: -1})
                .exec();
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
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:findAllPaginated`)
            )
        }
    }

    countUnread = async () => {
        try {
            const result = await Notification.find({ read: false }).count();
            if (result !== undefined) {
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:countUnread`)
            )
        }
    }

    read = async (id) => {
        try {
            const result = await Notification.findOneAndUpdate(
                { _id: id },
                { read: true },
                { new: true }
            );
            if (result) {
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:read`)
            )
        }
    }
}

module.exports = NotificationsService.getInstance()