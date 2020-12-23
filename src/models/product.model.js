import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    category: String,
    price: Number,
    imgURL: String
},{
    timestamps:true,
    versionKey:false
})

export default model('Product', productSchema)