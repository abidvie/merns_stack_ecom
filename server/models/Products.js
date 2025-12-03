const mongoose=require('mongoose')

const product_Schema=new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    saleprice:Number,
    totalstock:Number,
    
},{timestamps:true})  

exports.Product=mongoose.model('Product',product_Schema)