---
id: nodejs-cheatsheet
title: "Node.js Cheatsheet"
sidebar_label: Node.js Cheatsheet
sidebar_position: 2
description: Complete quick reference for Node.js - Core modules, npm, async patterns, and best practices.
tags: [nodejs, javascript, backend, cheatsheet]
---

Modern Node.js (v18+ to v26) – Updated 2026

## Video Explanation

<LiteYouTubeEmbed
  id="_SrCMbCsn2w"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Lec-58: Operator overloading in C++ Programming | C++ programming for beginners | C++ by Varun sir"
  lazyLoad={true}
  webp
/>

## 1. Basic Setup

```bash
# Initialize modern ESM project
npm init -y && npm pkg set type="module"

# Run a file with native hot-reloading (No nodemon needed in Node v18+)
node --watch index.js

# Execute a remote package without installing it
npx upload-cli
```

## 2. Core Modules (ESM Syntax)

```js
import fs from 'node:fs/promises';   // Modern promise-based File System
import path from 'node:path';       // Path utilities with URL compatibility
import http from 'node:http';       // Native HTTP server 
import crypto from 'node:crypto';   // Cryptography and Web Crypto API
import os from 'node:os';           // Operating System resources
```

## 3. File System (fs) - Async / Promise

```js
import fs from 'node:fs/promises';

// Recommended: Clean Async/Await
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Read error:', err.message);
  }
}

// Sync version (Use ONLY in initialization/CLI scripts, never in servers)
// import { readFileSync } from 'node:fs';
// const data = readFileSync('file.txt', 'utf8');
```

## 4. Native HTTP Server

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'success', message: 'Hello from Node.js!' }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## 5. Express.js Basics (v5+)

```js
import express from 'express';
const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// Centralized Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(3000, () => console.log('Express server running on port 3000'));
```

## 6. Modules (ESM vs CommonJS)

```js
// ESM (.js with "type": "module" or .mjs) - MODERN STANDARD
export const add = (a, b) => a + b;
import { add } from './math.js';

// CommonJS (.js or .cjs) - LEGACY
// module.exports = { add: (a, b) => a + b };
// const { add } = require('./math.js');
```

## 7. Async Patterns

```js
import EventEmitter from 'node:events';

// Native Global Fetch (No third-party packages required)
async function fetchData() {
  const res = await fetch('https://example.com');
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

// Event Emitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('statusChange', (data) => console.log('Status updated:', data));
myEmitter.emit('statusChange', { active: true });
```

## 8. Environment Variables

```js
// Run script with: node --env-file=.env index.js
// Native .env file support available since Node v20.6.0+ (No dotenv package needed)

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;

console.log(`Running in ${process.env.NODE_ENV || 'development'} mode.`);
```

## 9. npm Scripts & package.json

```json
{
  "name": "my-modern-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch --env-file=.env index.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

## 10. Streams & Pipelines

```js
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

async function compressFile() {
  // pipeline auto-manages errors and cleans up streams safely
  await pipeline(
    fs.createReadStream('input.txt'),
    createGzip(),
    fs.createWriteStream('input.txt.gz')
  );
  console.log('Compression complete');
}
```

## 11. Production Error Handling

```js
// Capture unexpected code breaks
process.on('uncaughtException', (err) => {
  console.error('CRITICAL: Uncaught Exception:', err.message, err.stack);
  // Gracefully close servers/DB connections here before exiting
  process.exit(1);
});

// Capture unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('WARNING: Unhandled Rejection at:', promise, 'reason:', reason);
});
```

## 12. Modern Utilities

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

// In ESM, __dirname and __filename do not exist. Use this instead:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname, 'files', 'data.txt');

// Modern secure random UUID generation
const id = crypto.randomUUID(); 

// Secure password hashing using modern web crypto algorithms
const hash = crypto.subtle.digest('SHA-256', new TextEncoder().encode('password'));
```

## 13. Best Practices

- Use the **node:** prefix when importing built-in modules.
- Use native **node --watch** instead of installing third-party file watchers.
- Load variables via native **node --env-file** arguments to avoid dependency bloat.
- Default to **ESM modules** (`"type": "module"`) for all new codebases.
- Avoid **sync methods** (`fs.readFileSync`) to prevent blocking the single thread.
- Use **stream pipelines** instead of `.pipe()` to prevent memory leaks during errors.
- Run tests using the native **node --test** runner runner framework.

---

**Last Updated:** June 2026  
For latest updates, check the [official Node.js documentation](https://nodejs.org/en/docs).
