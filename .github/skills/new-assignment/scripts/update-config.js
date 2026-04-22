const fs = require("fs");
const path = require("path");

const [id, title, description] = process.argv.slice(2);
const configPath = path.resolve(__dirname, "../../../../config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

if (!id || !title || !description) {
  console.error(
    'Usage: node .github/skills/new-assignment/scripts/update-config.js <id> "<title>" "<description>"'
  );
  process.exit(1);
}

const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

config.assignments.push({
  id,
  title,
  description,
  path: `assignments/${id}`,
  dueDate,
});

fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log(`Added "${title}" (due ${dueDate})`);