const ProductModel = require("../Models/ProductSchema");

const check = (req, res) => {
  console.log("working");
  res.status(200).json("sucessss");
};

/* ------------------------------ ADD PRODUCTS ------------------------------ */

const addProduct = async (req, res) => {
  let { ProductName, Description, Inventory, Category, Price } = req.body;
  let Image = req.file.filename;
  try {
    const addProduct = new ProductModel({
      ProductName,
      Description,
      Inventory,
      Price,
      Category,
      Image,
    });
    await addProduct.save();
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* ------------------------------ VIEW PRODUCTS ----------------------------- */

const viewProducts = async (req, res) => {
  try {
    ProductModel.find()
      .sort({ _id: -1 })
      .then((resposne) => {
        res.status(200).json(resposne);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error occured" });
  }
};

/* ----------------------------- UPDATE PRODUCTS ---------------------------- */

const updateProducts = async (req, res) => {
  try {
    let editProduct = await ProductModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Price: req.body.price,
          ProductName: req.body.ProductName,
          Image: req.file.filename,
          Category: req.body.Category,
          Description: req.body.Description,
        },
      },
      { upsert: true }
    );
    console.log(editProduct);
    res
      .status(200)
      .json({ msg: "Product Updated Succesfully", data: editProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* ----------------------------- DELETE PRODUCTS ---------------------------- */

const deleteProducts = async (req, res) => {
  try {
    await ProductModel.deleteOne({ _id: req.params.id });
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addProduct,
  check,
  viewProducts,
  updateProducts,
  deleteProducts,
};
