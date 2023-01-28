const Notification = require("./notification.model");
const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");
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
            const result = await item.save();
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

    findAllPaginated = async ({ page, limit, search }) => {
        try {
            let filter = {}
            if (search && search.trim() !== "") {
                filter = {
                    $or: [
                        { title: { $regex: search, $options: 'i' } }
                    ]
                }
            }
            const total = await Event.find(filter)
                .count()
                .exec();

            let result = await Event.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort('-_id')
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
            if (result) {
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