import Product from '../models/product.model'

const createProduct = async (req,res) => {
    const { name, category, price, imgURL } = req.body
    if(!name || !category || !price || !imgURL) return res.status(400).json({message:"Missing parameters...!!!"})
    try {
        const newProduct = new Product({name, category, price, imgURL})
        return res.status(201).json(await newProduct.save())
    }catch (error){
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are on it...!!!"})
    }
}
const getProducts = async (req,res) => {
    try{
        return res.status(200).json(await Product.find())
    }catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are on it...!!!"})
    }
}
const getProductById = async (req,res) => {
    try{
        const foundProduct = await Product.findById(req.params.productId)
        if(!foundProduct) return res.status(404).json({message:"Product not found...!!!"})
        return res.json()
    }catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are on it...!!!"})
    }
}

const updateProductById = async (req,res) => {
    if(!req.body) return res.status(400).json({message:"Missing parameters...!!!"})
    try{
        if(!await Product.findById(req.params.productId)) return res.status(404).json({message:"Product not found...!!!"})

        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,{
            new:true
        })
        return res.status(200).json(updatedProduct)
    }catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are on it...!!!"})
    }
}

const deleteProductById = async (req,res) => {
    try {
        if(!await Product.findById(req.params.productId)) return res.status(404).json({message:"Product not found...!!!"})
        return res.status(204).json(await Product.findByIdAndDelete(req.params.productId))
    }catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal error. Administrators are on it...!!!"})
    }
}

export { createProduct, getProducts, getProductById, updateProductById, deleteProductById }