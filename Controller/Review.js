
const review = require('../Schema/Rating_schema');
const reviewModal = require('../Schema/Rating_schema');

const postReview = async(req,res) => {
   const data =  req.body.ndata;
   console.log(data)
   try {
    const reviews = new reviewModal({
     product_id:data.productid,
     user_id:data.userid,
     rating:data.rating,
     review:data.review
    });
    await reviews.save()
    res.status(200).json("Review added successfully")
   } catch (error) {
    res.status(400).json(error)
   }
}

const getReview = async(req,res) => {
   const id = req.query.data;
   try {
      const data = await review.find({product_id:id});
      res.status(200).json(data);
   } catch (error) {
      res.status(400).json(error)
   }
}

module.exports = {postReview,getReview}