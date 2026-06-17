---
id: arrays-and-tuples
sidebar_position: 8
title: "Arrays & Tuples"
sidebar_label: "Arrays & Tuples"
---

TypeScript features linear data arrays alongside highly specific, fixed-size **Tuples** for type validation checks.

## 1. Array Declarations

You can initialize array data types using trailing square brackets or standard functional generic wrappers:

```typescript
// Standard array syntax format
let dataStreams: number[] = [102, 304, 508];

// Alternative Generic structural configuration
let alternateStreams: Array<number> = [102, 304, 508];
```

## 2. High-Performance Functional Transformations

```typescript
let baselineMetrics: number[] = [10, 20, 30];

// Transform structural layout via mapping mechanics
let scaledMetrics = baselineMetrics.map(val => val * 1.5); // [15, 30, 45]

// Filter data paths using condition assertions
let filteredCollection = baselineMetrics.filter(val => val > 15); // [20, 30]
```

## 3. Strict Fixed-Size Tuples

Tuples let you declare arrays with a fixed number of elements whose types are explicitly predefined at specific index positions:

```typescript
// Explicit type indexing layout mapping
let diagnosticPair: [number, string];

diagnosticPair = [404, "Target Resource Not Found"]; // Valid

// diagnosticPair = ["Failed", 500]; // Error: Type alignment mismatch at index 0
```
