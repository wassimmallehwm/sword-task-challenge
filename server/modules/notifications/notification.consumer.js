const NotificationsService = require("./notification.service")
const MessageBroker = require('../../config/MessageBroker')
const { MANAGER, NOTIFICATION_QUEUE } = require("../../constants")
const DateHandler = require("../../utils/date-handler/DateHandler")

module.exports = (io) => {
    MessageBroker.consumeMessage(NOTIFICATION_QUEUE, (data) => {
        
        const title = `The technician 
        ${data.performer.firstname} ${data.performer.lastname} performed 
        the task ${data.title} on ${DateHandler.formatDateTime(data.date)}`

        NotificationsService.sendNotificaton(io, {title}, MANAGER)
    })
}
