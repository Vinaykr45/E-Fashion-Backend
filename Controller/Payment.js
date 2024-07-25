const Razorpay = require('razorpay');
const crypto = require('crypto');
const products = require('../Schema/Product_schema');
const payments = require('../Schema/Payment_schema')
const paymentsModal = require('../Schema/Payment_schema')
const authenticate = require('../Middleware/Authenticate')
const razorInstance = new Razorpay({
  key_id:process.env.RAZORPAY_KEYID,
  key_secret:process.env.RAZORPAY_SECRET,
})


const order = (req,res) => {
  const amount = req.body;

  try {
    const options = {
        amount: Number(amount.ammount*100) ,
        currency: "INR",
        receipt : crypto.randomBytes(10).toString("hex"),
    };

   razorInstance.orders.create(options,(err,order)=>{
    if (err) {
      console.log(err);
      return res.status(500).json({message:"Something went wrong"});
    }
    console.log(order);
    res.status(200).json({
      data:order
    })
   })

  } catch (error) {
    console.log(error)
  }

}

const verify = async (req,res) => {
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature,userid,address,order} = req.body;

 order.map( async (items)=>{
  const nsize = items.sizes;
  const selectSize = Object.entries(nsize).filter(([keys,value])=>keys===items.size);
  const nselect = selectSize[0];
  const nvalue = nselect[1]-items.quantity;
  const name = items.size;
  Object.keys(nsize).map((item)=>{
      if(item === name){
        return nsize[item] = nvalue.toString() ;
      }
  })
  const nqvalue = Object.values(nsize);
  const nstock = nqvalue.map( function(elt){ // assure the value can be converted into an integer
    return /^\d+$/.test(elt) ? parseInt(elt) : 0; 
  })
  .reduce( function(a,b){ // sum all resulting numbers
    return a+b
  })

  
  // console.log(nstock)
  // console.log(typeof(nsize))
   try {
    await products.updateMany({_id:items.id},{
      $set:{
        size:nsize,
        product_stock:nstock
      }
    })

    // console.log(data)
    // return res.status(201).json("Data Updated Sucessfully")
    // console.log(product.order.sizes)
   } catch (error) {
    // return res.status(501).json(error)
   }
 })

  try {
    const sign = razorpay_order_id+"|"+razorpay_payment_id;

    const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex")

      const isAuthtic = expectedSign === razorpay_signature;

      if (isAuthtic) {
        const paymet = new paymentsModal({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          userid,
          address,
          order
        });
        await paymet.save();

        res.json({
          message:"Payment Sucessfully"
        })

      }

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

}

const getOrder = async(req,res) => {
  const userId =  req.query.data;
//  console.log(userId)
try {
  const allData = await paymentsModal.find({userid:userId})
  // console.log(allData)
  res.status(200).json(allData)
} catch (error) {
  res.status(401).json(error)
}
}

const getAllorder = async(req,res) => {
  try {
    const allData = await paymentsModal.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(401).json(error);
  }
}

const updateStatus = async(req,res) => {
  const user =  req.body.data;
  // console.log(user)
try {
   const allData = await payments.updateOne({_id:user.id,"order.id":user.pid},
   { $set:{
     'order.$.status':user.status
    }}
  );
  console.log(allData)
  res.status(200).json("Status Upadated")
} catch (error) {
  res.status(401).json(error)
}
}

module.exports = {order,verify,getOrder,getAllorder,updateStatus}