# Docusaurus Broken Links Fix - Complete Guide

## Problem Analysis

### Root Cause
The `RelatedTopics.jsx` component receives topic strings that are already doc **paths**, not plain titles:
- `"category/arrays"` → should link to `/algo/docs/basic-data-structures/array/` (category page)
- `"extra/graphs/bfs/#definition"` → should link to `/algo/docs/extra/graphs/bfs/#definition`
- `"category/queue"` → should link to `/algo/docs/extra/queue/` (category page)

However, the component treats them as plain text titles and generates incorrect paths:
```javascript
const slug = topic.toLowerCase().replace(/\s+/g, "-");
const to = useBaseUrl(`/docs/programming-fundamentals/${slug}`);
// Input: "category/arrays"
// Output: /algo/docs/programming-fundamentals/category/arrays ❌ WRONG
```

### Why It Fails
1. **Hardcoded path prefix**: `/docs/programming-fundamentals/` doesn't work for all topics
2. **No path interpretation**: The component doesn't recognize these are already doc paths
3. **Slug generation**: Simple lowercasing doesn't handle nested paths or anchors
4. **baseUrl addition**: `useBaseUrl()` adds `/algo/` prefix correctly, but the rest of the path is malformed

### Actual Docusaurus Structure
```
docs/
├── basic-data-structures/
│   ├── array/
│   │   └── _category_.json (generates /docs/basic-data-structures/array/)
│   ├── queue/
│   └── stacks/
├── extra/
│   ├── graphs/
│   │   └── bfs/
│   └── linked-list/
└── ...
```

## Solution: Fix RelatedTopics Component

### Approach
Transform topic strings into correct Docusaurus paths:
- `"category/arrays"` → `/docs/basic-data-structures/array/`
- `"extra/graphs/bfs/#definition"` → `/docs/extra/graphs/bfs/#definition`
- `"category/queue"` → `/docs/extra/queue/`

### Key Changes
1. **Add topic path mapping** for "category/*" prefixes
2. **Remove hardcoded paths** - use actual topic strings
3. **Parse anchors** correctly (e.g., `#definition`)
4. **Use Link from @docusaurus/Link** properly
5. **Add fallback handling** for missing mappings

## Implementation

### How to Fix (4 Steps)

**Step 1: Update docusaurus.config.js**
```javascript
// Change from:
onBrokenLinks: "throw",

// To (temporarily):
onBrokenLinks: "warn",
```

**Step 2: Replace RelatedTopics.jsx** with the corrected version

**Step 3: Test the build**
```bash
npm run build
```

**Step 4: Change back onBrokenLinks to "throw"** once verified

## Why This Works

1. **Direct path usage**: Topic strings are already valid Docusaurus paths
2. **Category mapping**: "category/*" is replaced with actual folder names
3. **Anchor preservation**: `#` anchors are kept intact
4. **useBaseUrl consistency**: Properly adds `/algo/` prefix to `/docs/*` paths
5. **No more slug generation**: Respects actual folder structure

## Related Files

- `src/components/RelatedTopics.jsx` - Component to fix
- `docusaurus.config.js` - Temporary onBrokenLinks change
- `sidebars.js` - Auto-generated sidebar from folder structure

## Best Practices Going Forward

1. **Pass topic paths, not names**: Use `"category/arrays"` not `"Arrays"`
2. **Include anchors when needed**: `"extra/graphs/bfs/#definition"`
3. **Validate paths exist**: Check folder structure matches topic strings
4. **Use _category_.json**: Docusaurus generates category pages automatically
5. **Test builds**: Run `npm run build` before committing

## Alternative Solutions

### Option A: Use Docusaurus Doc Links
```javascript
import { useDocusaurusContext } from '@docusaurus/core/lib/contexts/docusaurus';
const { siteConfig } = useDocusaurusContext();
// Can access docs metadata from plugin context
```

### Option B: Pre-compute Links
Generate links at build time from `_category_.json` files instead of runtime.

### Option C: Use Custom Docusaurus Plugin
Create a plugin that validates links during build to catch broken references early.

## Testing Checklist

- [ ] `npm run build` completes without "onBrokenLinks" errors
- [ ] All RelatedTopics links are clickable
- [ ] Links point to correct destination
- [ ] Anchors work correctly (e.g., jumps to section)
- [ ] Dark mode styling works
- [ ] Mobile responsive
- [ ] No console errors in browser
