\---

id: nodejs-cheatsheet

title: Node.js Cheatsheet

sidebar\_label: Node.js Cheatsheet

sidebar\_position: 2

description: Complete quick reference for Node.js - Core modules, npm, async patterns, and best practices.

tags: \[nodejs, javascript, backend, cheatsheet]

\---



\# Node.js Cheatsheet



Modern Node.js (v18+ / v20+) – Updated 2026



\## 1. Basic Setup



```bash

\# Initialize project

npm init -y



\# Run a file

node index.js



\# Use nodemon for development

npm install -g nodemon

nodemon index.js

```



\## 2. Core Modules



```js

const fs = require('fs');        // File System

const path = require('path');    // Path utilities

const http = require('http');    // HTTP server

const crypto = require('crypto'); // Cryptography

const os = require('os');        // Operating System

const util = require('util');    // Utilities

```



\## 3. File System (fs) - Async / Promise



```js

const fs = require('fs');
const fsPromises = require('fs/promises');

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Sync version (avoid in production)
const data = fs.readFileSync('file.txt', 'utf8');

```



\## 4. HTTP Server



```js

const http = require('http');



const server = http.createServer((req, res) => {

&#x20; res.writeHead(200, { 'Content-Type': 'text/plain' });

&#x20; res.end('Hello from Node.js!');

});



server.listen(3000, () => {

&#x20; console.log('Server running on http://localhost:3000');

});

```



\## 5. Express.js Basics



```js

const express = require('express');

const app = express();



app.use(express.json());



app.get('/', (req, res) => {

&#x20; res.send('Hello World!');

});



app.post('/api/users', (req, res) => {

&#x20; res.status(201).json({ message: 'User created' });

});



app.listen(3000, () => console.log('Server running'));

```



\## 6. Modules (CommonJS vs ESM)



```js

// CommonJS (default)

module.exports = { add: (a, b) => a + b };



// ESM (.mjs or "type": "module" in package.json)

export const add = (a, b) => a + b;

import { add } from './math.js';

```



\## 7. Async Patterns



```js

// Promises

async function fetchData() {

&#x20; const res = await fetch('https://api.example.com');

&#x20; return res.json();

}



// Async/Await with error handling

try {

&#x20; const data = await someAsyncFunc();

} catch (err) {

&#x20; console.error(err);

}



// Event Emitter

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();



myEmitter.on('event', () => console.log('Event fired'));

myEmitter.emit('event');

```



\## 8. Environment Variables



```js

// Using dotenv

require('dotenv').config();



const PORT = process.env.PORT || 3000;

const DB_URL = process.env.DATABASE_URL;



console.log(process.env.NODE\_ENV);

```



\## 9. npm Scripts \& package.json



```json

{

&#x20; "name": "my-app",

&#x20; "version": "1.0.0",

&#x20; "scripts": {

&#x20;   "start": "node index.js",

&#x20;   "dev": "nodemon index.js",

&#x20;   "test": "jest",

&#x20;   "build": "tsc"

&#x20; },

&#x20; "dependencies": {

&#x20;   "express": "^4.18.0"

&#x20; },

&#x20; "devDependencies": {

&#x20;   "nodemon": "^3.0.0"

&#x20; }

}

```



\## 10. Streams



```js

const fs = require('fs');



const readable = fs.createReadStream('input.txt');

const writable = fs.createWriteStream('output.txt');



readable.pipe(writable); // Efficient data transfer

```



\## 11. Error Handling



```js

process.on('uncaughtException', (err) => {

&#x20; console.error('Uncaught Exception:', err);

&#x20; process.exit(1);

});



process.on('unhandledRejection', (reason, promise) => {

&#x20; console.error('Unhandled Rejection:', reason);

});

```



\## 12. Common Utilities



```js

// Path

const fullPath = path.join(\_\_dirname, 'files', 'data.txt');



// Crypto (hashing)

const hash = crypto.createHash('sha256').update('password').digest('hex');



// Timers

setTimeout(() => {}, 1000);

setInterval(() => {}, 2000);

```



\## 13. Best Practices



\- Use \*\*async/await\*\* over callbacks

\- Always handle errors properly

\- Prefer \*\*ESM\*\* in new projects

\- Use environment variables for secrets

\- Enable \*\*strict mode\*\* (`"use strict";`)

\- Keep `package.json` clean

\- Use tools: ESLint, Prettier, Jest

\- Consider TypeScript for large apps



\---



\*\*Last Updated:\*\* June 2026  

For latest features, check the \[official Node.js documentation](https://nodejs.org/en/docs).



