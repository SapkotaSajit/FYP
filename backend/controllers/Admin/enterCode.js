

import express from 'express';
import { verifyResetCode } from '../controllers/forgotPassword.js';

const router = express.Router();

router.post('/api/enter-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await verifyResetCode(email, code);
    if (result.success) {
      res.status(200).json({ message: "Verification successful" });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ error: "Failed to verify code" });
  }
});

export default router;
