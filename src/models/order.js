const mongoose = require("mongoose");
const deleteTime = require("../utils/deleteFrdb");

const orderSchema = new mongoose.Schema(
	{
		manufacturer: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		model: {
			type: String,
			lowercase: true,
		},
		price: {
			type: Number,
			required: true,
			validate(value) {
				if (!value > 0) {
					throw new Error("Invalid Price!");
				}
			},
		},
		expireAt: {
			type: Date,
			expires: deleteTime,
			default: deleteTime + Date.now(),
		},
	},
	{
		timestamps: true,
	}
);

orderSchema.pre("save", async function (next) {
	next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
