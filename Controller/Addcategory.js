const category = require('../Schema/Addcategory_schema');
const Categorysmodal = require('../Schema/Addcategory_schema');
const Addcategory_add = async(request,response) =>{
    const category = request.body.data;
    // console.log(category);
    const category_nam = new Categorysmodal(category);
    // console.log(category_nam)
    try {
        const check = await Categorysmodal.findOne({cat_name:category_nam.cat_name , types:category_nam.types})
        // console.log(category_nam)
        if(check){
            response.status(401).json('Category is already taken');
        }
        else if(category_nam.cat_name && category_nam.types !== ''){
          await category_nam.save();
          response.status(201).json(category_nam);
        }
        else{
          response.status(401).json('Empty data')
        }
     } catch (error) {
         response.status(401).json({message:error.message})
     }
}

const getcategory = async(req,res) =>{
    // Categorysmodal.find().then(
    //   category => res.json(category)
    // ).catch(
    //   err => res.json(err)
    // )
    try {
      const alldata = await Categorysmodal.find()
      res.status(201).json(alldata)
    } catch (error) {
      res.status(401).json(error)
    }
}


module.exports = {Addcategory_add,getcategory};