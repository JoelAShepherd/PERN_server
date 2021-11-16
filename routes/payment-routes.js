const express = require('express');
const paymentRouter = require('express').Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require('../database/db');
const authorization = require('../middleware/authorization');

paymentRouter.use(bodyParser.urlencoded({ extended: true }));
paymentRouter.use(bodyParser.json());

paymentRouter.use(cors())

paymentRouter.post("/", cors(), authorization, async (req, res) => {
	let { amount, id, order, orderdate } = req.headers
	let user_id = req.user;

	try {
		//process the payment
		const payment = await stripe.paymentIntents.create({
			amount: amount,
			currency: "GBP",
			description: "PernStack",
			payment_method: id,
			confirm: true
		});

		//add order to the db
		const newOrder = 
		await pool.query('INSERT INTO orders (user_id, json_items_ordered, order_date, cost) VALUES ($1, $2, $3, $4) RETURNING *',
		[user_id, order, orderdate, amount]);
		
		//payment and db successful then:
		res.json({
			"message": "Payment successful",
			"success": true
		});
	} catch (error) {
		console.log("Error", error)
		res.status(400).json({
			"message": "Payment failed",
			"success": false
		})
	}
})



module.exports = paymentRouter; 