const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finalProjectDB",
  password: "1234",
  port: 5432,
});

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM products", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows);
    });
  });
};

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows[0]);
    });
  });
};

const addProduct = (pro) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO products(
        name, price, quantity)
        VALUES('${pro.name}', ${pro.price}, ${pro.quantity})`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("Created!");
      }
    );
  });
};

const updateProduct = (id, pro) => {
  console.log("in updateProduct");
  console.log(pro);
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE products
      SET name='${pro.name}', price=${pro.price}, quantity=${pro.quantity}  WHERE id=${id}`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("Updated!");
      }
    );
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM products WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve("Deleted!");
    });
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
