const NotificationsService = require("./notification.service");
const { ErrorsHandler } = require("../../utils");
const SERVICE_NAME = "NotificationController"
const ENTITY_NAME = "Notification"


module.exports.countUnread = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await NotificationsService.countUnread();
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:countUnread`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.read = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await NotificationsService.read(req.params.id);
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:read`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const {
      success,
      status,
      content,
      message
    } = await NotificationsService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    });
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getList`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

