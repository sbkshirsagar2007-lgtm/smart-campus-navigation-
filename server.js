// ============================================================
// SMART CAMPUS NAVIGATION SYSTEM — server.js
// Node.js + Express + MongoDB (via Mongoose)
// ============================================================
require("dotenv").config();

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const path     = require("path");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// ── MongoDB Connection ────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/campusNav";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    seedDatabase(); // auto-populate if DB is empty
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("   Make sure MongoDB is running or MONGO_URI is set correctly.");
    process.exit(1);
  });

// ── Schemas & Models ─────────────────────────────────────────

// Location Schema
const locationSchema = new mongoose.Schema({
  id:   { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sub:  { type: String, default: "" },
  icon: { type: String, default: "📍" },
});
const Location = mongoose.model("Location", locationSchema);

// Step sub-schema (used inside Route)
const stepSchema = new mongoose.Schema({
  icon: { type: String, default: "🚶" },
  text: { type: String, required: true },
}, { _id: false });

// Route Schema
const routeSchema = new mongoose.Schema({
  from:     { type: String, required: true },
  to:       { type: String, required: true },
  distance: { type: String, default: "" },
  steps:    { type: [stepSchema], default: [] },
  tips:     { type: String, default: "" },
});
routeSchema.index({ from: 1, to: 1 }, { unique: true });
const Route = mongoose.model("Route", routeSchema);

// ── Seed Data (runs only if DB is empty) ─────────────────────
async function seedDatabase() {
  const locationCount = await Location.countDocuments();
  if (locationCount > 0) {
    console.log("ℹ️  Database already seeded — skipping.");
    return;
  }

  console.log("🌱 Seeding database with locations and routes...");

  await Location.insertMany([
    { id: "main_gate",   name: "Main Gate",      sub: "Entrance",   icon: "🚪" },
    { id: "admin_block", name: "Admin Block",     sub: "Block A",    icon: "🏛️" },
    { id: "library",     name: "Library",         sub: "Floor 1–3",  icon: "📚" },
    { id: "canteen",     name: "Canteen",         sub: "Food Court", icon: "🍽️" },
    { id: "cs_dept",     name: "CS Department",   sub: "Block B",    icon: "💻" },
    { id: "sports",      name: "Sports Complex",  sub: "Ground",     icon: "⚽" },
    { id: "auditorium",  name: "Auditorium",      sub: "Hall 1",     icon: "🎭" },
  ]);

  const routesData = [
    {
      from: "main_gate", to: "admin_block", distance: "~3 min walk",
      steps: [
        { icon: "🚶", text: "Enter through Main Gate and walk straight along the main pathway." },
        { icon: "↗️", text: "Turn right at the first junction after 50 meters." },
        { icon: "🏛️", text: "Admin Block is the large blue building on your left. Entrance is at the front." },
      ],
      tips: "💡 Admin Block offices open at 9:00 AM. Carry your ID card."
    },
    {
      from: "main_gate", to: "library", distance: "~5 min walk",
      steps: [
        { icon: "🚶", text: "Enter Main Gate and take the main pathway heading straight." },
        { icon: "➡️", text: "Continue walking past the Admin Block on your right." },
        { icon: "📚", text: "The Library is the tall building at the far end. Go up the front steps." },
      ],
      tips: "💡 Library hours: 8 AM – 8 PM. Bring your student card for entry."
    },
    {
      from: "main_gate", to: "canteen", distance: "~4 min walk",
      steps: [
        { icon: "🚶", text: "Enter through Main Gate." },
        { icon: "↙️", text: "Turn left at the main junction." },
        { icon: "🍽️", text: "Walk 60 meters — the Canteen is the building with the yellow signboard." },
      ],
      tips: "💡 Canteen open 7:30 AM – 7 PM on weekdays."
    },
    {
      from: "main_gate", to: "cs_dept", distance: "~6 min walk",
      steps: [
        { icon: "🚶", text: "Enter Main Gate and walk along the main path." },
        { icon: "↙️", text: "Take the left fork at the central junction." },
        { icon: "⬇️", text: "Walk straight for about 80 meters past the Canteen." },
        { icon: "💻", text: "CS Department (Block B) is the red building ahead." },
      ],
      tips: "💡 Labs open Mon–Sat, 9 AM – 5 PM."
    },
    {
      from: "main_gate", to: "sports", distance: "~7 min walk",
      steps: [
        { icon: "🚶", text: "Enter Main Gate and walk straight on the main road." },
        { icon: "➡️", text: "At the far end of campus, turn right past the Library." },
        { icon: "⚽", text: "Sports Complex is the open green area. Enter via the side gate." },
      ],
      tips: "💡 Open 6 AM – 8 PM. Court booking required."
    },
    {
      from: "main_gate", to: "auditorium", distance: "~5 min walk",
      steps: [
        { icon: "🚶", text: "Enter Main Gate and head straight along the central path." },
        { icon: "↙️", text: "Turn left at the second junction (past Canteen)." },
        { icon: "🎭", text: "The Auditorium is the large hall at the southern end of campus." },
      ],
      tips: "💡 Check the notice board near Admin Block for upcoming events."
    },
    {
      from: "library", to: "cs_dept", distance: "~4 min walk",
      steps: [
        { icon: "📚", text: "Exit the Library from the main entrance and turn left." },
        { icon: "⬇️", text: "Walk back along the main path toward the central junction." },
        { icon: "↙️", text: "Take the left fork and walk 80 meters." },
        { icon: "💻", text: "CS Department (Block B) is on your right." },
      ],
      tips: "💡 Return your books at the Library before heading to the lab!"
    },
    {
      from: "canteen", to: "library", distance: "~4 min walk",
      steps: [
        { icon: "🍽️", text: "Exit the Canteen from the main door and turn right." },
        { icon: "⬆️", text: "Walk north along the left-side path for about 90 meters." },
        { icon: "➡️", text: "Turn right at the junction — the Library is the tall building ahead." },
      ],
      tips: "💡 Library has water dispensers for refills."
    },
    {
      from: "cs_dept", to: "auditorium", distance: "~5 min walk",
      steps: [
        { icon: "💻", text: "Exit CS Department from the ground floor entrance." },
        { icon: "⬇️", text: "Walk south on the side path for 60 meters." },
        { icon: "🎭", text: "The Auditorium is the large hall at the southern end." },
      ],
      tips: "💡 Reach 10 mins early for event seating."
    },
    {
      from: "admin_block", to: "canteen", distance: "~3 min walk",
      steps: [
        { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
        { icon: "↙️", text: "Turn left and walk down the side path." },
        { icon: "🍽️", text: "The Canteen is directly below on the left side." },
      ],
      tips: "💡 Peak hours 12–1 PM. Go a little early to avoid queues."
    },
  ];

  // Insert each route + its automatic reverse
  for (const r of routesData) {
    await Route.create(r);
    await Route.create({
      from: r.to, to: r.from,
      distance: r.distance,
      steps: [...r.steps].reverse(),
      tips: r.tips,
    });
  }

  console.log(`✅ Seeded ${await Location.countDocuments()} locations and ${await Route.countDocuments()} routes.`);
}

// ── API Endpoints ─────────────────────────────────────────────

// GET /api/health
app.get("/api/health", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    status: "ok",
    database: states[mongoose.connection.readyState],
    timestamp: new Date().toISOString(),
  });
});

// GET /api/locations
app.get("/api/locations", async (req, res) => {
  try {
    const locations = await Location.find({}, "-_id -__v").sort("name");
    res.json({ success: true, count: locations.length, locations });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch locations." });
  }
});

// GET /api/route?from=X&to=Y
app.get("/api/route", async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to)
    return res.status(400).json({ success: false, error: "Provide both 'from' and 'to' query params." });
  if (from === to)
    return res.status(400).json({ success: false, error: "Source and destination cannot be the same." });
  try {
    const route = await Route.findOne({ from, to }, "-_id -__v");
    if (!route)
      return res.status(404).json({ success: false, error: `No route found from '${from}' to '${to}'.` });
    res.json({ success: true, ...route.toObject() });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch route." });
  }
});

// GET /api/routes
app.get("/api/routes", async (req, res) => {
  try {
    const routes = await Route.find({}, "-_id -__v -steps -tips");
    res.json({ success: true, count: routes.length, routes });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch routes." });
  }
});

// Fallback → frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});