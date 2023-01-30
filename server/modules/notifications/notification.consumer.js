const NotificationsService = require("./notification.service")
const MessageBroker = require('../../config/MessageBroker')
const { MANAGER, NOTIFICATION_QUEUE } = require("../../constants")
const {DateHandler} = require("../../utils")

module.exports = (io) => {
    MessageBroker.consumeMessage(NOTIFICATION_QUEUE, data => {

        NotificationsService.sendNotificaton(io, data, MANAGER)
    })
}
