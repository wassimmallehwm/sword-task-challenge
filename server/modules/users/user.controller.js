const UserService = require("./user.service");
const SERVICE_NAME = "UserController"
const ENTITY_NAME = "User"

module.exports.list = async(req, res) => {
    try {
      const { page = 1, limit = 10, filterModel, sortModel } = req.body;
      const {
        success,
        status,
        content,
        message
      } = await UserService.findAllPaginated({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        filterModel,
        sortModel
      }, req.user)
      res.status(status).json(success ? content : { message });
    } catch (err) {
      const { status, message } = ErrorsHandler.handle(err, `${SERVICE_NAME}:list`)
      res.status(status).json({ message, entity: ENTITY_NAME })
    }
  };