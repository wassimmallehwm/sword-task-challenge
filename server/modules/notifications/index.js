const notificationRoutes = require('./notification.routes')
const NotificationsService = require('./notification.service')
module.exports = {
    routes: notificationRoutes,
    NotificationsService
};