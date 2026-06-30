---
id: typescript-control-statements
sidebar_position: 4
title: "Control Statements"
sidebar_label: "Control Statements"
description: "Learn about control flow statements in TypeScript, including conditional logic, switches, and loops with type validation."
tags: [typescript, control-flow, conditional, loops, programming]
---

Control structures route program execution dynamically based on real-time runtime conditions.

## Video Explanation

<LiteYouTubeEmbed
  id="RRVYpIET_RU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Complete C++ STL in 1 Video | Time Complexity and Notes"
  lazyLoad={true}
  webp
/>

## 1. The `if...else if...else` Statement Pattern

```typescript
let engineSpeed: number = 75;

if (engineSpeed > 90) {
    console.log("Critical velocity threshold reached!");
} else if (engineSpeed >= 50) {
    console.log("Optimal operating efficiency.");
} else {
    console.log("Sub-optimal velocity profile.");
}
```

## 2. The `switch-case` Construct

The `switch` block evaluates a single input statement expression against multiple strictly mapped case values:

```typescript
enum StatusGate {
    Pending,
    Active,
    Terminated
}

let pipelineStatus: StatusGate = StatusGate.Active;

switch (pipelineStatus) {
    case StatusGate.Pending:
        console.log("Queue buffering initialized.");
        break;
    case StatusGate.Active:
        console.log("Pipeline clearing jobs.");
        break;
    case StatusGate.Terminated:
        console.log("Flushing active memory traces.");
        break;
    default:
        console.log("Unknown pipeline execution state.");
}
```

## 3. Inline Ternary Conditional Operations

For compact assignment mechanics, use the conditional ternary syntax:

```typescript
let ageLimit: number = 21;
let registrationState: string = (ageLimit >= 18) ? "Authorized" : "Denied";
```
