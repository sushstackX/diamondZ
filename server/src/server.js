require("dotenv").config();
const app = require("./app");

// ✅ Debug DATABASE_URL properly (don’t truncate too early)
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Optional: safer preview (hides password if present)
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  const safePreview = url.includes("@")
    ? url.split("@")[0] + "@***"
    : url.substring(0, 30);

  console.log("DATABASE_URL preview:", safePreview);
} else {
  console.log("❌ DATABASE_URL is NOT loaded");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});