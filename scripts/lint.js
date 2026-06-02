import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "dist/index.html",
  "dist/about.html",
  "dist/solutions.html",
  "dist/case-studies.html",
  "dist/industries.html",
  "dist/contact.html",
  "dist/request-demo.html",
  "dist/assets/styles.css",
  "dist/assets/main.js"
];

const legacyFiles = ["dist/services.html", "dist/projects.html"];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing ${file}`);
  }
}

for (const file of legacyFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing legacy redirect ${file}`);
  }
}

const scanFiles = [
  ...walk(path.join(root, "src")),
  ...(fs.existsSync(path.join(root, "dist")) ? walk(path.join(root, "dist")) : [])
].filter((file) => /\.(js|css|html)$/.test(file));

const bannedPhrases = [
  ["lorem", "ipsum"],
  ["loan", "app"],
  ["recover", "debts"],
  ["credit", "provider"],
  ["debt", "collector"],
  ["generic", "it", "company"]
].map((parts) => parts.join(" "));

for (const file of scanFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lower = content.toLowerCase();
  for (const phrase of bannedPhrases) {
    if (lower.includes(phrase)) {
      failures.push(`Banned or placeholder phrase "${phrase}" found in ${path.relative(root, file)}`);
    }
  }
}

for (const htmlFile of requiredFiles.filter((file) => file.endsWith(".html"))) {
  const content = fs.readFileSync(path.join(root, htmlFile), "utf8");
  if (!content.includes("<title>")) failures.push(`${htmlFile} is missing title metadata`);
  if (!content.includes('name="description"')) failures.push(`${htmlFile} is missing description metadata`);
  if (!content.includes('name="viewport"')) failures.push(`${htmlFile} is missing viewport metadata`);
  if (!content.includes("<main id=\"main\">")) failures.push(`${htmlFile} is missing semantic main landmark`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Lint checks passed");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
}
