const products = require('../Schema/Product_schema');
const Productsmodal = require('../Schema/Product_schema');
const Addproducts_add = async(request,response) =>{
    const products = request.body.ndata;
    ;
    const prodicts_nam = new Productsmodal(products);
   
    try {
      
        
          await prodicts_nam.save();
          response.status(201).json(prodicts_nam);
        
        
     } catch (error) {
         response.status(401).json({message:error.message})
     }
}

// const getcategory = async(req,res) =>{
//     // Categorysmodal.find().then(
//     //   category => res.json(category)
//     // ).catch(
//     //   err => res.json(err)
//     // )
//     try {
//       const alldata = await Categorysmodal.find()
//       res.status(201).json(alldata)
//     } catch (error) {
//       res.status(401).json(error)
//     }
// }


module.exports = {Addproducts_add};