#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');

const REPO_ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const REQUIRED_FIELDS = ['id', 'title', 'sidebar_label', 'description', 'tags'];

let hasErrors = false;
const errors = [];
const idMap = new Map();
const warnings = [];

function validateFrontmatter(filePath, fileName, globalIdMap) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      errors.push(`❌ ${fileName}: Missing front-matter (no YAML section)`);
      hasErrors = true;
      return;
    }

    const attributes = parsed.data;

    // Check for required fields
    REQUIRED_FIELDS.forEach((field) => {
      if (!attributes[field]) {
        errors.push(`❌ ${fileName}: Missing required field "${field}"`);
        hasErrors = true;
      } else if (field === 'tags' && !Array.isArray(attributes[field])) {
        errors.push(
          `❌ ${fileName}: Field "tags" should be an array, got ${typeof attributes[
            field
          ]}`
        );
        hasErrors = true;
      } else if (
        field === 'description' &&
        typeof attributes[field] !== 'string'
      ) {
        errors.push(
          `❌ ${fileName}: Field "description" should be a string`
        );
        hasErrors = true;
      }
    });

    // Check for duplicate IDs (against entire docs tree)
    if (attributes.id) {
      const existing = globalIdMap.get(attributes.id);
      if (existing && existing !== fileName) {
        errors.push(
          `❌ Duplicate ID "${attributes.id}": Found in ${fileName} and ${existing}`
        );
        hasErrors = true;
      }
      idMap.set(attributes.id, fileName);
    }

    // Validate sidebar_position if present
    if (attributes.sidebar_position !== undefined) {
      if (typeof attributes.sidebar_position !== 'number') {
        errors.push(
          `❌ ${fileName}: Field "sidebar_position" should be a number, got ${typeof attributes[
            'sidebar_position'
          ]}`
        );
        hasErrors = true;
      }
    } else {
      warnings.push(
        `⚠️  ${fileName}: Missing "sidebar_position" (optional but recommended)`
      );
    }

    // Validate title length
    if (typeof attributes.title === 'string' && attributes.title.length > 100) {
      warnings.push(
        `⚠️  ${fileName}: Title is too long (${attributes.title.length} chars, recommended max 100)`
      );
    }

    // Validate description length
    if (typeof attributes.description === 'string' && attributes.description.length < 20) {
      warnings.push(
        `⚠️  ${fileName}: Description is too short (${attributes.description.length} chars, recommended min 20)`
      );
    }
  } catch (err) {
    errors.push(`❌ ${fileName}: Error parsing file - ${err.message}`);
    hasErrors = true;
  }
}

function walkDir(dir, onFile) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.')) {
        walkDir(filePath, onFile);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      onFile(filePath);
    }
  });
}

/** Map document id -> relative path (for duplicate detection). */
function buildGlobalIdMap() {
  const map = new Map();
  walkDir(DOCS_DIR, (filePath) => {
    try {
      const parsed = matter(fs.readFileSync(filePath, 'utf8'));
      const id = parsed.data?.id;
      if (id) {
        const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
        map.set(id, relativePath);
      }
    } catch {
      // ignore parse errors here; validateFrontmatter will report them
    }
  });
  return map;
}

/** In CI, validate only docs changed in the PR so legacy pages do not block new work. */
function getChangedDocFiles() {
  if (!process.env.GITHUB_ACTIONS) {
    return null;
  }

  const baseRef = process.env.GITHUB_BASE_REF || 'main';
  try {
    const stdout = execSync(`git diff --name-only origin/${baseRef}...HEAD -- docs/`, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });
    return stdout
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
      .map((f) => path.join(REPO_ROOT, f))
      .filter((f) => fs.existsSync(f));
  } catch (err) {
    console.warn(`⚠️  Could not list changed docs vs origin/${baseRef}: ${err.message}`);
    return null;
  }
}

console.log('🔍 Validating front-matter in documentation files...\n');

const globalIdMap = buildGlobalIdMap();
const changedFiles = getChangedDocFiles();

try {
  if (changedFiles !== null) {
    if (changedFiles.length === 0) {
      console.log('✅ No documentation files changed in this PR.\n');
      process.exit(0);
    }
    console.log(`📂 PR scope: validating ${changedFiles.length} changed file(s) under docs/\n`);
    changedFiles.forEach((filePath) => {
      const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
      validateFrontmatter(filePath, relativePath, globalIdMap);
    });
  } else {
    walkDir(DOCS_DIR, (filePath) => {
      const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
      validateFrontmatter(filePath, relativePath, globalIdMap);
    });
  }
} catch (err) {
  console.error('Error scanning docs directory:', err);
  process.exit(1);
}

// Print results
if (errors.length > 0) {
  console.log('❌ VALIDATION ERRORS:\n');
  errors.forEach((err) => console.log(err));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach((warn) => console.log(warn));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(
    '✅ All documentation files have valid front-matter!\n'
  );
}

console.log(
  `📊 Scanned ${idMap.size} files, found ${errors.length} error(s) and ${warnings.length} warning(s)`
);

process.exit(hasErrors ? 1 : 0);
