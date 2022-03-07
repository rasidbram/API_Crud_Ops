const express = require("express");
const Order = require("../models/order");
const router = new express.Router();

// --------------------CREATE--------------------------

router.post("/orders", async (req, res) => {
	const order = new Order(req.body);
	try {
		await order.save();
		res.status(201).send(order);
	} catch (err) {
		res.status(400).send(err);
	}
});

// --------------------ViewAll--------------------------

router.get("/orders", async (req, res) => {
	try {
		const orders = await Order.find({});
		res.send(orders);
	} catch (err) {
		res.status(500).send();
	}
});

// --------------------ViewBy(ID)--------------------------

router.get("/orders/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const order = await Order.findById(_id);
		if (!order) {
			return res.status(404).send();
		}
	} catch (err) {
		res.status(500).send();
	}
});

// --------------------UPDATE------------------------------

router.patch("/orders/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["manufacturer", "model", "price"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!order) {
			return res.status(404).send();
		}

		res.send(order);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
