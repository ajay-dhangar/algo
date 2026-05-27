# RelatedTopics Component - Testing & Debugging Guide

## Quick Start

### 1. Test the Build
```bash
npm run build
```

### 2. What to Look For
- Build completes without crashing ✅
- Logs show warnings for any remaining broken links
- `build/` folder is generated successfully

### 3. Run Dev Server
```bash
npm run start
```

### 4. Manual Testing
- Click each Related Topics link
- Verify it navigates to the correct page
- Check that anchors work (e.g., `#definition`)

---

## Understanding the Fix

### What Changed
The component now:
1. **Recognizes category paths**: `"category/arrays"` → `/docs/basic-data-structures/array/`
2. **Preserves anchors**: `"extra/graphs/bfs/#definition"` → keeps `#definition`
3. **Uses useBaseUrl correctly**: Adds `/algo/` prefix automatically
4. **Validates paths**: Logs warnings for invalid topics
5. **Generates labels**: `"category/arrays"` → displays as "Arrays"

### Category Path Mapping
```javascript
const CATEGORY_PATH_MAP = {
  "arrays": "basic-data-structures/array/",
  "linked-list": "extra/linked-list/",
  "queue": "extra/queue/",
  "stacks": "extra/stack/",
  "graphs": "extra/graphs/",
  "recursion": "programming-fundamentals/functions/",
  "sorting": "extra/sortings/",
  "searching": "extra/binary-search/",
};
```

**If a category isn't in the map**, it falls back to:
```javascript
return `/docs/basic-data-structures/${categoryName}/`;
```

---

## Troubleshooting

### Issue: Still Getting Broken Link Warnings
**Cause**: Category name not in `CATEGORY_PATH_MAP` or path doesn't exist

**Solution**: 
1. Check the actual folder name in `docs/` folder
2. Add/update the mapping in `RelatedTopics.jsx`
3. Verify folder structure matches

Example:
```
docs/
  basic-data-structures/
    array/              ← actual folder
    queue/              ← actual folder
```

Mapping:
```javascript
"arrays": "basic-data-structures/array/",    ✅ "arrays" → "array"
"queue": "extra/queue/",                     ✅ "queue" → "queue"
```

### Issue: Links Work but Go to Wrong Page
**Cause**: Incorrect category mapping

**Solution**:
1. Go to `docs/` and find the actual folder
2. Update the mapping to match exact folder name
3. Test again

### Issue: Anchor Links Don't Work
**Cause**: Heading doesn't exist in destination page

**Solution**:
1. Check the markdown file for the exact heading
2. Verify Docusaurus generates the correct anchor ID
3. Update the reference in your markdown

Example:
```markdown
## Definition

<RelatedTopics topics={["extra/graphs/bfs/#definition"]} />
```

### Issue: Labels Display Incorrectly
**Cause**: Path format unexpected

**Debug**: Add this temporarily to `getTopicLabel()`:
```javascript
console.log(`[RelatedTopics] Label for "${topic}":`, label);
```

---

## Common Topic Formats

### Format 1: Category Reference
```
"category/arrays"
"category/queue"
"category/stacks"
```
Used in: Basic data structure pages

### Format 2: Direct Path
```
"extra/graphs/bfs"
"extra/linked-list/introduction"
"programming-fundamentals/functions/recursion"
```
Used in: Cross-topic references

### Format 3: With Anchor
```
"extra/graphs/bfs/#definition"
"basic-data-structures/array/#operations"
```
Used in: References to specific sections

---

## Adding New Categories

### Step 1: Verify Folder Exists
Check that `docs/path/to/category/_category_.json` exists

### Step 2: Update CATEGORY_PATH_MAP
```javascript
const CATEGORY_PATH_MAP = {
  // ... existing entries ...
  "new-category": "path/to/category/",  // ← Add here
};
```

### Step 3: Use in Markdown
```markdown
<RelatedTopics topics={["category/new-category"]} />
```

### Step 4: Test
```bash
npm run build
npm run start
```

---

## Advanced: Validating All Links

### Create a Link Validator Script
```bash
# Create a file: scripts/validate-links.js
```

```javascript
const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, '../docs');
const existingPaths = new Set();

function scanDocs(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      const relPath = path.relative(docsPath, filePath)
        .replace(/\\/g, '/')
        .toLowerCase();
      existingPaths.add(relPath);
      scanDocs(filePath);
    }
  }
}

scanDocs(docsPath);

// Log all valid paths
console.log('Valid doc paths:');
Array.from(existingPaths).sort().forEach(p => console.log('  /docs/' + p));
```

Run with:
```bash
node scripts/validate-links.js
```

---

## When Ready: Switch Back to "throw"

Once all links are verified:

1. Change `docusaurus.config.js`:
```javascript
onBrokenLinks: "throw",  // ← Back to strict mode
```

2. Test build:
```bash
npm run build
```

3. Should complete without errors ✅

---

## Performance Notes

- **Runtime**: Component processes topics on each render (minimal impact)
- **Build time**: No impact (processing happens in browser/at runtime)
- **Bundle size**: No increase (logic is simple string operations)

---

## Next Steps

1. **Run build**: Test the fix
2. **Check warnings**: Address any remaining broken links
3. **Click links**: Manually verify navigation
4. **Update categories**: Add new mappings as needed
5. **Switch to throw**: Once fully verified

For detailed reference, see `DOCUSAURUS_LINK_GUIDE.md`
