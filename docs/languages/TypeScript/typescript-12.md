---
id: polymorphism-and-abstracts
sidebar_position: 12
title: "Polymorphism & Abstract Class Contracts"
sidebar_label: "Polymorphism"
---

Polymorphism enables separate objects to expose uniform method signatures while executing unique runtime logic under the hood.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. Abstract Class Structural Blueprints

Abstract classes act as base validation blueprints. They cannot be instantiated directly and can declare abstract method stubs that subclasses must implement:

```typescript
abstract class AbstractDatabaseConnector {
    // Shared core feature method inheritance paths
    public verifyNetwork(): boolean {
        return true;
    }

    // Abstract methods to be implemented by child classes
    public abstract establishConnection(): void;
    public abstract terminateConnection(): void;
}
```

## 2. Implementing Polymorphic Database Drivers

```typescript
class PostgresDriver extends AbstractDatabaseConnector {
    public establishConnection(): void {
        console.log("Pooling state threads toward Postgres connection matrix.");
    }
    public terminateConnection(): void {
        console.log("Flushing relational buffer nodes cleanly.");
    }
}

class MongoDBDriver extends AbstractDatabaseConnector {
    public establishConnection(): void {
        console.log("Opening dynamic document connection pool handles.");
    }
    public terminateConnection(): void {
        console.log("Closing active network sockets.");
    }
}

// Polymorphic runtime orchestration mechanics
function runLifecycleDiagnostics(driver: AbstractDatabaseConnector): void {
    if (driver.verifyNetwork()) {
        driver.establishConnection(); // Executes completely unique logic depending on the active instance
        driver.terminateConnection();
    }
}

runLifecycleDiagnostics(new PostgresDriver());
runLifecycleDiagnostics(new MongoDBDriver());
```
