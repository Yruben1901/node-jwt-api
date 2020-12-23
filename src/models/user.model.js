import { Schema, model } from 'mongoose'
import * as config from '../config/config'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[{
        ref:'Role',
        type: Schema.Types.ObjectId
    }]
},{
    timestamps:true,
    versionKey:false
})

userSchema.pre("save",async (next) =>{
    try{
        let user = this

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next()

        // generate a salt
        const salt = await bcrypt.genSalt(config.SALT_WORK_FACTOR)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    }catch (error){
        console.error(error)
        next(error)
    }
})

/**
 * Other option to set the password... (Yainier M. Ruben)
 * */
// userSchema.statics.encryptPassword = async (password) =>{
//     const salt = await bcrypt.genSalt(10)
//     return await bcrypt.hash(password,salt)
// }

userSchema.statics.comparePassword = async (password, receivedPassword) =>{
    try{
        return await bcrypt.compare(password,receivedPassword)
    }catch (error){
        console.error(error)
        return false
    }
}

export default model('User',userSchema)