# Docusaurus Links Best Practices for RelatedTopics

## Overview
This guide shows the correct ways to use RelatedTopics component and link patterns in Docusaurus.

---

## Correct Usage Patterns

### ✅ DO: Use Category References
```markdown
import RelatedTopics from '@site/src/components/RelatedTopics';

## Understanding Arrays

Arrays are fundamental data structures...

<RelatedTopics topics={[
  "category/linked-list",
  "category/stacks",
  "category/queue"
]} />
```

### ✅ DO: Use Direct Doc Paths
```markdown
<RelatedTopics topics={[
  "extra/graphs/bfs",
  "extra/graphs/dfs",
  "programming-fundamentals/functions/recursion"
]} />
```

### ✅ DO: Use Anchors for Specific Sections
```markdown
## Advanced Techniques

<RelatedTopics topics={[
  "extra/graphs/bfs/#implementation",
  "extra/graphs/dfs/#time-complexity",
  "basic-data-structures/array/#operations"
]} />
```

### ✅ DO: Mix Different Formats
```markdown
<RelatedTopics topics={[
  "category/queue",              // Category reference
  "extra/linked-list/doubly",    // Direct path
  "extra/graphs/bfs/#complexity" // With anchor
]} />
```

---

## ❌ AVOID: These Mistakes

### ❌ DON'T: Use Plain Topic Names
```markdown
<!-- This won't work! -->
<RelatedTopics topics={[
  "Arrays",
  "Linked Lists",
  "Stacks"
]} />
```
**Why**: Plain names are not valid Docusaurus paths

**Solution**: Use category references
```markdown
<RelatedTopics topics={[
  "category/arrays",
  "category/linked-list",
  "category/stacks"
]} />
```

### ❌ DON'T: Hardcode Full URLs
```markdown
<!-- This is fragile! -->
<RelatedTopics topics={[
  "/algo/docs/basic-data-structures/array/",
  "/algo/docs/extra/stack/"
]} />
```
**Why**: BaseUrl changes break all links

**Solution**: Use relative paths (no `/algo/`)
```markdown
<RelatedTopics topics={[
  "basic-data-structures/array",
  "extra/stack"
]} />
```

### ❌ DON'T: Use Windows Path Separators
```markdown
<!-- This is wrong! -->
<RelatedTopics topics={[
  "basic-data-structures\array",  ← backslash
  "extra\stack"                   ← backslash
]} />
```
**Solution**: Always use forward slashes
```markdown
<RelatedTopics topics={[
  "basic-data-structures/array",
  "extra/stack"
]} />
```

### ❌ DON'T: Mix Inconsistent Formats
```markdown
<!-- Inconsistent! -->
<RelatedTopics topics={[
  "category/arrays",
  "basic-data-structures/array/",      ← conflicting paths
  "/algo/docs/extra/stack/"            ← wrong format
]} />
```
**Solution**: Stick to one format
```markdown
<RelatedTopics topics={[
  "category/arrays",
  "category/linked-list",
  "category/stacks"
]} />
```

---

## Documentation Structure Reference

### Available Categories
```
docs/
├── basic-data-structures/
│   ├── array/              → use: "category/arrays"
│   ├── queue/              → use: "category/queue"
│   ├── stacks/             → use: "category/stacks"
│   ├── linked-list/        → use: "category/linked-list"
│   └── _category_.json
├── extra/
│   ├── Stack/              → use: "extra/stack" (lowercase)
│   ├── Queue/              → use: "extra/queue" (lowercase)
│   ├── linked-list/        → use: "category/linked-list"
│   ├── graphs/
│   │   ├── bfs/            → use: "extra/graphs/bfs"
│   │   ├── dfs/            → use: "extra/graphs/dfs"
│   │   └── _category_.json
│   └── _category_.json
├── programming-fundamentals/
│   ├── language-syntax/    → use: "programming-fundamentals/language-syntax"
│   ├── control-structures/ → use: "programming-fundamentals/control-structures"
│   ├── functions/          → use: "programming-fundamentals/functions"
│   └── _category_.json
├── languages/
│   ├── python/             → direct links: "languages/python/introduction-to-python"
│   ├── javascript/
│   ├── java/
│   └── _category_.json
└── data-structures/        → use: "data-structures/[topic]"
```

---

## Topic Path Reference

