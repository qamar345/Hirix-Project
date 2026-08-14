const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    // Never trust the client-supplied filename directly (path traversal /
    // overwrite risk) - generate our own name, keeping only the extension.
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    return cb(new Error("Only image uploads (jpg, png, webp, gif) are allowed"));
  }
  cb(null, true);
}

// Multer Middleware - restricted to images, capped at 5MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
