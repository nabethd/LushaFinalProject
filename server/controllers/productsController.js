const express = require("express");
const productService = require("../services/productService");

const router = express.Router();

//Get ALL products
router.route("/").get(async (req, res) => {
  const products = await productService.getAllProducts();
  return res.json(products);
});
//Get by ID
router.route("/:id").get(async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  return res.json(product);
});
//add
router.route("/").post(async (req, res) => {
  const response = await productService.addProduct(req.body);
  return res.json(response);
});
//update
router.route("/:id").put(async (req, res) => {
  const response = await productService.updateProduct(req.params.id, req.body);
  return res.json(response);
});
// delete
router.route("/:id").delete(async (req, res) => {
  const response = await productService.deleteProduct(req.params.id);
  return res.json(response);
});

module.exports = router;
