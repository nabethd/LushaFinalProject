const express = require("express");
const customreService = require("../services/customersService");

const router = express.Router();

//Get ALL customres
router.route("/").get(async (req, res) => {
  const products = await customreService.getAllCustomers();
  return res.json(products);
});
//Get by ID
router.route("/:id").get(async (req, res) => {
  const product = await customreService.getCustomer(req.params.id);
  return res.json(product);
});
//add
router.route("/").post(async (req, res) => {
  const response = await customreService.addCustomer(req.body);
  return res.json(response);
});
//update
router.route("/:id").put(async (req, res) => {
  const response = await customreService.updateCustomer(
    req.params.id,
    req.body
  );
  return res.json(response);
});
// delete
router.route("/:id").delete(async (req, res) => {
  const response = await customreService.deleteCustomer(req.params.id);
  return res.json(response);
});

module.exports = router;
