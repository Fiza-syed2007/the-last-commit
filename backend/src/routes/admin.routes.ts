
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";
import {
  authenticateAdmin,
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

const router = Router();

/*
 * PUBLIC
 * Admin login.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      },
      jwtSecret,
      {
        expiresIn: "2h",
      }
    );

    return res.json({
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Login failed.",
    });
  }
});

/*
 * PROTECTED
 * Verify the currently authenticated admin.
 */
router.get(
  "/me",
  authenticateAdmin,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.admin) {
        return res.status(401).json({
          message: "Authentication required.",
        });
      }

      const admin = await prisma.admin.findUnique({
        where: {
          id: req.admin.adminId,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      if (!admin) {
        return res.status(404).json({
          message: "Admin account not found.",
        });
      }

      return res.json({
        admin,
      });
    } catch (error) {
      console.error("Admin verification error:", error);

      return res.status(500).json({
        message: "Failed to verify admin.",
      });
    }
  }
);

export default router;