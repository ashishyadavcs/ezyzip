const cloudinary = require("cloudinary").v2;
const orderModel = require("../models/order");

// Cloudinary configuration

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { description, userid, whatsapp,  } = req.body;
    let image = null;

    // Check if an image is received in the request
    if (req.files && req.files.image && req.files.image[0]) {
        console.log('Uploading image...');
        const imageFile = req.files.image[0];

        // Upload image buffer to Cloudinary
        image = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'images', resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        console.error('Error uploading to Cloudinary:', error);
                        return reject(error);
                    }
                    resolve(result.secure_url);
                }
            );
            uploadStream.end(imageFile.buffer);
        });
    }

    console.log('Uploaded image URL:', image);

    const order = new orderModel({
      description,
      userid,
      whatsapp,
      image: image
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order created", data: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

module.exports = { createOrder, getAllOrders };
