"use strict";

const express = require("express");
const customerController = require("./controllers");
const router = express.Router();

router.route("").get((_, res) => res.send("Hello World!"));

router.route("/getCustomers").get(customerController.getCustomers);
router.route("/getCustomer/:id").get(customerController.getCustomer);
router.route("/sendMail").get(customerController.sendRandomMail);

router.route("/createCustomer").post(customerController.addCustomer);
router.route("/deleteCustomer/:id").delete(customerController.deleteCustomer);

module.exports = router;
