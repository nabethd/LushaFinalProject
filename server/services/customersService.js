const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finalProjectDB",
  password: "1234",
  port: 5432,
});

const getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM customers", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows);
    });
  });
};

const getCustomer = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM customers WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows[0]);
    });
  });
};

const addCustomer = (cus) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO customers(
         first_name, last_name, city)
        VALUES('${cus.first_name}', '${cus.last_name}', '${cus.city}')`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("Created!");
      }
    );
  });
};

const updateCustomer = (id, cus) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE customers
      SET first_name='${cus.first_name}', last_name='${cus.last_name}', city='${cus.city}'  WHERE id=${id}`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("Updated!");
      }
    );
  });
};

const deleteCustomer = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM customers WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve("Deleted!");
    });
  });
};

module.exports = {
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
