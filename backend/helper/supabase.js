import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

// We will initialize the client lazily to prevent crashing the Vercel app
// if the environment variables are not yet configured in the dashboard.
let supabaseClient = null;

const getSupabase = () => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL || "https://dummy.supabase.co";
    const supabaseKey = process.env.SUPABASE_ANON_KEY || "dummykey";
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
};

export const uploadToSupabase = (folderName) => {
  return async (req, res, next) => {
    if (!req.file) return next();

    try {
      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `${folderName}/${fileName}`;

      if (!process.env.SUPABASE_URL) {
        throw new Error(
          "Missing SUPABASE_URL in Vercel environment variables.",
        );
      }

      const supabase = getSupabase();
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase Upload Error:", error);
        return res
          .status(500)
          .json({ message: "Failed to upload to Supabase" });
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      // Attach relative path so frontend and DB don't need changes
      req.file.path = `Images/${folderName}/${fileName}`;

      next();
    } catch (err) {
      console.error("Unexpected Error in uploadToSupabase:", err);
      return res.status(500).json({ message: "File upload failed" });
    }
  };
};
