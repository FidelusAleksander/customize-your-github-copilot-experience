## Step 3: Building Reusable Skills

Now that you've established instructions for assignments, you want to streamline creating new assignments.

Creating assignments is a repetitive task and involves multiple steps, a perfect scenario for a reusable skill!

- Creating the assignment
- Updating the website configuration to load the new assignment

### 📖 Theory: Agent Skills

Agent Skills are an [open standard](https://agentskills.io/) for giving AI agents specialized capabilities and workflows. A skill is a folder containing a `SKILL.md` file with metadata and instructions, plus optional scripts, references, and other resources.

```text
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources
```

Agents discover skills automatically through **progressive disclosure**:

1. **Discovery**: At startup, agents load only the skill's `name` and `description`.
1. **Activation**: When a task matches a skill's description, the agent reads the full `SKILL.md` instructions.
1. **Resources**: Additional files (references, scripts) are loaded only when needed.

This means agents can **use skills by themselves** — Copilot will automatically activate a skill when your request matches its description. You can also invoke a skill explicitly with a slash command (`/skill-name`). Because agents rely on the `name` and `description` to decide which skills to use, it's important to write a clear, specific description.

Visual Studio Code discovers skills from the `.github/skills/` directory by default.

> [!TIP]
> Write a clear `description` in the frontmatter so the agent knows **when** to use the skill. Reference additional files for templates, examples, and detailed documentation.

See the [VS Code Docs: Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills) for more information.

### ⌨️ Activity: Create an Assignment Skill

Now let's create a reusable skill that automates the entire assignment creation process. This is perfect for a skill because creating assignments involves multiple repetitive steps that follow the same pattern every time, and a skill can bundle the assignment template directly alongside the instructions.

1. Create the skill directory structure:

   ```text
   .github/skills/new-assignment/
   ```

1. Copy the assignment template into the skill's references directory so the skill is self-contained. Create the following file:

   ```text
   .github/skills/new-assignment/references/ASSIGNMENT-TEMPLATE.md
   ```

   Copy the contents of `templates/assignment-template.md` into this file.

1. Create the main skill file:

   ```text
   .github/skills/new-assignment/SKILL.md
   ```

1. Add the following content to define the skill's metadata and instructions:

   ```markdown
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
   1. Create `README.md` inside that directory following the structure from the [assignment template](references/ASSIGNMENT-TEMPLATE.md)
   1. Fill out all template sections — the objective should be 1-2 sentences, and tasks should have clear, measurable requirements
   1. (Optional) Add starter code files to the same directory if the assignment benefits from scaffolding

   ## Step 3: Update Website Configuration

   Add the new assignment to the `assignments` array in `config.json` so it appears on the website. Match the format of the existing entries. For the `dueDate` field, use the current date plus 7 days unless the user specifies otherwise.
   ```

### ⌨️ Activity: Test the Assignment Skill

1. Open Copilot Chat in VS Code and ensure you're in `Agent` mode.

1. Run your skill by typing `/new-assignment` in the chat input. There are 2 options:
   - Type just `/new-assignment` without a description. Copilot will ask what the assignment should be about.
   - Include the topic directly: `/new-assignment Building REST APIs with FastAPI framework`

      <details>
      <summary>💡 Assignment Topic Ideas</summary>

     ```text
     Python Text Processing - working with strings, file I/O, and text manipulation
     ```

     ```text
     Data Structures in Python - lists, dictionaries, sets, and tuples
     ```

     ```text
     Python Data Visualization - using matplotlib or plotly for charts and graphs
     ```

     ```text
     Building REST APIs with FastAPI framework
     ```

     ```text
     Statistics with Python - data analysis and statistical calculations using pandas and numpy
     ```

      </details>

1. Verify the new assignment appears in the assignments list on the website preview.

   <details>
   <summary>Assignment not showing? 🔍</summary>

   Check these items:
   - Refresh the page.
   - A new directory was created in `assignments/`.
   - The `config.json` file was updated with the new assignment.

   </details>

1. Review the generated assignment content to ensure it matches your established conventions.

1. Commit and push your changes:
   - The new skill directory: `.github/skills/new-assignment/` (including `SKILL.md` and `references/`)
   - The generated assignment directory and files.
   - Updated `config.json` configuration.

1. Wait for Mona to prepare the next step!

<details>
<summary>Having trouble? 🤷</summary><br/>

- Make sure the skill is in the `.github/skills/new-assignment/` directory with a `SKILL.md` file.
- The `name` field in `SKILL.md` frontmatter must match the parent directory name (`new-assignment`).
- If the skill doesn't appear in the `/` menu, reload the VS Code window.

</details>
