"use strict";

import connection from "../config/db_connection";

const env = process.env.NODE_ENV || "development";

/**
 * Get filter list
 * @returns {array} filter list
 */
export async function getFilterList(req, res, next) {
  let countries = await fetchRecord("SELECT DISTINCT country from customers");
  let orderYears = await fetchRecord(
    "SELECT DISTINCT YEAR(orderDate) as year FROM orders"
  );
  let manager = await fetchRecord(
    "SELECT DISTINCT firstName, lastName FROM employees"
  );

  res.status(200).json({
    countries,
    orderYears,
    manager,
  });
}

function fetchRecord(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}

export async function getOrderList(req, res, next) {
  const filter = [];
  const payload = [];

  if (req.query.year) {
    filter.push("YEAR(O.orderDate) = " + req.query.year);
  }
  if (req.query.country) {
    filter.push("C.country = '" + req.query.country + "'");
  }
  if (req.query.manager) {
    filter.push("E.employeeNumber = " + req.query.manager);
  }

  let orderList = await fetchRecord(
    "SELECT O.orderNumber, O.orderDate, C.customerName, C.phone, C.addressLine1, c.country, O.status, SUM(OD.quantityOrdered * OD.priceEach) as total " +
      "FROM employees E LEFT JOIN customers C ON C.salesRepEmployeeNumber = E.employeeNumber " +
      "LEFT JOIN payments P ON C.customerNumber = P.customerNumber " +
      "LEFT JOIN orders O On P.customerNumber = O.customerNumber " +
      "LEFT JOIN orderdetails OD ON O.orderNumber = OD.orderNumber " +
      "WHERE " +
      filter.join(" AND ") +
      " " +
      "GROUP BY O.orderNumber"
  );

  if (!orderList.length) {
    return res.status(404).send({ success: false });
  }

  res.status(200).send(orderList);
}

export async function getOrderDetailList(req, res, next) {
  if (!req.query.orderid) {
    return res.status(404).send({ success: false });
  }

  let orderList = await fetchRecord(
    "SELECT OD.productCode, P.productName, OD.quantityOrdered, OD.priceEach, (OD.quantityOrdered * OD.priceEach) as subtotal " +
      "FROM orders O LEFT JOIN orderdetails OD OPTIONS O.orderNumber = OD.orderNumber " +
      "LEFT JOIN products P ON OD.productCode = P.productCode " +
      "WHERE O.orderNumber = " +
      req.query.orderid
  );

  if (!orderList.length) {
    return res.status(404).send({ success: false });
  }

  res.status(200).send(orderList);
}
