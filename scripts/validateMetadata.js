#!/usr/bin/env node

/**
 * validateMetadata.js
 *
 * Validates the optional metadata schema fields on algorithm documentation files.
 * This complements validate-frontmatter.js (which checks core required fields)
 * by enforcing schema rules on the new standardized metadata fields:
 *
 *   category, subcategory, difficulty, time_complexity, space_complexity,
 *   languages, prerequisites
 *
 * Fields are OPTIONAL — missing fields produce warnings.
 * Malformed fields (wrong type, invalid enum value) produce errors.
 *
 * Usage:
 *   node scripts/validateMetadata.js
 *   npm run validate:metadata
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(__dirname, '../docs');

// Valid values for enumerated fields
const VALID_DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

// Metadata fields and their validation rules
const METADATA_SCHEMA = {
  category: { type: 'string', description: 'Main Topic (e.g., Graph Algorithms)' },
  subcategory: { type: 'string', description: 'Topic Group (e.g., Shortest Path)' },
  difficulty: {
    type: 'enum',
    values: VALID_DIFFICULTIES,
    description: 'Difficulty level',
  },
  time_complexity: {
    type: 'string',
    pattern: /^O\(.+\)$/,
    description: 'Runtime complexity (e.g., O(E log V))',
  },
  space_complexity: {
    type: 'string',
    pattern: /^O\(.+\)$/,
    description: 'Memory complexity (e.g., O(V))',
  },
  languages: { type: 'array', itemType: 'string', description: 'Available implementations' },
  prerequisites: { type: 'array', itemType: 'string', description: 'Required knowledge' },
};

let hasErrors = false;
const errors = [];
const warnings = [];
let totalFiles = 0;
let filesWithMetadata = 0;

function validateMetadata(filePath, fileName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      return; // No frontmatter at all — handled by validate-frontmatter.js
    }

    const attributes = parsed.data;
    totalFiles++;

    let hasAnyMetadataField = false;

    for (const [field, rules] of Object.entries(METADATA_SCHEMA)) {
      const value = attributes[field];

      if (value === undefined || value === null) {
        // Field is missing — just a warning, not an error
        continue;
      }

      hasAnyMetadataField = true;

      // Type validation
      switch (rules.type) {
        case 'string':
          if (typeof value !== 'string') {
            errors.push(`❌ ${fileName}: Field "${field}" should be a string, got ${typeof value}`);
            hasErrors = true;
          } else if (value.trim().length === 0) {
            errors.push(`❌ ${fileName}: Field "${field}" should not be empty`);
            hasErrors = true;
          }
          // Pattern validation (for complexity fields)
          if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
            warnings.push(
              `⚠️  ${fileName}: Field "${field}" value "${value}" doesn't match expected pattern (e.g., O(n), O(n log n))`
            );
          }
          break;

        case 'enum':
          if (!rules.values.includes(value)) {
            errors.push(
              `❌ ${fileName}: Field "${field}" has invalid value "${value}". Must be one of: ${rules.values.join(', ')}`
            );
            hasErrors = true;
          }
          break;

        case 'array':
          if (!Array.isArray(value)) {
            errors.push(`❌ ${fileName}: Field "${field}" should be an array, got ${typeof value}`);
            hasErrors = true;
          } else if (value.length === 0) {
            warnings.push(`⚠️  ${fileName}: Field "${field}" is an empty array`);
          } else if (rules.itemType) {
            value.forEach((item, idx) => {
              if (typeof item !== rules.itemType) {
                errors.push(
                  `❌ ${fileName}: Field "${field}[${idx}]" should be a ${rules.itemType}, got ${typeof item}`
                );
                hasErrors = true;
              }
            });
          }
          break;
      }
    }

    if (hasAnyMetadataField) {
      filesWithMetadata++;
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
      if (!file.startsWith('.')) {
        walkDir(filePath);
      }
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const relativePath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
      validateMetadata(filePath, relativePath);
    }
  });
}

console.log('🔍 Validating metadata schema in documentation files...\n');

try {
  walkDir(DOCS_DIR);
} catch (err) {
  console.error('Error scanning docs directory:', err);
  process.exit(1);
}

// Print results
if (errors.length > 0) {
  console.log('❌ METADATA VALIDATION ERRORS:\n');
  errors.forEach((err) => console.log(err));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  METADATA WARNINGS:\n');
  warnings.forEach((warn) => console.log(warn));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All metadata fields are valid!\n');
}

console.log(
  `📊 Scanned ${totalFiles} files with frontmatter, ${filesWithMetadata} have metadata fields, found ${errors.length} error(s) and ${warnings.length} warning(s)`
);

process.exit(hasErrors ? 1 : 0);
