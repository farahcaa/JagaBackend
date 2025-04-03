import { Request, Response } from "express";
import Tees from "../models/Tees";
import Hoodies from "../models/Hoodies";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const domain = "http://localhost:5000";

export const handlePaymentRequest = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    const ids = items.map((item: { id: string }) => item.id);
    let total = 0;
    for (const id of ids) {
      const tee = await Tees.findOne({ _id: id });
      if (tee) {
        total += tee.price;
        continue;
      }
      const hoodie = await Hoodies.findOne({ _id: id });
      if (hoodie) {
        total += hoodie.price;
        continue;
      }
    }
    const price = (total + 5) * 100;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      payment_method_types: ["card", "cashapp"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      price: price,
    });
  } catch (error) {
    console.error("Error handling payment request:", error);
    res.status(500).send("Error handling payment request");
  }
};
