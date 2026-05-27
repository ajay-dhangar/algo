#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');
const REQUIRED_FIELDS = ['id', 'title', 'sidebar_label', 'description', 'tags'];

let hasErrors = false;
const errors = [];
const idMap = new Map();
const warnings = [];

function validateFrontmatter(filePath, fileName) {
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

    // Check for duplicate IDs
    if (attributes.id) {
      if (idMap.has(attributes.id)) {
        errors.push(
          `❌ Duplicate ID "${attributes.id}": Found in ${fileName} and ${idMap.get(
            attributes.id
          )}`
        );
        hasErrors = true;
      } else {
        idMap.set(attributes.id, fileName);
      }
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
    if (attributes.title && attributes.title.length > 100) {
      warnings.push(
        `⚠️  ${fileName}: Title is too long (${attributes.title.length} chars, recommended max 100)`
      );
    }

    // Validate description length
    if (attributes.description && attributes.description.length < 20) {
      warnings.push(
        `⚠️  ${fileName}: Description is too short (${attributes.description.length} chars, recommended min 20)`
      );
    }
  } catch (err) {
    errors.push(`❌ ${fileName}: Error parsing file - ${err.message}`);
    hasErrors = true;
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
      const relativePath = path.relative(DOCS_DIR, filePath);
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
