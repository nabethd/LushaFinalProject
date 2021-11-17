const express = require("express");
const cors = require("cors");

const productsController = require("./controllers/productsController");
const customersController = require("./controllers/customersController");
const purchasesController = require("./controllers/purchasesController");
// const menuController = require("./controllers/menueController");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// app.use("/", menuController);
app.use("/products", productsController);
app.use("/customers", customersController);
app.use("/purchases", purchasesController);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
