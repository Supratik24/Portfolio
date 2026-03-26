import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

const root = process.cwd();

function hasDbName(uri) {
  // mongodb+srv://.../<db> or mongodb://.../<db>
  const beforeQuery = (uri ?? "").split("?")[0] ?? "";
  const slash = beforeQuery.lastIndexOf("/");
  if (slash === -1) return false;
  const db = beforeQuery.slice(slash + 1).trim();
  return db.length > 0;
}

async function readJson(relPath) {
  const abs = path.join(root, relPath);
  const raw = await fs.readFile(abs, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[seed] Missing MONGODB_URI. Copy .env.example to .env and set it.");
    process.exitCode = 1;
    return;
  }
  if (!hasDbName(uri)) {
    console.error("[seed] Your MONGODB_URI is missing a database name. Example: ...mongodb.net/portfolio?retryWrites=true&w=majority");
    process.exitCode = 1;
    return;
  }

  const site = await readJson("seed/site.json");
  const posts = await readJson("seed/posts.json");

  const siteSchema = new mongoose.Schema(
    {
      key: { type: String, required: true, unique: true },
      profile: { type: Object, default: null },
      skills: { type: Object, default: {} },
      projects: { type: Array, default: [] },
      updatedAt: { type: Date, required: true },
    },
    { timestamps: false },
  );
  const Site = mongoose.models.SeedSite ?? mongoose.model("SeedSite", siteSchema, "sites");

  const postSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      excerpt: { type: String, required: true, trim: true },
      body: { type: String, required: true, trim: true },
      publishedAt: { type: Date, required: true },
    },
    { timestamps: true },
  );
  const Post = mongoose.models.SeedPost ?? mongoose.model("SeedPost", postSchema, "posts");

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });

  await Site.findOneAndUpdate(
    { key: "main" },
    {
      $set: {
        key: "main",
        profile: site.profile ?? null,
        skills: site.skills ?? {},
        projects: Array.isArray(site.projects) ? site.projects : [],
        updatedAt: new Date(),
      },
    },
    { upsert: true, returnDocument: "after" },
  );

  if (Array.isArray(posts)) {
    for (const p of posts) {
      if (!p || typeof p !== "object") continue;
      const title = String(p.title ?? "").trim();
      if (!title) continue;
      const publishedAt = new Date(String(p.publishedAt ?? ""));
      if (Number.isNaN(publishedAt.getTime())) continue;

      await Post.findOneAndUpdate(
        { title },
        {
          $set: {
            title,
            excerpt: String(p.excerpt ?? ""),
            body: String(p.body ?? ""),
            publishedAt,
          },
        },
        { upsert: true, returnDocument: "after" },
      );
    }
  }

  await mongoose.disconnect();
  console.log("[seed] Seed complete: profile, skills, projects, posts.");
}

main().catch((err) => {
  const msg = err?.message ?? String(err);
  console.error("[seed] Failed:", msg);
  process.exitCode = 1;
});
