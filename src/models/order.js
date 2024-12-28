const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    whatsapp: {
        type: Number,
        required: false, // Optional field
        validate: {
            validator: function (v) {
                // Validate for positive integers only (basic example)
                return v > 0 && Number.isInteger(v);
            },
            message: (props) => `${props.value} is not a valid WhatsApp number!`,
        },
    },
    status: {
        type: String,
        enum: ["paid", "pending"], // Corrected to string literals
        default: "pending",
    },
});

const Order = mongoose.model("Order", orderSchema); // Capitalized model name
module.exports = Order;
