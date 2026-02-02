/**
 * ============================================================================
 * MAIN SERVER - Hono Edge Function
 * ============================================================================
 * TIER 2 ADDITIONS:
 * ✅ Lead capture system with Copper CRM integration
 * ✅ Lead backup to database
 * ✅ Lead statistics endpoint
 * 
 * TIER 3 ADDITIONS:
 * ✅ Authentication routes for admin login
 * ✅ Blog post CRUD API
 * ✅ Image upload to Supabase Storage
 * ============================================================================
 */

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import leads from "./leads.tsx";
import auth from "./auth.tsx";
import posts from "./posts.tsx";
import upload from "./upload.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e8e0d145/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ========== TIER 2: Lead Capture Routes ==========
app.route("/make-server-e8e0d145/leads", leads);

// ========== TIER 3: Admin & Blog Routes ==========
app.route("/make-server-e8e0d145/api/auth/login", auth);
app.route("/make-server-e8e0d145/api/posts", posts);
app.route("/make-server-e8e0d145/api/upload-image", upload);

Deno.serve(app.fetch);