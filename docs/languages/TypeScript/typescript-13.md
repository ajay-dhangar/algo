---
id: generics-in-typescript
sidebar_position: 13
title: Generics & Reusable Component Types
sidebar_label: Generics
description: >-
  Learn about Generics & Reusable Component Types in the TypeScript programming
  language with core concepts, syntax, code examples, and best practices.
tags:
  - programming
  - dsa
  - typescript
  - generics & reusable component types
---

Generics let you write flexible, reusable code components that work with a variety of data types while maintaining strict compile-time type safety.

## 1. The Core Purpose of Generics

Without generics, supporting multiple data types requires falling back to loose types like `any`, which breaks compiler verification layers. Generics use an explicit placeholder type token (commonly `<T>`) to preserve structural integrity across inputs and outputs:

```typescript
// Loose validation style (Avoid this):
function fetchLooseElement(items: any[]): any { return items[0]; }

// Robust, type-safe Generic style:
function fetchSecureElement<T>(items: T[]): T {
    return items[0];
}

const numbersArray = [10, 20, 30];
// Explicit compiler tracking infers numeric outcomes cleanly
const primaryNumber = fetchSecureElement(numbersArray);
```

## 2. Generic Interfaces & Classes

You can apply type parameters to entire classes or interfaces to handle structural operations dynamically:

```typescript
interface OperationalResponse<PayloadType> {
    statusCode: number;
    responsePayload: PayloadType;
}

class DataBox<ContentType> {
    private localizedContent!: ContentType;

    public storeContent(input: ContentType): void {
        this.localizedContent = input;
    }

    public extractContent(): ContentType {
        return this.localizedContent;
    }
}

const configurationVault = new DataBox<string>();
configurationVault.storeContent("Active API Profile Matrix");
```

## 3. Constraining Generic Parameters (`extends`)

You can use the `extends` keyword to restrict a generic placeholder to types that match specific structural boundaries or rules:

```typescript
interface MeasurableLength {
    length: number;
}

// Enforces that input parameters must expose a readable .length property
function captureDimensions<T extends MeasurableLength>(entity: T): number {
    return entity.length;
}

captureDimensions("String Input Block"); // Valid (Strings feature length properties natively)
captureDimensions([1, 2, 3, 4]);       // Valid (Arrays feature length properties natively)
// captureDimensions(450);              // Error: Argument of type 'number' does not match constraint profile
```