### Safe to Use (Verified Working)
```javascript
// Basic Data Structures
"category/arrays"              // /docs/basic-data-structures/array/
"category/linked-list"         // /docs/basic-data-structures/linked-list/
"category/stacks"              // /docs/basic-data-structures/stacks/ OR /docs/extra/stack/
"category/queue"               // /docs/basic-data-structures/queue/ OR /docs/extra/queue/

// Extra/Advanced
"extra/graphs/bfs"             // /docs/extra/graphs/bfs/
"extra/graphs/dfs"             // /docs/extra/graphs/dfs/
"extra/linked-list"            // /docs/extra/linked-list/
"extra/binary-search"          // /docs/extra/binary-search/

// Programming Fundamentals
"programming-fundamentals/control-structures"
"programming-fundamentals/functions"
"programming-fundamentals/language-syntax"

// Data Structures
"data-structures/what-is-dsa"
```

---

## Common Use Cases

### Use Case 1: Related Data Structures
```markdown
## Understanding Queues

A queue is a linear data structure...

<RelatedTopics topics={[
  "category/stacks",
  "category/linked-list",
  "extra/graphs/bfs"  // BFS uses queues
]} />
```

### Use Case 2: Algorithm Prerequisites
```markdown
## Depth-First Search (DFS)

DFS is a graph traversal algorithm...

<RelatedTopics topics={[
  "extra/graphs/bfs",           // Similar algorithm
  "category/stacks",             // Data structure used
  "programming-fundamentals/functions/recursion"  // Concept used
]} />
```

### Use Case 3: Language-Specific Content
```markdown
## Arrays in Python

Python arrays are flexible...

<RelatedTopics topics={[
  "category/arrays",             // General concept
  "languages/python/lists"       // Language-specific
]} />
```

### Use Case 4: Related Topics with Sections
```markdown
## Time Complexity

Understanding time complexity...

<RelatedTopics topics={[
  "extra/graphs/bfs/#time-complexity",
  "extra/graphs/dfs/#time-complexity",
  "programming-fundamentals/control-structures/#loops"
]} />
```

---

## Troubleshooting Reference

| Issue | Cause | Solution |
|-------|-------|----------|
| Link appears but goes to 404 | Path doesn't exist | Check folder structure, verify spelling |
| Link doesn't appear | Invalid topic format | Use "category/*" or "path/to/doc" |
| Anchor doesn't work | Section heading missing | Add `## Heading` to markdown |
| Wrong label displays | Path not recognized | Check category mapping in component |
| Multiple links duplicate | Using same topic twice | Remove duplicates from topics array |

---

## Performance Considerations

### Path Resolution
- Happens at **render time** (not build time)
- Uses simple string operations
- No API calls or data fetching
- Impact: negligible (~1ms per component)

### Anchor Handling
- Anchors preserved as-is (e.g., `#definition`)
- Client-side navigation uses browser anchors
- No build-time validation needed

### Link Validation
- Enable by setting `onBrokenLinks: "warn"` in docusaurus.config.js
- Happens at **build time**
- Catches only hardcoded paths, not dynamic ones
- Safe to use in production

---

## Migrating from Old Format

### If You Have Old Format:
```markdown
<!-- Old (from plain topic names) -->
<RelatedTopics topics={[
  "Arrays",
  "Stacks"
]} />
```

### Convert To:
```markdown
<!-- New (category references) -->
<RelatedTopics topics={[
  "category/arrays",
  "category/stacks"
]} />
```

### Or:
```markdown
<!-- Or direct paths -->
<RelatedTopics topics={[
  "basic-data-structures/array",
  "extra/stack"
]} />
```

---

## FAQ

**Q: What's the difference between `"category/arrays"` and `"basic-data-structures/array"`?**
A: `"category/arrays"` is mapped to the right path. Use whichever works, but keep it consistent.

**Q: Can I use both category and direct paths?**
A: Yes! Mix them in the same topics array:
```markdown
<RelatedTopics topics={[
  "category/arrays",        // Category reference
  "extra/graphs/bfs"        // Direct path
]} />
```

**Q: How do I find the correct path for a new doc?**
A: Check the `docs/` folder structure, then use that path (lowercase, with `/`).

**Q: Do I need the trailing slash?**
A: No, the component handles it either way:
```markdown
"category/arrays"   ← works
"category/arrays/"  ← also works
```

**Q: Can I use anchors with categories?**
A: Yes, if the category generates a page with sections:
```markdown
"category/arrays/#operations"
```
