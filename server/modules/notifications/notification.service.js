const Notification = require("./notification.model");
const { notif_types, notif_enums } = require("./constants");


// const sendNotifToAdmins = async (io, data) => {
//     try {
//         const admin = await Role.findOne({ label: 'ADMIN' })
//         data.roles = [admin._id]
//         const notif = await save(data)
//         io.sockets.in("ADMIN").emit('notif', notif);
//     } catch (err) {
//         console.error("Notification creation failed: " + err);
//     }
// }

const { ResponseSuccess, ResponseError } = require("../../shared/response");
const { ErrorsHandler } = require("../../utils");

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
            console.error("Notification creation failed: " + err);
        }
    }

    sendNotifToUser = async (io, data, user) => {
        try {
            data.user = user
            const notif = await this.save(data)
            io.sockets.in(user.toString()).emit('notif', notif);
        } catch (err) {
            console.error("Notification creation failed: " + err);
        }
    }

    findLastFive = async (query = {}) => {
        try {
            let result = await Event.find(query)
                .populate({ path: 'createdBy', model: 'User' })
                .populate({ path: 'category', model: 'Category' })
                .populate({ path: 'allowedViewers', model: 'Group' });
            if (result) {
                result = result.map(elem => new EventDto(elem))
                return new ResponseSuccess({
                    status: 200,
                    content: result
                })
            }
        } catch (err) {
            return new ResponseError(
                ErrorsHandler.handle(err, `${SERVICE_NAME}:findAll`)
            )
        }
    }

    findAllPaginated = async ({ page, limit, sortField, sortOrder, search }) => {
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
                .sort({ [sortField]: sortOrder })
                .populate({ path: 'createdBy', model: 'User' })
                .populate({ path: 'category', model: 'Category' })
                .populate({ path: 'allowedViewers', model: 'Group' })
                .exec();

            if (result) {
                result = result.map(elem => new EventDto(elem))
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

    sendNotifToUsers = (io, users, notifEnum, data, resource) => {
        const { SUBJECT, CONTENT } = notif_types[notifEnum](data)
        const notifData = {
            subject: SUBJECT,
            body: CONTENT,
            resource
        }
        users.forEach(user => this.sendNotifToUser(io, notifData, user))
    }
}

module.exports = NotificationsService.getInstance()