---
id: decorators-and-metadata
sidebar_position: 14
title: "Decorators & Metadata Annotations"
sidebar_label: "Decorators"
---

Decorators add metadata annotations and custom behaviors to classes, methods, or property definitions at runtime.

:::warning Compilation Flag Configuration Required
To compile decorators safely, ensure the `experimentalDecorators` flag is enabled inside your `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
:::

## 1. Class Decorator Implementations

A class decorator runs when the class is declared, giving you direct access to modify or extend its constructor blueprint:

```typescript
function SealComponent(constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
    console.log(`Class structural validation locked for: ${constructor.name}`);
}

@SealComponent
class ProductionModule {
    constructor(public securityToken: string) {}
}
```

## 2. Method Decorator Processing Mechanics

Method decorators intercept method calls, allowing you to log actions, run authorization checks, or profile execution times:

```typescript
function LogExecutionTrace(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const baselineMethod = descriptor.value;

    descriptor.value = function (...argumentsList: any[]) {
        console.log(`[Trace Log] Executing method execution call target: ${propertyKey}`);
        return baselineMethod.apply(this, argumentsList);
    };
}

class AnalyticsPipeline {
    @LogExecutionTrace
    public processMetricsBucket(bucketId: number): void {
        console.log(`Compiling metric records for database bucket ${bucketId}.`);
    }
}

const applicationLogPipeline = new AnalyticsPipeline();
applicationLogPipeline.processMetricsBucket(9402);
```
