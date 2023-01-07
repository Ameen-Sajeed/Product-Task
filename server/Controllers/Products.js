const ProductModel = require("../Models/ProductSchema");


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
    console.log(req.params.id,"id");
    console.log(req.body,"data");
  try {
    if (req.file) {
        var file = true;
      } else {
        var file = false;
      }
    let editPro = await ProductModel.findById(req.params.id)  
    let editProduct = await ProductModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Price: req.body.Price,
          ProductName: req.body.ProductName,
          Image: file
          ? req.file.filename
          : editPro.Image,      
          Category: req.body.Category,
          Description: req.body.Description,
          Inventory:req.body.Inventory

        },
      },
      { upsert: true }
    );
    console.log(editProduct);
    res
      .status(200)
      .json({ msg: "Product Updated Succesfully", data: editProduct });
  } catch (error) {
    console.log(error);
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


/* ---------------------------- PURCHASE PRODUCTS --------------------------- */

const buyProduct = async (req, res) => {
  try {
    await ProductModel.updateOne(
      { _id: req.params.id },
      {
        $inc: {
          Inventory: -1,
        },
      }
    );
    res.status(200).json("Product has been purchased");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  addProduct,
  viewProducts,
  updateProducts,
  deleteProducts,
  buyProduct,
};
