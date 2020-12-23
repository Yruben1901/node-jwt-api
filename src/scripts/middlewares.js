import jwt from 'jsonwebtoken'
import * as config from '../config/config'
import User from '../models/user.model'
import Role from '../models/role.model'

const verifyToken = async (req, res, next) => {
    if(req.headers['x-access-token']) return res.status(400).json({message:"Missing parameters...!!!"})
    try {
        const token = req.headers['x-access-token']
        const decoded = await jwt.verify(token, config.SECRET_KEY)

        if(!await User.findById(decoded.id,{password: 0}))
            return res.status(400).json({message:"No valid token...!!!"})
        req.userId = decoded.id
        next()
    }catch (e) {
        console.error(e)
        return res.status(500).json({message: "Internal error. Administrators are working on it...!!!"})
    }
}

const validateRole = (roles) => async (req, res, next) => {
    try{
        const userFound = await User.findById(req.userId).populate("roles")
        const validRoles = userFound.roles.reduce((acc,elem) => acc || roles.indexOf(elem.name) >= 0,false )

        if (!validRoles)
            return res.status(403).json({message:"You have no access to do this action..."})
        next()
    }catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal error. Administrators are working on it...!!!"})
    }
}

const verifyRoleExistence = async (req, res, next) =>{
    try{
        if(req.body.roles){
            const validRoles = await Role.find()
            const validRolesNames = validRoles.reduce((acc,elem) => acc.concat(elem.name),[])
            for(let index =0; index < req.body.roles.length; index++){
                if(!validRolesNames.includes(req.body.roles[index])){
                    console.log(validRolesNames, " => ", req.body.roles[index])
                    return res.status(400).json({message:"Invalid parameters..."})
                }
            }
        }
        next()
    }catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal error. Administrators are working on it...!!!"})
    }
}

export {
    verifyToken,
    validateRole,
    verifyRoleExistence
}