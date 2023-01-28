const jwtService = require('../token/jwt.service');
const jwt = require('jsonwebtoken');
const { PermissionsHandler } = require('../../utils');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../../constants');

const getToken = (req, name) => {
    //return req.header(name);
    return req.cookies[name]
}

const authenticated = (req, res, next) => {
    try{
        const token = getToken(req, ACCESS_TOKEN)
        if(!token){
            return res.status(401).json({message : "Not Authorized !"})
        }
        const verified = jwtService.verify(token);
        if(!verified){
            return res.status(401).json({message : "Not Authorized !"})
        }
        const { _id, role } = verified
        req.user = { _id, role };
        next();
    } catch(e){
        if(e instanceof jwt.TokenExpiredError){
            return res.status(401).json({message : "token_expired"})
        } else {
            res.status(500).json({message: "server error"});
        }
    }
}

const refreshToken = (req, res, next) => {
    try{
        const token = getToken(req, REFRESH_TOKEN)
        if(!token){
            return res.status(401).json({message : "Not Authorized !"})
        }
        const verified = jwtService.verify(token);
        if(!verified){
            return res.status(401).json({message : "Not Authorized !"})
        }
        const { _id, role } = verified
        req.user = { _id, role };
        next();
    } catch(e){
        return res.status(401).json({message : "server error"})
    }
}

const manager = async (req, res, next) => {
    try{
        if(!PermissionsHandler.isManager(req.user)){
            return res.status(403).json({message : "Permission denied"})
        }
        next();
    } catch(e){
        res.status(500).json({message: "server error"});
    }
}

module.exports = {
    authenticated,
    manager,
    refreshToken
}