const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required:true
    },
    Category: {
      type: String,
      required:true
    },
    Description: {
      type: String,
      required:true
    },
    Price: {
      type: Number,
      required:true
    },
    Image: {
      type: String,
    }, 
    Inventory:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
