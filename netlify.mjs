import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "db.json"); // Put db.json next to this file

export default async (req) => {
  const url = new URL(req.url);
  const method = req.method;
  const path = url.pathname.slice(1); // e.g., "posts"

  let db = JSON.parse(readFileSync(dbPath, "utf8"));

  if (method === "GET") {
    return new Response(JSON.stringify(db[path] || []), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (method === "POST") {
    const body = await req.json();
    db[path] = db[path] || [];
    db[path].push(body);
    return new Response(JSON.stringify(db[path]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (method === "PUT") {
    const body = await req.json();
    db[path] = db[path] || [];
    db[path][body.id] = body;
    return new Response(JSON.stringify(db[path]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (method === "DELETE") {
    const body = await req.json();
    db[path] = db[path] || [];
    db[path] = db[path].filter((item) => item.id !== body.id);
    return new Response(JSON.stringify(db[path]), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
