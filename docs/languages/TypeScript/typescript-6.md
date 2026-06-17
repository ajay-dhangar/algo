---
id: functions-in-typescript
sidebar_position: 6
title: "Functions"
sidebar_label: "Functions"
---

Functions are the core building blocks of program architecture. TypeScript enhances standard functions with strict parameter and return type validation rules.

## 1. Explicit Type Annotations

Functions require explicit annotations for parameters and final return profiles to ensure total type safety:

```typescript
function calculateRatio(numerator: number, denominator: number): number {
    return numerator / denominator;
}
```

## 2. Optional & Default Parameter Behaviors

Optional parameters are marked with a trailing question mark (`?`) and must follow mandatory arguments.

Default parameters fall back to preset values if arguments are omitted or passed as `undefined`.

```typescript
function catalogItem(id: number, taxonomy?: string, label: string = "Generic"): void {
    console.log(`ID: ${id}, Class: ${taxonomy ?? "Unclassified"}, Item Label: ${label}`);
}

catalogItem(101); // Valid
catalogItem(102, "Hardware", "Smart Sensor"); // Valid
```

## 3. Rest Parameter Collections

To accept an indefinite count of runtime arguments, wrap parameters with spread array notation structures:

```typescript
function sumAllMeasurements(...measurements: number[]): number {
    return measurements.reduce((accumulator, current) => accumulator + current, 0);
}
```

## 4. Overloading Function Signatures

TypeScript allows you to specify multiple function type configurations (overload signatures) before writing a single unified, type-safe implementation block:

```typescript
// Overload signatures mapping structural interfaces
function formatInput(data: string): string;
function formatInput(data: number): string;

// Single unified implementation block mapping underlying variants
function formatInput(data: any): string {
    if (typeof data === "string") {
        return data.trim().toUpperCase();
    }
    return data.toFixed(2);
}
```
