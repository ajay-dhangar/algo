---
id: data-types-and-variables
sidebar_position: 2
title: "Data Types & Variables"
sidebar_label: "Data Types & Variables"
---

Mastering data types is essential for maximizing TypeScript's type-safety assertions. Let's look at primitive types, variables, and type safety constraints.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. Variable Declarations (`let` vs `const`)

TypeScript strictly enforces standard JavaScript scoping layouts:
- `let`: Declares a block-scoped mutable variable.
- `const`: Declares a block-scoped immutable variable assignment contract.

```typescript
let balance: number = 5000;
balance = 4500; // Allowed

const secretKey: string = "AX9842";
// secretKey = "NEW"; // Error: Cannot assign to 'secretKey' because it is a constant.
```

## 2. Primitive Types

TypeScript features several foundational primitive built-in data types:

```typescript
const isComplete: boolean = true;
const processingRatio: number = 0.742; // Handles all integers, floats, hex, binary
const developerName: string = "Trushi";

const unassigned: undefined = undefined;
const emptyReference: null = null;
```

## 3. Special Utility Types

TypeScript introduces escape hatches and fallback types for strict evaluation environments:

### a. Any

The `any` type disables compile-time static safety checking. Use it carefully:

```typescript
let untrackedPayload: any = "Initial text string";
untrackedPayload = 42; // Allowed without compile warnings
```

### b. Unknown

The safe counterpart to `any`. You can assign anything to an `unknown` variable, but you cannot perform operations on it without performing dynamic type narrowing or validation checks first:

```typescript
let safeInput: unknown = "Dynamic data stream";

// Cannot use safely directly:
// let len = safeInput.length; // Error

if (typeof safeInput === "string") {
    let len = safeInput.length; // Allowed! Type narrowed safely to string
}
```

### c. Void & Never

`void`: Represents the total absence of a return value (commonly used for function outcomes).

`never`: Represents an unachievable application execution branch state (e.g., functions that throw errors indefinitely or process infinite loops).

```typescript
function throwFatalError(err: string): never {
    throw new Error(err);
}
```

## 4. Type Assertions (Casting)

When working with loose structural inputs, you can explicitly override type assumptions using type assertions:

```typescript
let standardData: unknown = "Strict processing contract";

// Angle-bracket syntax (Not usable in JSX files)
let sizeA: number = (<string>standardData).length;

// 'as' Keyword syntax (Recommended)
let sizeB: number = (standardData as string).length;
```
