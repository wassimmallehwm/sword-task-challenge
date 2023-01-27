const { ErrorsHandler } = require("../../utils");
const TaskService = require("./task.service");
const SERVICE_NAME = "TaskController"
const ENTITY_NAME = "Task"
      
module.exports.create = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await TaskService.create(req.body, req.user._id)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:create`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getAll = async(req, res) => {
  try {
    const query = req.query || {};
    const {
      success,
      status,
      content,
      message
    } = await TaskService.findAll(query, req.user)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getAll`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.list = async(req, res) => {
  try {
    const { page = 1, limit = 10, sortField = "_id", sortOrder = 1, search } = req.query;
    const {
      success,
      status,
      content,
      message
    } = await TaskService.findAllPaginated({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sortField,
      sortOrder,
      search
    }, req.user)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:list`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const {
      success,
      status,
      content,
      message
    } = await TaskService.findById(id, req.user)
    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:getById`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.update = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await TaskService.update(req.params.id, req.body, req.user)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:update`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};

module.exports.remove = async(req, res) => {
  try {
    const {
      success,
      status,
      content,
      message
    } = await TaskService.delete(req.params.id, req.user)

    res.status(status).json(success ? content : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:delete`)
    res.status(status).json({ message, entity: ENTITY_NAME })
  }
};


    
    
      