---
id: operators-in-typescript
sidebar_position: 3
title: "Operators"
sidebar_label: "Operators"
---

Operators perform standard math, evaluations, and structural transformations in TypeScript. Let's look at its unique utility operators alongside traditional operators.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. Arithmetic & Relational Operators

```typescript
let x: number = 10;
let y: number = 3;

// Modulus remainder operation
let remainder = x % y; // 1

// Strict structural comparisons
console.log(x === 10); // true (checks value and type alignment)
console.log(x !== y);  // true
```

## 2. Logical Operators

```typescript
let clearSky: boolean = true;
let lowWind: boolean = false;

// Compound conditional checks
let safeLaunch: boolean = clearSky && !lowWind; // true
```

## 3. Advanced TypeScript-Specific Operators

### a. Optional Chaining (`?.`)

Safely reads deeply nested object properties without manually verifying each parent layer's existence first:

```typescript
type Profile = { address?: { city: string } };
let userProfile: Profile = {};

// Prevents runtime crashes; evaluates cleanly to undefined if missing
let missingCity = userProfile.address?.city;
```

### b. Nullish Coalescing (`??`)

Returns its right-hand side operand when its left-hand side operand is `null` or `undefined`. Unlike fallback `||`, it ignores falsey values like empty strings `""` or numerical zero `0`.

```typescript
let dynamicLimit: number | null = null;
let workingLimit = dynamicLimit ?? 100; // Evaluates to 100
```
