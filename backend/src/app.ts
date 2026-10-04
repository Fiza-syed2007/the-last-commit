
import cors from "cors";
import express from "express";

import registrationRoutes from "./routes/registration.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "THE LAST COMMIT API",
    status: "online",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "the-last-commit-api",
  });
});

app.use("/api/admin", adminRoutes);
app.use("/api/registrations", registrationRoutes);

export default app;
