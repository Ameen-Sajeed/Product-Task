const express = require("express");
const { adminLogin } = require("../Controllers/Auth");
const {
  addProduct,
  check,
  updateProducts,
  deleteProducts,
  viewProducts,
  buyProduct,
} = require("../Controllers/Products");
const upload = require("../helpers/multer");
const router = express.Router();

/* ---------------------------- PRODUCTS ROUTERS ---------------------------- */

router.post("/addProduct", upload.single("Image"), addProduct);
router.get("/viewProducts", viewProducts);
router.put("/updateProduct/:id", upload.single("Image"), updateProducts);
router.delete("/deleteProduct/:id", deleteProducts);
router.post('/buyProduct/:id',buyProduct)


/* ------------------------------ AUTH ROUTERS ------------------------------ */

router.post('/admin-login',adminLogin)

module.exports = router;
