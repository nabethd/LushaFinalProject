const express = require("express");
const PurchasesService = require("../services/PurchasesService");

const router = express.Router();

//Get ALL customres
router.route("/").get(async (req, res) => {
  const Purchases = await PurchasesService.getAllPurchases();
  return res.json(Purchases);
});
router.route("/filtered").get(async (req, res) => {
  const Purchases = await PurchasesService.getFilteredData();
  console.log("*************", Purchases);
  return res.json(Purchases);
});

//Get by ID
router.route("/:id").get(async (req, res) => {
  const Purchases = await PurchasesService.getPurchase(req.params.id);
  return res.json(Purchases);
});
//add
router.route("/").post(async (req, res) => {
  console.log("in purchasesController");
  const response = await PurchasesService.addPurchase(req.body);
  return res.json(response);
});
//update
router.route("/:id").put(async (req, res) => {
  const response = await PurchasesService.updatePurchase(
    req.params.id,
    req.body
  );
  return res.json(response);
});
// delete
router.route("/:id").delete(async (req, res) => {
  const response = await PurchasesService.deletePurchase(req.params.id);
  return res.json(response);
});
router.route("/product/:id").delete(async (req, res) => {
  const response = await PurchasesService.deleteProductByIdFromPurchasesDB(
    req.params.id
  );
  return res.json(response);
});
router.route("/customers/:id").delete(async (req, res) => {
  const response = await PurchasesService.deleteCustomerByIdFromPurchasesDB(
    req.params.id
  );
  return res.json(response);
});

module.exports = router;
