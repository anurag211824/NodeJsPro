// 📦 Import required core modules
import { readFile, writeFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { mkdir } from "fs/promises";

// 📍 Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Path to JSON file where short links are stored
const DATA_FILE = path.join(__dirname, "data", "link.json");
console.log("📁 Resolved DATA_FILE path:", DATA_FILE);

// 📥 Load existing links from the file, or initialize it
const loadLinks = async () => {
  try {
    await mkdir(path.dirname(DATA_FILE), { recursive: true });

    const data = await readFile(DATA_FILE, "utf-8");

    // ✅ Handle empty file
    if (!data.trim()) {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

// 💾 Save updated links to the JSON file
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

// 🚀 Create the HTTP server
const server = createServer(async (req, res) => {
  console.log("⚡ Incoming Request:", req.method, req.url);

  // 🌐 Serve static files for GET requests
  if (req.method === "GET" && !req.url.startsWith("/links/")) {
    const filePath = req.url === "/" ? "/index.html" : req.url;
    const fullPath = path.join(__dirname, "public", filePath);

    const ext = path.extname(fullPath);
    const contentType =
      {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
      }[ext] || "text/plain";

    try {
      const data = await readFile(fullPath);
      res.writeHead(200, { "Content-Type": contentType });
      return res.end(data);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 - File Not Found");
    }
  }

  // 🔗 Handle URL shortening request
  if (req.method === "POST" && req.url === "/shorten") {
    const links = await loadLinks();
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { url, shortCode } = JSON.parse(body);

        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Url is required");
        }

        const finalShortCode =
          shortCode || crypto.randomBytes(4).toString("hex");

        if (links[finalShortCode]) {
          res.writeHead(409, { "Content-Type": "text/plain" });
          return res.end("Short code already exists");
        }

        // ✅ Save as shortCode: url
        links[finalShortCode] = url;
        await saveLinks(links);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: true, shortCode: finalShortCode })
        );
      } catch (err) {
        console.error("❌ Error saving link:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Internal Server Error");
      }
    });
    return; // Important to return here to prevent further processing
  }

  // 🔍 Handle link lookup requests
  if (req.method === "GET" && req.url.startsWith("/links/")) {
    const shortCode = req.url.split("/")[2]; // Extract shortCode from URL
    const links = await loadLinks();

    const originalUrl = links[shortCode];

    if (originalUrl) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ shortCode, url: originalUrl }));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Short link not found");
    }x
  }

  // 🔁 Handle redirection from short code like http://localhost:3003/abc
  if (req.method === "GET") {
    const shortCode = req.url.slice(1); // removes the leading "/"
    const links = await loadLinks();
    const originalUrl = links[shortCode];

    if (originalUrl) {
      res.writeHead(302, { Location: originalUrl });
      return res.end();
    }
  }

  // Handle unknown routes
  res.writeHead(404, { "Content-Type": "text/plain" });
  return res.end("Not Found");
});

// 🟢 Start the server on PORT 3003
const PORT = 3003;
server.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
