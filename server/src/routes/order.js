// // Backend: Node.js + Express
// import express from 'express';
// import { Order } from '../models/orders.js';

// const router = express.Router();

// router.post('/order', async (req, res) => {
//   try {
//     const orderData = req.body;
//     const newOrder = new Order(orderData);
//     await newOrder.save();
//     res.status(201).json({ message: 'Order saved successfully' });
//   } catch (error) {
//     console.error('Error saving order:', error);
//     res.status(500).json({ error: 'Failed to save order' });
//   }
// });

// export default router;


import express from 'express';
import { Order } from '../models/orders.js';

const router = express.Router();

router.post('/order', async (req, res) => {
  try {
    const orderData = req.body;

    // Validate order data before saving
    const isValid = orderData.items.every(
      (item) =>
        item.productImage &&
        item.productColor &&
        item.productSize &&
        item.productPrice > 0
    );

    if (!isValid) {
      return res.status(400).json({ error: 'Some product details are missing.' });
    }

    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

export default router;
