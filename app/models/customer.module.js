const sql = require('../db.js');

//constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created Customer: ", {id: res.insertId, ...newCustomer});
        result(null, {id: res.insertId, ...newCustomer});
    });
};

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (error, res) => {
        if (error) {
            console.log("error: ", error);
            result(error, null);
            return;
        }
        if (res.length) {
            let first = res[0];
            console.log("found Customer: ", first);
            result(null, first);
            return;
        }

        //Fallback not found Customer with the id
        result({kind: "not_found"}, null);
    });
};

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Customers: ", res);
        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
      "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
      [customer.email, customer.name, customer.active, id],
      (err, res) => {
          if (err) {
              console.log("Error: ", err);
              result(null, err);
              return;
          }

          if (res.affectedRows == 0) {
              result({kind: "not_found"}, null);
              return;
          }

          console.log("updated customer: ", {id:id, ...customer});
          result(null, {id:id, ...customer});
      });
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      if (err) {
          console.log("Error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRows == 0) {
          result({kind: "not_found"}, null);
      }

      console.log("Deleted customer with id: ", id);
      result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      console.log(`Deleted ${res.affectedRows} customers`);
      result(null, res);
  });
};

module.exports = Customer;