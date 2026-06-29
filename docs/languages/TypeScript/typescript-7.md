---
id: strings-and-manipulation
sidebar_position: 7
title: "Strings & Text Processing"
sidebar_label: "Strings"
---

Strings are primitive immutable entities in TypeScript. Modifications create new allocations instead of altering the original text in memory.

## 1. Syntax Formats & Template Literal Interpolations

TypeScript supports standard string quotations alongside advanced multi-line evaluation blocks using backticks:

```typescript
let operatorGroup: string = 'Network Cluster';
let systemNode: string = "Central Router Core";

// Template Literal formatting injecting variables directly
let systemReport: string = `Status Update: The active [${systemNode}] is managed by [${operatorGroup}].`;
```

## 2. Essential Built-In Text Manipulation Methods

```typescript
let textFragment: string = "   TypeScript Compilation Engine   ";

// Trimming whitespace and converting case profiles
let cleanString = textFragment.trim().toLowerCase();

// Substring extraction boundary indexing
let engineKeyword = cleanString.substring(11, 22); // "compilation"

// Pattern checks matching boolean structures
let containsEngine: boolean = cleanString.includes("engine"); // true
```
