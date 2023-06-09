const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

var mongoURI = (process.env.MONGOURI)
mongoose.set('strictQuery', true);
const MongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("Not Connected successfully", err)

    else {
      console.log("Connected successfully");
      const fetched_dataDB = await mongoose.connection.db.collection("food_iteam");
      fetched_dataDB.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("foodcategory");
        foodCategory.find({}).toArray(function (err, catdata) {
          if (err) console.log(err);
          else {
            global.food_iteam = data;
            global.foodCategory = catdata;


          }
        })
        // if (err) console.log(err);
        // else {
        //   global.food_iteam = data;

        // }
      })
    }
  });

}


module.exports = MongoDB();