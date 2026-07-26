---
id: exception-handling
sidebar_position: 15
title: "Exception Handling"
sidebar_label: "Exception Handling"
---

Runtime errors can crash applications if they aren't caught. TypeScript uses modern `try...catch...finally` blocks to handle runtime errors gracefully.

## Video Explanation

<LiteYouTubeEmbed
  id="Q1euMQFI35I"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Try Catch Error Handling With TypeScript"
  lazyLoad={true}
  webp
/>

## 1. Standard Error Handling Blocks

```typescript
try {
    let numericalInput = 0;
    if (numericalInput === 0) {
        throw new Error("Cannot complete operations using zero boundaries.");
    }
} catch (runtimeException: unknown) {
    // Intercepts structural errors safely
    if (runtimeException instanceof Error) {
        console.error("Exception handled successfully: " + runtimeException.message);
    }

} finally {
    // Always executes, regardless of whether an error occurred
    console.log("Cleaning up active system connections.");
}
```

## 2. Safe Catch Block Type Guarding

In modern TypeScript configurations, caught errors are typed as `unknown` because JavaScript allows programs to throw any data type at runtime. You should always use instance validation guards before processing details:

```typescript
try {
    // Perform complex operations...
} catch (unverifiedError: unknown) {
    if (unverifiedError instanceof Error) {
        console.log(`Standard system exception detected: ${unverifiedError.message}`);
    } else {
        console.log("An anomalous, non-standard exception type was thrown.");
    }
}
```

## 3. Developing Custom Domain Exceptions

For granular error tracing, extend the base `Error` class to create custom exception types:

```typescript
class DatabaseTimeoutException extends Error {
    public timestampRecord: Date;

    constructor(message: string) {
        super(message);
        this.name = "DatabaseTimeoutException";
        this.timestampRecord = new Date();

        // Corrects structural prototype alignment checks for custom classes
        Object.setPrototypeOf(this, DatabaseTimeoutException.prototype);
    }
}
```
