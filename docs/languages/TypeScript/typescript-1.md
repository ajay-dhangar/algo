---
id: introduction-to-typescript
sidebar_position: 1
title: "Introduction to TypeScript"
sidebar_label: "Introduction to TypeScript"
---

Welcome to TypeScript! This guide covers the absolute fundamentals of TypeScript, its architectural purpose, and how to configure your system for development.

## 1. What is TypeScript?

TypeScript is a strongly typed, open-source programming language developed by Microsoft. It acts as a **strict syntactical superset of JavaScript**, meaning that any valid JavaScript program is also a valid TypeScript program.

TypeScript does not run directly in browsers; instead, the TypeScript compiler (`tsc`) transpiles your type-checked code into clean, standard JavaScript.

## 2. Key Architectural Features

- **Static Type Checking:** Errors are caught at compile-time inside your IDE before the code ever reaches production.
- **Type Inference:** The compiler automatically detects data types when explicit definitions are omitted.
- **Advanced OOP Support:** Complete support for interfaces, access modifiers, abstract classes, and generics.
- **Modern ECMAScript Alignment:** Access downstream JavaScript features safely; the compiler handles down-emitting to older ES versions seamlessly.

## 3. Local Environment Setup

To compile and run TypeScript locally, install the global compiler toolkit via Node Package Manager (npm):

```bash
# Install the TypeScript compiler globally
npm install -g typescript

# Verify installation success
tsc --version
```

Every professional TypeScript project requires a configurations file named `tsconfig.json` initialized at the workspace root directory:

```bash
# Generate a standard template tsconfig.json file
tsc --init
```

## 4. Writing Your First TypeScript Program

Create a file named `index.ts`:

```typescript
const message: string = "Hello from TypeScript!";

function displayMessage(text: string): void {
    console.log(text);
}

displayMessage(message);
```

To execute this program, compile it down to JavaScript and run it with Node.js:

```bash
# Transpiles index.ts -> index.js
tsc index.ts

# Run the generated output file
node index.js
```
