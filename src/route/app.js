const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/imageupload');
const orderController=require('../controller/ordercontroller')


router.post('/order-create',upload,orderController.createOrder)
router.get('/get-order',orderController.getAllOrders)










module.exports = router;