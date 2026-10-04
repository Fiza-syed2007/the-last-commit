
import { Router } from "express";
import prisma from "../lib/prisma.js";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = Router();

/*
 * PUBLIC
 * Create a new hackathon registration.
 */
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      college,
      teamName,
      teamSize,
      teamMembers,
      projectName,
      track,
      description,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !college ||
      !teamName ||
      !teamSize ||
      !projectName ||
      !track ||
      !description
    ) {
      return res.status(400).json({
        message: "All required fields must be provided.",
      });
    }

    const registration = await prisma.registration.create({
      data: {
        fullName,
        email,
        college,
        teamName,
        teamSize: Number(teamSize),
        teamMembers: teamMembers || null,
        projectName,
        track,
        description,
      },
    });

    return res.status(201).json({
      message: "Registration created successfully.",
      registration,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Failed to create registration.",
    });
  }
});

/*
 * PROTECTED
 * Get all registrations for the admin dashboard.
 */
router.get("/", authenticateAdmin, async (_req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      registrations,
    });
  } catch (error) {
    console.error("Fetch registrations error:", error);

    return res.status(500).json({
      message: "Failed to fetch registrations.",
    });
  }
});

/*
 * PROTECTED
 * Update registration status.
 */
router.patch("/:id/status", authenticateAdmin, async (req, res) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { status } = req.body;

    const allowedStatuses = [
      "PENDING",
      "APPROVED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Use PENDING, APPROVED, or REJECTED.",
      });
    }

    const registration = await prisma.registration.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return res.json({
      message: "Registration status updated.",
      registration,
    });
  } catch (error) {
    console.error("Update registration status error:", error);

    return res.status(500).json({
      message: "Failed to update registration status.",
    });
  }
});

export default router;