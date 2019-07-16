"use strict";
const nodeMailer = require("nodemailer");
const Customer = require("./models");
require("dotenv").config();

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

exports.sendRandomMail = async (req, res) => {
  Customer.count().exec((err, count) => {
    const random = Math.floor(Math.random() * count);
    Customer.findOne()
      .skip(random)
      .exec((err, customer) => {
        const transporter = nodeMailer.createTransport({
          host: "smtp.transip.email",
          port: 465,
          secure: true,
          auth: {
            user: "test@kraakhelder-productions.nl",
            pass: process.env.MAIL_PASS
          }
        });
        const mailOptions = {
          from: "Ben <test@kraakhelder-productions.nl>",
          to: customer.email,
          subject: "Random winner",
          text: `Hello ${customer.name}, you win.`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message %s sent: %s", info.messageId, info.response);
        });
        res.json(customer);
      });
  });
};

exports.addCustomer = (req, res) => {
  if (!req.body.name || !req.body.email)
    return res.status(400).json({
      error: "A customer needs at least a name and email"
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
