const express = require("express");
const router = express.Router();
const businessInformationControllers = require("../controllers/businessInformation");
const { validationSchema } = require("../moddlewares/productvalidationSchema");

const verifyToken = require("../moddlewares/verifyToken");

// get all products
// add new product
router
  .route("/")
  .get(businessInformationControllers.getAllProducts)
  .post(validationSchema(), businessInformationControllers.addNewProduct);

router
  .route("/:id")
  .get(businessInformationControllers.getOnlyProduct)
  .patch(businessInformationControllers.updateProduct);

router
  .route("/business-information")
  .post(businessInformationControllers.addBusinessInformation);

module.exports = router;
