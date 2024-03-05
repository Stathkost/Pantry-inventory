// helpers/validation.ts

import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Validation schema for product input data
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, "").optional(),
  unit: Joi.string().valid("kg", "quantity").required(),
  image: Joi.alternatives().try(
    Joi.string().uri(),
    Joi.string().allow(null, "")
  ),

  // Add more validation rules as needed
});

// Validation schema for myPantry input data
const myPantrySchema = Joi.object({
  product_id: Joi.number().required(),
  quantity: Joi.number().positive().required(),
  // Add more validation rules as needed
});

// Middleware for validating product data in a request
export function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// Middleware for validating myPantry data in a request
export function validateMyPantryProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = myPantrySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
