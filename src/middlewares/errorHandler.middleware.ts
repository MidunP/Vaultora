import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.log("Error occurred on PATH:", req.path);
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      message: error.message,
      error: error?.message || "Unknown error occurred",
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};