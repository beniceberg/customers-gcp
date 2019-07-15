"use strict";

const Customer = require("./models");

exports.getCustomers = (_, res) => {
  Customer.find()
    .sort([["name", 1]])
    .then(customers => res.json(customers));
};

exports.getCustomer = (req, res) => {
  Customer.findOne({ _id: req.params.id })
    .then(customer => res.json(customer))
    .catch(() => res.sendStatus(404));
};

exports.addCustomer = (req, res) => {
  if (!req.body.name)
    return res.status(400).json({
      error: "A customer needs at least a name"
    });

  const { name, age, dateOfBirth, email, address } = req.body;

  Customer.create({ name, age, email, address, dateOfBirth }).then(customer =>
    res.status(201).json(customer)
  );
};

exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id;
  Customer.findOneAndRemove({
    _id: customerId
  })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(404));
};
