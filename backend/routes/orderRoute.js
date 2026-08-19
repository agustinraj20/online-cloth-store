import express from "express";

import {
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// ===============================
// Admin Features
// ===============================

orderRouter.post("/list", adminAuth, allOrders);

orderRouter.post("/status", adminAuth, updateStatus);

// ===============================
// Order Features
// ===============================

// Cash on Delivery
orderRouter.post("/place", authUser, placeOrder);

// Stripe Payment
orderRouter.post("/stripe", authUser, placeOrderStripe);

// ===============================
// User Features
// ===============================

orderRouter.post("/userorders", authUser, userOrders);

// ===============================
// Payment Verification
// ===============================

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;