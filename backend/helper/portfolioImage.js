import multer from "multer";
import { uploadToSupabase } from "./supabase.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG, PNG and WebP are allowed."),
      false,
    );
  }
};

const _upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("image");

export const upload = [_upload, uploadToSupabase("PortfolioImages")];

export const uploadPortfolioImage = (req, res) => {
  res
    .status(400)
    .json({
      error: "Not implemented as standalone with array middleware yet.",
    });
};
