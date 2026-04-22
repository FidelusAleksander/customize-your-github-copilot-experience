---
name: new-assignment
description: Create a new programming homework assignment for Mergington High School students. Use this skill whenever the user wants to create, add, scaffold, or generate a new assignment, exercise, or homework — even if they don't use the word "assignment" explicitly.
---

# Create New Programming Assignment

Generate a new homework assignment for the Mergington High School computer science course.

Assignments live in the `assignments/` directory, each in its own subfolder. The website reads from `config.json` to display them, so both the folder and the config entry need to be created.

## Step 1: Gather Assignment Information

If the user hasn't already specified a topic, ask them:

- What programming concept or topic should the assignment cover?
- Any specific difficulty level or prerequisites?

Keep the scope appropriate for high school students learning programming.

## Step 2: Create Assignment Structure

1. Create a new directory in `assignments/` with a short, descriptive, kebab-case name (e.g., `python-text-processing`)
1. Create `README.md` inside that directory following the structure from the [assignment template](../../../templates/assignment-template.md)
1. Fill out all template sections — the objective should be 1-2 sentences, and tasks should have clear, measurable requirements
1. (Optional) Add starter code files to the same directory if the assignment benefits from scaffolding

## Step 3: Update Website Configuration

> **IMPORTANT:** You MUST use the bundled script below to register the assignment. Do NOT edit `config.json` directly.

Run the script to register the new assignment on the website:

    node .github/skills/new-assignment/scripts/update-config.js <id> "<title>" "<description>"

This adds the entry to `config.json` with a due date 7 days from today.

## Step 4: Register Attachments

> **IMPORTANT:** You MUST use the bundled script below to register attachments. Do NOT edit `config.json` directly.

For every file you created in the assignment directory (starter code, data files, etc.), run the script to register it as an attachment so the website can link to it:

    node .github/skills/new-assignment/scripts/add-attachment.js <assignment-id> "<display-name>" <filename> <type>

For example, to register a starter code file:

    node .github/skills/new-assignment/scripts/add-attachment.js python-text-processing "Starter Code" starter-code.py python

Common attachment types: `python`, `csv`, `json`, `txt`, `html`

This is idempotent — running it twice for the same file is safe.
