import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/Route.js";
import bodyParser from "body-parser";

import Role from "./models/Role.js";
import Users from "./models/User.js";
import PageSetting from "./models/PageSetting.js";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");

  // Sync all models (creates tables if they don't exist, preserves existing data)
  await db.sync();

  // Seed roles if they don't exist
  const rolesCount = await Role.count();
  if (rolesCount === 0) {
    await Role.bulkCreate([
      { id: 1, name: "Admin", description: "Administrator with full access" },
      { id: 2, name: "User", description: "Standard user" },
      { id: 3, name: "Staff", description: "Staff member" },
    ]);
    console.log("Default roles seeded.");
  }

  // Seed Page Settings if they don't exist
  const defaultPageSettings = [
    { page_key: "portfolio", display_name: "Portfolio", is_active: true },
    { page_key: "services", display_name: "Services", is_active: true },
    { page_key: "guides", display_name: "Guides", is_active: true },
    { page_key: "why_us", display_name: "Why Us", is_active: true },
    { page_key: "testimonials", display_name: "Testimonials", is_active: true },
    { page_key: "contact", display_name: "Contact", is_active: true },
  ];

  for (const setting of defaultPageSettings) {
    const [pageSetting, created] = await PageSetting.findOrCreate({
      where: { page_key: setting.page_key },
      defaults: setting,
    });
    if (created) {
      console.log(`Page setting created for: ${setting.page_key}`);
    }
  }
} catch (error) {
  console.log(error);
}

app.use(
  cors({
    credentials: true,
    origin: true, // reflects the request origin, allowing both localhost and Vercel domains securely
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());

// Parse URL-encoded bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Use your routes
app.use("/api", router); // Assuming your routes are under the /api path

app.use(express.json());

app.use("/api", router);
app.use("/Images", express.static("./Images"));

// Export the Express API for Vercel
export default app;

// Ensure it still runs locally if called directly
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server up and running"));
}
