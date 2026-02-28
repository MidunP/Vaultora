import { Router } from "express";
import { RegisterController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", RegisterController);

export default authRoutes;

// This file defines the authentication routes for the application.