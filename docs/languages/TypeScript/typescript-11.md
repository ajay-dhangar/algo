---
id: inheritance-and-modules
sidebar_position: 11
title: "Inheritance & Code Modules"
sidebar_label: "Inheritance & Modules"
---

Clean architecture relies on classes inheriting core functionality and organizing related components into distinct files using modular export paths.


## 1. Class Inheritance Mechanics

Classes reuse or override parent logic using the `extends` keyword. Subclasses must invoke the parent constructor using `super()` before accessing `this`

### Video Explanation

<LiteYouTubeEmbed
  id="Sn6K57YSuwU"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="TypeScript Basics 14 - Inheritance and Polymorphism In TypeScript"
  lazyLoad={true}
  webp
/>

```typescript
class BasicPeripheral {
    constructor(public connectionType: string) {}

    public powerOn(): void {
        console.log("Peripheral initializing power sequences.");
    }
}

class OpticalScanner extends BasicPeripheral {
    constructor(connectionType: string, public maxResolutionDPI: number) {
        super(connectionType); // Invokes the parent constructor layout
    }

    // Overriding parent method definitions
    public override powerOn(): void {
        super.powerOn(); // Optional: Triggers parent baseline operations
        console.log(`Calibrating optical array at ${this.maxResolutionDPI} DPI.`);
    }
}
```

## 2. Code Organization Modules (`export` & `import`)

TypeScript uses standard ES Module semantics to manage file boundaries and share code components between separate modules

### Video Explanation

<LiteYouTubeEmbed
  id="P5CJQTWBW8Q"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="TypeScript Hindi Tutorial #27 Modules"
  lazyLoad={true}
  webp
/>

```typescript
// Inside file path context: dataUtility.ts
export interface SecurePayload {
    hashAlgorithm: string;
    signatureBlock: string;
}

export function dispatchPayload(payload: SecurePayload): void {
    console.log("Transmitting secure validation payload structures.");
}
```

You can import these components into your main application file using relative path mappings:

```typescript
// Inside file path context: mainApp.ts
import { SecurePayload, dispatchPayload } from "./dataUtility";

const verificationTask: SecurePayload = {
    hashAlgorithm: "SHA-256",
    signatureBlock: "0x8F3C9E"
};

dispatchPayload(verificationTask);
```
