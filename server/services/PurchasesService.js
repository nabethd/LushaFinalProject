const { Pool } = require("pg");
const date = require("date-and-time");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finalProjectDB",
  password: "1234",
  port: 5432,
});

const getAllPurchases = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM purchases", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows);
    });
  });
};

const getPurchase = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM purchases WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.rows[0]);
    });
  });
};

const addPurchase = ({ customers_id, product_id }) => {
  const curDate = date.format(new Date(), "DD/MM/YYYY");

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO public.purchases(
       customers_id, product_id, date)
      VALUES (${customers_id}, ${product_id}, '${curDate}');`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("created");
      }
    );
  });
};

const updatePurchase = (id, per) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE purchases
      SET customers_id=${per.customers_id}, product_id=${per.product_id}, date='${per.date}'  WHERE id=${id}`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("Updated!");
      }
    );
  });
};

const deletePurchase = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM purchases WHERE id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve("Deleted!");
    });
  });
};

const deleteProductByIdFromPurchasesDB = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM purchases WHERE product_id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve("Deleted!");
    });
  });
};
const deleteCustomerByIdFromPurchasesDB = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM purchases WHERE customers_id=${id}`,
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve("Deleted!");
      }
    );
  });
};

const getFilteredData = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT customers_id, date, first_name, last_name, name, product_id
    FROM (SELECT *
        FROM purchases
        JOIN customers ON purchases.customers_id =customers.id) AS result
    JOIN products ON result.product_id = products.id
`
    );
    return rows;
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFilteredData,
  getAllPurchases,
  getPurchase,
  addPurchase,
  updatePurchase,
  deletePurchase,
  deleteProductByIdFromPurchasesDB,
  deleteCustomerByIdFromPurchasesDB,
};
