const products = require('../Schema/Product_schema');
const Productsmodal = require('../Schema/Product_schema');
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const Addproducts_add = async(request,response) =>{
  const {types,category,subcategory,product_name,size,product_price,product_sprice,product_stock,image,discription,feature} = request.body.ndata
  
  const img_url =[];
  for(let i=0;i<image.length;i++){
    const uploadRes = await cloudinary.uploader.upload(image[i]);
    img_url.push(uploadRes.url)
  }

    const prodicts_nam = new Productsmodal({
     types,
     category,
     subcategory,
     product_name,
     size,
     product_price,
     product_sprice,
     product_stock,
     image:img_url,
     discription,
     feature
    });
   
    try {
          await prodicts_nam.save();
          response.status(201).json(prodicts_nam); 
     } catch (error) {
         response.status(401).json({message:error.message})
     }
}

const getproducts = async(req,res) =>{
    // Categorysmodal.find().then(
    //   category => res.json(category)
    // ).catch(
    //   err => res.json(err)
    // )
    try {
      const alldata = await Productsmodal.find()
      res.status(201).json(alldata)
    } catch (error) {
      res.status(401).json(error)
    }
}

const updateproducts = async(req,res) =>{
  const {_id,types,category,subcategory,product_name,size,product_price,product_sprice,product_stock,image,description,feature} = req.body.ndata
  
  const img_url =[];
  for(let i=0;i<image.length;i++){
    const uploadRes = await cloudinary.uploader.upload(image[i]);
    img_url.push(uploadRes.url)
  }
  

  try {
    
    await products.updateOne({_id:_id},{
      $set:{
        types:types,
        category:category,
        subcategory:subcategory,
        product_name:product_name,
        size:size,
        product_price:product_price,
        product_sprice:product_sprice,
        product_stock:product_stock,
        image:img_url,
        description:description,
        feature:feature
      }
    })
     res.status(201).json('Update Sucessfully')
  } catch (error) {
     res.status(401).json({message:error.message})
}
}

const deletedata = async(req,res) => {
  const {deldata} = req.body;
  // console.log(deldata)
  try {
    await products.deleteOne(
     {_id:deldata}
    )
     res.send({status:201,data:"Deleted"})
  } catch (error) {
    //  res.status(401).json({message:error.message})
    console.log(error)
  }
}


const searchProduct = async(req,res) => {
 const {title} = req.query;
 const store = title.split(' ');
//  console.log(store)
  try {
    const findtypes = await Productsmodal.find();
    const typest = store.filter(items=>findtypes.map(e=>e.types).includes(items.toUpperCase()))[0];
    const sub = store.filter(items=>findtypes.map(e=>e.subcategory.toUpperCase()).includes(items.toUpperCase()))[0];
    const search = await Productsmodal.find({
      $or:[
        {product_name:{$regex:title,$options:"si"}},
       {$and:[
        {subcategory:{$regex:sub||'',$options:"si"}},
        {types:{$regex:typest||'',$options:"si"}}
       ]}
      ]
    })
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {Addproducts_add,getproducts,updateproducts,deletedata,searchProduct};