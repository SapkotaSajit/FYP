import multer from "multer";
import path from "path";
import fs from "fs";

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL;
const dir = isVercel ? "/tmp/Images/PortfolioImages" : "Images/PortfolioImages";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("image");

export const uploadPortfolioImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: "File uploaded successfully" });
  });
};
