import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const indexHtml = path.join(dist, "index.html");
const serverDir = path.join(dist, "server");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(indexHtml))) {
  console.error("Static build check failed: dist/index.html is missing.");
  process.exit(1);
}

if (await exists(serverDir)) {
  console.error(
    "Static build check failed: dist/server exists. Remove @astrojs/cloudflare / Wrangler Pages adapter config.",
  );
  process.exit(1);
}

const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const deps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
};
for (const name of ["@astrojs/cloudflare", "wrangler"]) {
  if (deps[name]) {
    console.error(`Static build check failed: "${name}" must not be a dependency for Pages static deploy.`);
    process.exit(1);
  }
}

console.log("Static build verified: dist/ is HTML-only.");
