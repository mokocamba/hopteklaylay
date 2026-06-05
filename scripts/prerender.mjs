// Post-build static site generation for Cloudflare Pages.
// Builds an SSR bundle of src/entry-server.tsx, then renders each known
// route to dist/<route>/index.html using the existing dist/index.html as
// the template.

import { build } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, ".ssr");

async function run() {
  // 1. SSR bundle (separate output so it doesn't clobber dist/).
  await build({
    root,
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ".ssr",
      emptyOutDir: true,
      ssrEmitAssets: false,
      rollupOptions: {
        output: { format: "esm", entryFileNames: "entry-server.mjs" },
      },
    },
  });

  const mod = await import(
    path.join(ssrDir, "entry-server.mjs") + `?t=${Date.now()}`
  );
  const { render, services } = mod;

  const routes = [
    "/",
    "/profile",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
  ];

  const template = await fs.readFile(path.join(distDir, "index.html"), "utf-8");

  for (const route of routes) {
    const { html, head } = await render(route);
    let out = template.replace("<!--app-html-->", html);
    if (head) {
      out = out.replace("</head>", `    ${head}\n  </head>`);
    }
    const outPath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route, "index.html");
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, out);
    console.log("prerendered", route, "->", path.relative(root, outPath));
  }

  // 3. Clean up the SSR bundle so it doesn't ship in dist/.
  await fs.rm(ssrDir, { recursive: true, force: true });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});