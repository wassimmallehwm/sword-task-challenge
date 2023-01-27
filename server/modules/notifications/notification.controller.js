const Notification = require("./notification.model");
const { notif_types } = require('./constants');
const { sendNotifToAdmins } = require("./notification.service");
const mongoose = require("mongoose");
const { ErrorsHandler } = require("../../utils");

const rolesQuery = (req) => {
  let query = req.query || {};
  if (req.roles && req.roles.length > 0) {
    query = {
      $or: [
        { user: req.user }
      ]
    };
    req.roles.forEach(
      elem => query['$or'].push({ roles: mongoose.Types.ObjectId(elem._id) })
    )
  }
  return query
}

module.exports.create = async (req, res) => {
  try {
    //const item = new Notification(req.body);
    let item = req.notif

    item = new Notification(req.body);
    const result = await item.save();
    sendNotifToAdmins(req.io, result)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification creation failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

module.exports.countUnread = async (req, res) => {
  try {
    let query = rolesQuery(req)
    query.read = false
    const result = await Notification.find(query).count();

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification getAll failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

module.exports.readAll = async (req, res) => {
  try {
    let query = rolesQuery(req)
    query.read = false
    const result = await Notification.findOneAndUpdate(query, {read: true}, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification read all failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

module.exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findOneAndUpdate({_id: id}, {read: true}, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification read failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

module.exports.getTopFive = async (req, res) => {
  try {
    const query = rolesQuery(req)
    const result = await Notification.find(query)
      .sort('-_id')
      .limit(5)
      .exec()

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification getAll failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Notification.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification getAll failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification getById failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};


module.exports.getList = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortField, sortOrder } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: {}

    };

    if (sortField && sortOrder) {
      options.sort = {
        [sortField]: sortOrder
      }
    }

    const result = await Notification.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification list failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};


module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification update failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};


module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Notification.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Notification delete failed: " + err);
    const { status, message } = ErrorsHandler.handle(err)
    res.status(status).json({ message, entity: 'Notification' })
  }
};

