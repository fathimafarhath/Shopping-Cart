var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectID
const { response } = require('express')

module.exports={

    addProduct:(product,callback)=>{
        product.Price=parseInt(product.Price);
        

        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.ops[0]._id)

        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response)=>{
                console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                console.log(product);
                resolve(product)
            })
        })
    },
    updateProduct:(proId,productDetails)=>{
        productDetails.Price=parseInt(productDetails.Price);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:productDetails.Name,
                    Description:productDetails.Description,
                    Price:productDetails.Price,
                    Category:productDetails.Category

                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}