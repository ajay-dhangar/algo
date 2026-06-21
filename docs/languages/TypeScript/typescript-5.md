---
id: loops-in-typescript
sidebar_position: 5
title: Loops
sidebar_label: Loops
description: >-
  Learn about Loops in the TypeScript programming language with core concepts,
  syntax, code examples, and best practices.
tags:
  - programming
  - dsa
  - typescript
  - loops
---

Loops allow you to run blocks of code repeatedly until specific bounds or conditional boundaries are met.

## 1. Traditional `for` & Conditional Iterations

```typescript
// Standard loop execution boundary counting
for (let index = 0; index < 5; index++) {
    console.log(`Incremental step tracking: ${index}`);
}

// Conditional pre-check loop execution
let coreCounter: number = 0;
while (coreCounter < 3) {
    coreCounter++;
}
```

## 2. Modern Array Iterations (`for...of` vs `for...in`)

`for...of`: Loops over the actual **values** inside an iterable collection (such as an array).

`for...in`: Loops over the **keys** or enumerable property strings of an object or array indexes.

```typescript
const processingNodes: string[] = ["Alpha", "Beta", "Gamma"];

// Extract indices or keys using for...in
for (const index in processingNodes) {
    console.log(`Index mapping pointer: ${index}`); // Outputs "0", "1", "2"
}

// Extract actual payload elements using for...of
for (const node of processingNodes) {
    console.log(`Processing node payload: ${node}`); // Outputs "Alpha", "Beta", "Gamma"
}
```

## 3. Jump Commands (`break` and `continue`)

`break`: Abruptly ends and exits the current loop scope completely.

`continue`: Skips the rest of the code in the current iteration and moves directly to the next loop step.

```typescript
for (let targetIdx = 0; targetIdx < 10; targetIdx++) {
    if (targetIdx === 2) continue; // Skips printing 2
    if (targetIdx === 5) break;    // Stops the entire loop when index hits 5
    console.log(`Active step: ${targetIdx}`);
}
```
