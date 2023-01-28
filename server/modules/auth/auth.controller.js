const AuthService = require("./auth.service");
const { ErrorsHandler } = require("../../utils");
const { JwtService } = require("../../security");
const { ACCESS_TOKEN, REFRESH_TOKEN } = require("../../constants");


module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { success, status, content, message } = await AuthService.authenticate({ username, password })
    res.status(status)
    .cookie(ACCESS_TOKEN, content.access_token, { 
      maxAge: JwtService.expiration(content.access_token),
      httpOnly: true 
    })
    .cookie(REFRESH_TOKEN, content.refresh_token, { 
      maxAge: JwtService.expiration(content.refresh_token),
      httpOnly: true 
    })
    .json(success ? {...content.user} : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "AuthController:login")
    res.status(status).json({ message, entity: 'User' })
  }
}

module.exports.refresh_token = async (req, res) => {
  try {
    const { success, status, content, message } = await AuthService.refresh_token(req.user._id)
    res.status(status)
    .cookie(ACCESS_TOKEN, content.access_token, { 
      maxAge: JwtService.expiration(content.access_token),
      httpOnly: true 
    })
    .cookie(REFRESH_TOKEN, content.refresh_token, { 
      maxAge: JwtService.expiration(content.refresh_token),
      httpOnly: true 
    })
    .json(success ? success : { message });
  } catch (err) {
    const { status, message } = ErrorsHandler.handle(err, "AuthController:refresh_token")
    res.status(status).json({ message, entity: 'User' })
  }
}