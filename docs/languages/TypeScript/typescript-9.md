---
id: typescript-classes-and-objects
sidebar_position: 9
title: Classes & Objects
sidebar_label: Classes & Objects
description: >-
  Learn about Classes & Objects in the TypeScript programming language with core
  concepts, syntax, code examples, and best practices.
tags:
  - programming
  - dsa
  - typescript
  - classes & objects
---

TypeScript features comprehensive Object-Oriented structures, adding strict encapsulation modifiers and type properties over traditional JavaScript classes.

## 1. Class Structure and Properties

```typescript
class NetworkDevice {
    // Explicit field type definitions
    public deviceId: number;
    public deviceModel: string;

    // Execution constructor method configuration
    constructor(id: number, model: string) {
        this.deviceId = id;
        this.deviceModel = model;
    }

    public syncTelemetry(): void {
        console.log(`Syncing tracking nodes for device ${this.deviceId}.`);
    }
}

// Instantiating concrete object allocations
const gatewayRouter = new NetworkDevice(881, "Cisco ISR");
gatewayRouter.syncTelemetry();
```

## 2. Property Encapsulation Access Modifiers

TypeScript provides three explicit visibility modifiers to protect class properties from unintended external modifications:

- `public`: (Default) Properties can be accessed from any file or outer runtime context.
- `private`: Access is strictly confined to the defining class boundary itself.
- `protected`: Access is shared with subclasses inheriting from this parent class.

```typescript
class BankVault {
    public vaultLabel: string;
    private combinationSequence: number[];
    protected emergencyOverrideToken: string;

    constructor(label: string, combination: number[], token: string) {
        this.vaultLabel = label;
        this.combinationSequence = combination;
        this.emergencyOverrideToken = token;
    }
}
```

## 3. Parameter Properties (Shorthand Syntax)

You can compress constructor logic by declaring visibility access modifiers directly inside the arguments signature list. This tells the compiler to automatically declare and assign those fields for you:

```typescript
class CompressedUser {
    // Declares, initializes, and maps fields completely in one line
    constructor(public username: string, private accessLevel: number) {}
}
```
