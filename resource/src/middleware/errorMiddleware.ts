// Custom error middleware to handle errors in your Express.js application

import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();

// Middleware for handling 404 errors (Route not found)
export async function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// Middleware for handling all errors (including custom errors)
export async function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const mode = process.env.mode || "production";

  if (mode === "development") {
    res.status(statusCode);
    res.json({
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
      },
    });
  } else {
    res.status(statusCode);
    res.json({
      error: {
        message: "Internal Server Error",
      },
    });
  }
}
