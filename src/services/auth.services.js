import User from '../models/user.model'
import Role from '../models/role.model'
import * as config from '../config/config'
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body
    if(!username||!email||!password)
        return res.status(400).json({message:"Missing parameters in the request...!!!"})
    try{
        const newUser = new User({username, email, password, roles})
        /** Valid way if the method "encryptPassword" is available in the schema.*/
        // const newUser = new User({username, email, password: await User.encryptPassword(password), roles})

        if(roles){
            const foundRoles = await Role.find({name:{$in: roles}})
            newUser.roles = foundRoles.map(role => role._id)
        }else{
            const defaultRole = await Role.findOne({name: "ROLE_USER"})
            newUser.roles = [defaultRole._id]
        }

        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id}, config.SECRET_KEY,{
            expiresIn: 86400
        })
        return res.status(201).json({token})
    }catch (error){
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are working on it...!!!"})
    }
}

const signIn = async (req,res) => {
    if(!req.body.email || !req.body.password)
        return res.status(400).json({message:"Missing parameters in the request...!!!"})
    try{
        const foundUser = await User.findOne({email: req.body.email}).populate("roles")
        if(!foundUser)
            return res.status(400).json({message:"User not found...!!!"})

        const matchedPasswords = await User.comparePassword(req.body.password, foundUser.password)
        if(!matchedPasswords) {
            return res.status(401).json({message:"BAD Credentials...!!!"})
        }
        const token = jwt.sign({id: foundUser._id}, config.SECRET_KEY,{
            expiresIn: 86400
        })

        return res.status(200).json({token})
    }catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are working on it...!!!"})
    }
}

export {
    signIn,
    signUp
}