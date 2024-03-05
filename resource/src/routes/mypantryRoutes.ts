// routes/mypantryRoutes.ts

import { Router } from "express";
import {
  getMyPantry,
  addProductToMyPantry,
  editProductInMyPantry,
  deleteProductFromMyPantry,
} from "../controllers/mypantryController";
import { validateMyPantryProduct } from "../helpers/validation"; // You'll need to create this validation middleware

const router = Router();

router.get("/mypantry", getMyPantry);
router.post("/mypantry", validateMyPantryProduct, addProductToMyPantry);
router.put("/mypantry/:id", validateMyPantryProduct, editProductInMyPantry);
router.delete("/mypantry/:id", deleteProductFromMyPantry);

export { router as myPantryRoutes };
