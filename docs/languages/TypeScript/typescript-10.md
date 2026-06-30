---
id: advanced-types-and-interfaces
sidebar_position: 10
title: "Interfaces & Advanced Types"
sidebar_label: "Interfaces & Type Aliases"
---

Interfaces and Type Aliases define structured contracts for complex data structures and objects.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. Interfaces vs Type Aliases

- **Interfaces**: Primarily designed to shape object declarations; support structural merging (extending properties with duplicate names).
- **Type Aliases**: Can map primitive combinations, structural properties, unions, and tuples. Cannot be open-merged.

```typescript
// Object modeling via Interface contracts
interface OperatingSystem {
    kernelArchitecture: string;
    distributionVersion: number;
}

// Structural mapping using Type Aliases
type ScalarMetric = number | string;
```

## 2. Structural Extension and Merging

```typescript
interface ClientProfile {
    accountEmail: string;
}

// Extending structural definitions via inheritance contracts
interface CorporateClient extends ClientProfile {
    taxRegistrationId: string;
}
```

## 3. Union and Intersection Types

`Union (|)`: Restricts a variable to holding any one of several specified type definitions.

`Intersection (&)`: Combines multiple structural types into a single target type contract.

```typescript
// Union implementation limits options explicitly
let statusIndicator: "Initializing" | "Online" | "Faulted";
statusIndicator = "Online"; // Valid

// Intersection structure joining traits
interface AuditLog { timestamp: Date }
interface SystemEvent { eventId: string }

type FullEventReport = AuditLog & SystemEvent; // Must contain timestamp and eventId fields
```
