// controllers/productsController.ts

import { Request, Response, NextFunction } from "express";
import { query } from "../helpers/database";
import axios from "axios";
import fs from "fs";
import path from "path";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await query("SELECT * FROM products");
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve products." });
  }
}

// Controller function to add a product
export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description, unit, image } = req.body;
  try {
    // Validate name, description, and unit (you can add your validation here)

    // Initialize image URL variable
    let imageUrl: string | null = null;

    // If an image URL is provided, download and save the image
    if (image && typeof image === "string" && image.startsWith("http")) {
      // Ensure photos directory exists
      const photosDirectory = path.join(__dirname, "../../photos");
      if (!fs.existsSync(photosDirectory)) {
        fs.mkdirSync(photosDirectory);
      }

      const response = await axios.get(image, { responseType: "stream" });
      const imagePath = path.join(photosDirectory, `${name}.jpg`);
      const imageStream = response.data.pipe(fs.createWriteStream(imagePath));
      await new Promise((resolve, reject) => {
        imageStream.on("finish", resolve);
        imageStream.on("error", reject);
      });
      imageUrl = `../../photos/${name}.jpg`; // Assuming the photos folder is located at ../../photos
    } else if (req.file) {
      // If an image file is uploaded, save it to the photos folder
      const tempPath = req.file.path;
      const targetPath = path.join(
        __dirname,
        "../../photos",
        req.file.originalname
      );
      fs.renameSync(tempPath, targetPath);
      imageUrl = `../../photos/${req.file.originalname}`;
    }

    // Insert the product into the database
    await query(
      "INSERT INTO products (name, description, unit, image_url) VALUES (?, ?, ?, ?)",
      [name, description, unit, imageUrl]
    );

    res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to add product." });
  }
}

// Controller function to edit a product
export async function editProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description, unit, image } = req.body;
  const productId = req.params.id;
  try {
    // Validate name, description, and unit (you can add your validation here)
    // Initialize image URL variable
    let imageUrl: string | null = null;

    // If an image URL is provided, download and save the image
    if (image && typeof image === "string" && image.startsWith("http")) {
      // Ensure photos directory exists
      const photosDirectory = path.join(__dirname, "../../photos");
      if (!fs.existsSync(photosDirectory)) {
        fs.mkdirSync(photosDirectory);
      }

      const response = await axios.get(image, { responseType: "stream" });
      const imagePath = path.join(photosDirectory, `${name}.jpg`);
      const imageStream = response.data.pipe(fs.createWriteStream(imagePath));
      await new Promise((resolve, reject) => {
        imageStream.on("finish", resolve);
        imageStream.on("error", reject);
      });
      imageUrl = `../../photos/${name}.jpg`; // Assuming the photos folder is located at ../../photos
    } else if (req.file) {
      // If an image file is uploaded, save it to the photos folder
      const tempPath = req.file.path;
      const targetPath = path.join(
        __dirname,
        "../../photos",
        req.file.originalname
      );
      fs.renameSync(tempPath, targetPath);
      imageUrl = `../../photos/${req.file.originalname}`;
    }

    // Update the product information in the database
    await query(
      "UPDATE products SET name = ?, description = ?, unit = ?, image_url = ? WHERE id = ?",
      [name, description, unit, imageUrl, productId]
    );

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update product." });
  }
}

// controller to delete product

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    await query("DELETE FROM products WHERE id = ?", [id]);
    res.status(201).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete product." });
  }
}
