const express = require("express");
const {
  addProduct,
  check,
  updateProducts,
  deleteProducts,
  viewProducts,
} = require("../Controllers/Products");
const upload = require("../helpers/multer");
const router = express.Router();

/* ---------------------------- PRODUCTS ROUTERS ---------------------------- */

router.get("/", check);
router.post("/addProduct", upload.single("Image"), addProduct);
router.get("/viewProducts", viewProducts);
router.put("/updateProduct/:id", upload.single("image"), updateProducts);
router.delete("/deleteProduct/:id", deleteProducts);

module.exports = router;
