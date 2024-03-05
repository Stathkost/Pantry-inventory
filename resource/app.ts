import express from "express";
import { config } from "dotenv";

import cors from "cors";

import { notFound, errorHandler } from "./src/middleware/errorMiddleware";

import { productRoutes } from "./src/routes/productsRoutes"; // Import product routes
import { myPantryRoutes } from "./src/routes/mypantryRoutes"; // Import myPantry routes

config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", myPantryRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
