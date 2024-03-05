// controllers/mypantryController.ts

import { Request, Response, NextFunction } from "express";
import { query } from "../helpers/database"; // Update the import path

export async function getMyPantry(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const myPantryData = await query("SELECT * FROM mypantry");
    res.json({ myPantryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve myPantry data." });
  }
}

// Controller function to add a product to myPantry
export async function addProductToMyPantry(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { product_id, quantity } = req.body;
  try {
    // Check if there's already a record for the given product_id
    const existingRecord: any = await query(
      "SELECT * FROM mypantry WHERE product_id = ?",
      [product_id]
    );

    if (existingRecord.length > 0) {
      // If a record exists, update the quantity
      await query(
        "UPDATE mypantry SET quantity = quantity + ? WHERE product_id = ?",
        [quantity, product_id]
      );
    } else {
      // If no record exists, insert a new record
      await query("INSERT INTO mypantry (product_id, quantity) VALUES (?, ?)", [
        product_id,
        quantity,
      ]);
    }

    res
      .status(201)
      .json({ message: "Product added to myPantry successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to add product to myPantry." });
  }
}

// controller to edit product in myPantry

export async function editProductInMyPantry(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { product_id, quantity } = req.body;
  const { id } = req.params;
  try {
    // Assuming you have validation for product_id and quantity
    await query(
      "UPDATE mypantry SET product_id = ?, quantity = ? WHERE id = ?",
      [product_id, quantity, id]
    );
    res
      .status(201)
      .json({ message: "Product in myPantry updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update product in myPantry." });
  }
}

// controller to delete product from myPantry

export async function deleteProductFromMyPantry(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    await query("DELETE FROM mypantry WHERE id = ?", [id]);
    res
      .status(201)
      .json({ message: "Product deleted from myPantry successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete product from myPantry." });
  }
}
