#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, '../docs');
const REQUIRED_FIELDS = ['id', 'title', 'sidebar_label', 'description', 'tags'];

let hasErrors = false;
const errors = [];
const idMap = new Map();
const warnings = [];

// Get the list of modified/added markdown files in the current branch
function getModifiedFiles() {
  try {
    let baseRef = 'origin/main';
    
    // Fallback order: GITHUB_BASE_REF -> main -> develop
    const possibleBases = [];
    if (process.env.GITHUB_BASE_REF) {
      possibleBases.push(process.env.GITHUB_BASE_REF);
    }
    possibleBases.push('main', 'develop');

    for (const base of possibleBases) {
      try {
        // Try fetching the base branch first to avoid unknown revision error
        execSync(`git fetch --depth=1 origin ${base}`, { stdio: 'ignore' });
        baseRef = `origin/${base}`;
        break;
      } catch (fetchErr) {
        // If fetch fails, try if the local ref exists
        try {
          execSync(`git rev-parse --verify ${base}`, { stdio: 'ignore' });
          baseRef = base;
          break;
        } catch (e) {
          try {
            execSync(`git rev-parse --verify origin/${base}`, { stdio: 'ignore' });
            baseRef = `origin/${base}`;
            break;
          } catch (e2) {}
        }
      }
    }

    console.log(`ℹ️ Comparing current HEAD against base reference: ${baseRef}`);
    
    let stdout = '';
    try {
      stdout = execSync(`git diff --name-only ${baseRef}...`, { encoding: 'utf8' });
    } catch (diffErr) {
      console.warn(`⚠️ git diff ${baseRef}... failed, trying git diff ${baseRef}`);
      try {
        stdout = execSync(`git diff --name-only ${baseRef}`, { encoding: 'utf8' });
      } catch (diffErr2) {
        console.warn(`⚠️ git diff ${baseRef} failed, falling back to git diff HEAD~1`);
        try {
          stdout = execSync('git diff --name-only HEAD~1', { encoding: 'utf8' });
        } catch (e) {
          stdout = execSync('git diff --name-only', { encoding: 'utf8' });
        }
      }
    }

    const changedFiles = new Set(
      stdout
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.startsWith('docs/'))
        .map(f => path.resolve(path.join(__dirname, '..', f)))
    );
    return changedFiles;
  } catch (e) {
    console.warn("⚠️ Could not determine changed files via git diff:", e.message);
    // If it's a pull request and we failed to get changed files, we should still try not to fail the whole build for legacy files.
    // If we're in CI (GITHUB_ACTIONS is true), we can assume it's a PR context, and default to empty set if no markdown files are in git status.
    if (process.env.GITHUB_ACTIONS === 'true') {
      console.log("ℹ️ CI context detected, defaulting to empty set of changed files to avoid blocking on unmodified legacy files.");
      return new Set();
    }
    return null; // Fallback to scanning everything locally
  }
}

const changedFiles = getModifiedFiles();
const isPrContext = changedFiles !== null;

function validateFrontmatter(filePath, fileName) {
  const resolvedPath = path.resolve(filePath);
  const isFileModified = !isPrContext || changedFiles.has(resolvedPath);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      if (isFileModified) {
        errors.push(`❌ ${fileName}: Missing front-matter (no YAML section)`);
        hasErrors = true;
      }
      return;
    }

    const attributes = parsed.data;

    // Check for required fields
    REQUIRED_FIELDS.forEach((field) => {
      if (!attributes[field]) {
        if (isFileModified) {
          errors.push(`❌ ${fileName}: Missing required field "${field}"`);
          hasErrors = true;
        }
      } else if (field === 'tags' && !Array.isArray(attributes[field])) {
        if (isFileModified) {
          errors.push(
            `❌ ${fileName}: Field "tags" should be an array, got ${typeof attributes[
              field
            ]}`
          );
          hasErrors = true;
        }
      } else if (
        field === 'description' &&
        typeof attributes[field] !== 'string'
      ) {
        if (isFileModified) {
          errors.push(
            `❌ ${fileName}: Field "description" should be a string`
          );
          hasErrors = true;
        }
      }
    });

    // Check for duplicate IDs
    if (attributes.id) {
      if (idMap.has(attributes.id)) {
        const otherFile = idMap.get(attributes.id);
        const otherFileResolved = path.resolve(path.join(DOCS_DIR, otherFile));
        const isAnyModified = !isPrContext || changedFiles.has(resolvedPath) || changedFiles.has(otherFileResolved);

        if (isAnyModified) {
          errors.push(
            `❌ Duplicate ID "${attributes.id}": Found in ${fileName} and ${otherFile}`
          );
          hasErrors = true;
        }
      } else {
        idMap.set(attributes.id, fileName);
      }
    }

    // Validate sidebar_position if present
    if (attributes.sidebar_position !== undefined) {
      if (typeof attributes.sidebar_position !== 'number') {
        if (isFileModified) {
          errors.push(
            `❌ ${fileName}: Field "sidebar_position" should be a number, got ${typeof attributes[
              'sidebar_position'
            ]}`
          );
          hasErrors = true;
        }
      }
    } else {
      if (isFileModified) {
        warnings.push(
          `⚠️  ${fileName}: Missing "sidebar_position" (optional but recommended)`
        );
      }
    }

    // Validate title length
    if (typeof attributes.title === 'string' && attributes.title.length > 100) {
      if (isFileModified) {
        warnings.push(
          `⚠️  ${fileName}: Title is too long (${attributes.title.length} chars, recommended max 100)`
        );
      }
    }

    // Validate description length
    if (typeof attributes.description === 'string' && attributes.description.length < 20) {
      if (isFileModified) {
        warnings.push(
          `⚠️  ${fileName}: Description is too short (${attributes.description.length} chars, recommended min 20)`
        );
      }
    }
  } catch (err) {
    if (isFileModified) {
      errors.push(`❌ ${fileName}: Error parsing file - ${err.message}`);
      hasErrors = true;
    }
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip hidden and build directories
      if (!file.startsWith('.')) {
        walkDir(filePath);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
      validateFrontmatter(filePath, relativePath);
    }
  });
}

console.log('🔍 Validating front-matter in documentation files...\n');

try {
  walkDir(DOCS_DIR);
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
