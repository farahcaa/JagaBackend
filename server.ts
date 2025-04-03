import express from "express";
import dotenv from "dotenv";
import UnAuthroute from "./src/routes/UnauthedRoutes";
import Authroute from "./src/routes/AuthedRoutes";
import Striperoute from "./src/routes/StripeRoutes";
import mongoose from "mongoose";
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL as string;
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  methods: ["POST", "PUT", "GET"],
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UnAuthroute);
app.use(Authroute);
app.use(Striperoute);
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
