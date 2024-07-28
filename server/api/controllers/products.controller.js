const Product = require('../modules/products.module');
const httpStatusText = require('../utils/httpStatusText')
// const { use } = require('../routers/products.routers');


const getAllProducts = async (req,res)=>{
    // get all products from mongodb using Course model
    const products = await Product.find({},{"__v":false});
    res.json({status: httpStatusText.SUCCESS ,data: {products}});
}
const getOnlyProduct = async (req,res)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product){
            res.status(404).json({status: httpStatusText.FAIL ,Message: 'product not found'});
        }
        return res.json({status: httpStatusText.SUCCESS ,data: {product}});
    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR ,Message: error.Message});
    }
}

const addNewProduct = async(req,res)=>{

    try{
        const {user_id, name, price, description ,offer} = req.body;
        // const oldProduct = await Product.findOne({email:email});

        const newProduct = new Product({
            user_id,
            name,
            price,
            description,
            offer
        });
        
        await newProduct.save();

        return res.status(201).json({status: httpStatusText.SUCCESS,data: {products:newProduct}})

    }catch(error){
        console.error('error',error)
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}

const updateProduct = async (req,res)=>{
    const productId = req.params.id;
    try{
        const updatedProduct = await Product.updateOne({_id: productId}, {$set: {...req.body}});
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {user:updatedUser}});
    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}

module.exports = {
    getAllProducts,
    getOnlyProduct,
    addNewProduct,
    updateProduct,  
}