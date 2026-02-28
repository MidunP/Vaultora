import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validators/auth.validator";

export const RegisterController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);
    
    // Registration logic here

    return res
      .status(HTTPSTATUS.CREATED)
      .json({ message: "User registered successfully" });
  }
);