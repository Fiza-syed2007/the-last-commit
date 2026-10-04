
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AdminTokenPayload {
  adminId: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  admin?: AdminTokenPayload;
}

export function authenticateAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const decoded = jwt.verify(token, jwtSecret) as AdminTokenPayload;

    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}
