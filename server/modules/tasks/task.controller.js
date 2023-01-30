const RedisCaching = require("../../config/RedisCaching");
const { ErrorsHandler } = require("../../utils");
const TaskService = require("./task.service");
const SERVICE_NAME = "TaskController"
const ENTITY_NAME = "Task"

module.exports.create = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await TaskService.create(req.body, req.user._id)
    if (success) {
      RedisCaching.invalidateCache(req)
    }
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:create`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 10, filterModel, sortModel } = req.body;
    const {
      success,
      status,
      content,
      message
    } = await TaskService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      filterModel,
      sortModel
    }, req.user)
    if (success) {
      RedisCaching.cacheData(req, content)
    }
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:list`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.update = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await TaskService.update(req.params.id, req.body, req.user)
    if (success) {
      RedisCaching.invalidateCache(req)
    }
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:update`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.remove = async (req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await TaskService.delete(req.params.id, req.user)
    if (success) {
      RedisCaching.invalidateCache(req)
    }
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};




