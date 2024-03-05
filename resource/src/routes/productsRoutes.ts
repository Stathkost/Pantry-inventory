// routes/productsRoutes.ts

import { Router } from "express";
import {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productsController";
import { validateProduct } from "../helpers/validation"; // You'll need to create this validation middleware

const router = Router();

router.get("/products", getProducts);
router.post("/products", validateProduct, addProduct);
router.put("/products/:id", validateProduct, editProduct);
router.delete("/products/:id", deleteProduct);

export { router as productRoutes };
