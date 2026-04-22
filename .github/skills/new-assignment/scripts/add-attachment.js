const fs = require("fs");
const path = require("path");

const [assignmentId, displayName, filename, type] = process.argv.slice(2);

if (!assignmentId || !displayName || !filename || !type) {
  console.error(
    'Usage: node add-attachment.js <assignment-id> "<display-name>" <filename> <type>'
  );
  console.error(
    'Example: node add-attachment.js python-basics "Starter Code" starter-code.py python'
  );
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, "../../../../");
const configPath = path.join(repoRoot, "config.json");
const filePath = path.join(repoRoot, "assignments", assignmentId, filename);

// Verify the file exists on disk
if (!fs.existsSync(filePath)) {
  console.error(
    `Error: File not found: assignments/${assignmentId}/${filename}`
  );
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const assignment = config.assignments.find((a) => a.id === assignmentId);

if (!assignment) {
  console.error(
    `Error: Assignment "${assignmentId}" not found in config.json`
  );
  console.error(
    "Available IDs:",
    config.assignments.map((a) => a.id).join(", ")
  );
  process.exit(1);
}

// Create attachments array if it doesn't exist
if (!assignment.attachments) {
  assignment.attachments = [];
}

// Skip if an attachment with the same filename already exists
const existing = assignment.attachments.find((a) => a.file === filename);
if (existing) {
  console.log(
    `Skipped: "${filename}" is already attached to "${assignmentId}"`
  );
  process.exit(0);
}

assignment.attachments.push({
  name: displayName,
  file: filename,
  type: type,
});

fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log(
  `Added "${displayName}" (${filename}) to assignment "${assignmentId}"`
);
