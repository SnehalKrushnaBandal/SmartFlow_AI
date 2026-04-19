import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "dist")));

app.get("/health", (req, res) => {
  res.json({
  status: "OK",
  service: "SmartFlow AI",
  version: "1.0",
  uptime: process.uptime()
});

});

app.get("/ai-prediction", (req, res) => {
  res.json({
  system: "SmartFlow AI",
  zone: "Gate 1",
  current_level: "Medium",
  predicted_level: "High",
  prediction_time: "10 minutes",
  confidence: "85%"
});
});



// ✅ Google API test route (ADD HERE, after app is defined)
app.get("/google-api-test", async (req, res) => {
  try {
    const response = await fetch("https://www.googleapis.com/discovery/v1/apis");
    const data = await response.json();
    res.json({
  message: "Google API connected",
  source: "Google Discovery API",
  status: "success"
});
  } catch (error) {
    res.send("Error connecting to Google API");
  }
});

// React fallback
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
