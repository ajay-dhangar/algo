---
id: javascript-cheatsheet
title: "JavaScript Cheatsheet"
sidebar_label: "JavaScript Cheatsheet"
sidebar_position: 4
description: "A fast, practical JavaScript reference for DSA and competitive programming."
tags: [javascript, cheatsheet, dsa]
---

This page is a quick reference for modern JavaScript (ES6+) patterns that show up constantly in DSA and competitive programming. If you're just starting out, don't worry, every snippet here is explained line by line 😊


## Video Explanation

<LiteYouTubeEmbed
  id="PkZNo7MFNFg"
  params="autoplay=1&autohide=1&showinfo=0&rel=0"
  title="Learn JavaScript - Full Course for Beginners"
  lazyLoad={true}
  webp
/>

## Variable Declaration

### `const`, `let`, and `var`

```js title="Variable declaration in JavaScript"
const x = 5;           // Immutable binding, cannot reassign (use by default)
let y = 10;            // Mutable, block-scoped
var z = 15;            // Avoid — function-scoped, causes hoisting issues

// const doesn't make objects immutable, only the binding
const arr = [1, 2, 3];
arr.push(4);           // Valid — modifying array content
// arr = [5, 6];       // Error — cannot reassign
```

## Data Types

### Primitives vs References

```js title="Primitives and reference types"
// Primitives (copied by value)
let a = 5;
let b = a;             // b is a copy of a
b = 10;                // a is still 5

// Objects (copied by reference)
let obj1 = { x: 1 };
let obj2 = obj1;       // obj2 references same object as obj1
obj2.x = 2;            // obj1.x is now also 2

// Clone object to avoid reference issues
let obj3 = { ...obj1 }; // Shallow copy using spread operator
let obj4 = JSON.parse(JSON.stringify(obj1)); // Deep copy (works for simple objects)
```

### Type Checking

```js title="Type checking in JavaScript"
typeof 5;              // "number"
typeof "hello";        // "string"
typeof true;           // "boolean"
typeof undefined;      // "undefined"
typeof null;           // "object" (historical quirk)
typeof [1, 2];         // "object"
Array.isArray([1, 2]); // true — proper way to check arrays
```

## Arrays

### Creating and Accessing

```js title="Array basics in JavaScript"
const arr = [1, 2, 3, 4, 5];
const first = arr[0];           // first = 1
const last = arr[arr.length - 1]; // last = 5

// Create array of size n filled with 0
const zeros = new Array(n).fill(0);

// Create array with values 0 to n-1
const range = Array.from({ length: n }, (_, i) => i); // [0, 1, 2, ..., n-1]

// 2D array (grid)
const grid = Array.from({ length: r }, () => Array(c).fill(0)); // r rows, c columns
```

### Essential Array Methods

```js title="Core array methods"
const arr = [1, 2, 3, 4, 5];

arr.push(6);           // Adds to end, arr = [1, 2, 3, 4, 5, 6]
arr.pop();             // Removes from end, returns 6, arr = [1, 2, 3, 4, 5]
arr.unshift(0);        // Adds to start, arr = [0, 1, 2, 3, 4, 5]
arr.shift();           // Removes from start, returns 0, arr = [1, 2, 3, 4, 5]

arr.slice(1, 3);       // Returns [2, 3] — does not modify original
arr.splice(1, 2);      // Removes 2 elements starting at index 1, modifies original

arr.includes(3);       // true — checks if 3 exists
arr.indexOf(3);        // 2 — returns index of first occurrence, -1 if not found
```

### Functional Array Methods

```js title="map, filter, reduce in JavaScript"
const nums = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = nums.map(x => x * 2); // [2, 4, 6, 8, 10]

// filter — keep elements that pass condition
const evens = nums.filter(x => x % 2 === 0); // [2, 4]

// reduce — accumulate to single value
const sum = nums.reduce((acc, x) => acc + x, 0); // 15 (0 is initial value)

// find — returns first element that matches
const firstEven = nums.find(x => x % 2 === 0); // 2

// some — returns true if any element matches
const hasEven = nums.some(x => x % 2 === 0); // true

// every — returns true if all elements match
const allPositive = nums.every(x => x > 0); // true
```

### Sorting

```js title="Sorting arrays in JavaScript"
const nums = [3, 1, 4, 1, 5];

// Sort numbers ascending (default sort is lexicographic!)
nums.sort((a, b) => a - b); // [1, 1, 3, 4, 5]

// Sort descending
nums.sort((a, b) => b - a); // [5, 4, 3, 1, 1]

// Sort array of objects
const people = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }];
people.sort((a, b) => a.age - b.age); // Sort by age ascending

// Multi-level sort
const pairs = [[3, 1], [1, 2], [3, 0]];
pairs.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0]; // Sort by first element ascending
    return b[1] - a[1];                     // Then by second element descending
});
// Result: [[1, 2], [3, 1], [3, 0]]
```

## Strings

### String Methods

```js title="String operations in JavaScript"
const s = "hello world";

s.length;              // 11
s[0];                  // "h" — access character at index
s.charAt(0);           // "h" — same as above
s.toUpperCase();       // "HELLO WORLD"
s.toLowerCase();       // "hello world"

s.includes("world");   // true
s.startsWith("hello"); // true
s.endsWith("world");   // true

s.indexOf("o");        // 4 — first occurrence
s.lastIndexOf("o");    // 7 — last occurrence

s.slice(0, 5);         // "hello" — substring from index 0 to 5 (exclusive)
s.substring(0, 5);     // "hello" — similar to slice
s.split(" ");          // ["hello", "world"] — split by space

// Replace
s.replace("world", "JS"); // "hello JS" — replaces first occurrence
s.replaceAll("o", "0");   // "hell0 w0rld" — replaces all occurrences
```

### Template Literals

```js title="Template literals in JavaScript"
const name = "Alice";
const age = 25;

const msg = `${name} is ${age} years old`; // "Alice is 25 years old"

// Multi-line strings
const multiline = `
    Line 1
    Line 2
`;
```

## Objects

### Creating and Accessing

```js title="Object basics in JavaScript"
const obj = { x: 1, y: 2 };

obj.x;                 // 1 — dot notation
obj["y"];              // 2 — bracket notation (useful for dynamic keys)

obj.z = 3;             // Add new property
delete obj.z;          // Remove property

// Check if property exists
"x" in obj;            // true
obj.hasOwnProperty("x"); // true

// Get keys, values, entries
Object.keys(obj);      // ["x", "y"]
Object.values(obj);    // [1, 2]
Object.entries(obj);   // [["x", 1], ["y", 2]]
```

### Destructuring

```js title="Object destructuring"
const point = { x: 10, y: 20 };
const { x, y } = point; // x = 10, y = 20

// Rename variables
const { x: posX, y: posY } = point; // posX = 10, posY = 20

// Default values
const { z = 0 } = point; // z = 0 (since z doesn't exist in point)

// Array destructuring
const arr = [1, 2, 3];
const [first, second] = arr; // first = 1, second = 2
const [, , third] = arr;     // third = 3 (skip first two)
```

### Spread and Rest Operators

```js title="Spread and rest operators"
// Spread — expand array/object
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

const obj1 = { x: 1 };
const obj2 = { y: 2 };
const merged = { ...obj1, ...obj2 }; // { x: 1, y: 2 }

// Rest — collect remaining elements
const [first, ...rest] = [1, 2, 3, 4]; // first = 1, rest = [2, 3, 4]

function sum(...nums) {      // Collects all arguments into array
    return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10
```

## Map and Set

### Map (Key-Value Pairs)

```js title="Map operations in JavaScript"
const map = new Map();

map.set("key", 10);    // Add key-value pair
map.get("key");        // 10 — retrieve value
map.has("key");        // true — check if key exists
map.delete("key");     // Remove key
map.size;              // Number of entries

// Iterate
for (const [key, val] of map) {
    // key and val
}

// Map from array of pairs
const m = new Map([["a", 1], ["b", 2]]);
```

### Set (Unique Values)

```js title="Set operations in JavaScript"
const set = new Set();

set.add(5);            // Add value
set.add(5);            // Duplicate ignored
set.has(5);            // true
set.delete(5);         // Remove value
set.size;              // Number of elements

// Set from array (removes duplicates)
const s = new Set([1, 2, 2, 3]); // Set {1, 2, 3}

// Convert back to array
const arr = [...s];    // [1, 2, 3]
```

## Functions

### Arrow Functions

```js title="Arrow function syntax"
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b; // Implicit return for single expression

// Multiple statements require braces
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Single parameter doesn't need parentheses
const square = x => x * x;

// No parameters need empty parentheses
const getRandom = () => Math.random();
```

### Default Parameters

```js title="Default parameters in JavaScript"
function greet(name = "Guest") {
    return `Hello, ${name}`;
}

greet();           // "Hello, Guest"
greet("Alice");    // "Hello, Alice"
```

## Control Flow

### Ternary Operator

```js title="Ternary operator"
const max = a > b ? a : b; // Returns a if a > b, else b

// Nested ternary (use sparingly)
const sign = x > 0 ? "positive" : x < 0 ? "negative" : "zero";
```

### Nullish Coalescing

```js title="Nullish coalescing operator"
const value = null ?? "default";     // "default" — null/undefined use default
const value2 = 0 ?? "default";       // 0 — 0 is not null/undefined
const value3 = "" ?? "default";      // "" — empty string is not null/undefined

// Compare with OR operator
const value4 = 0 || "default";       // "default" — 0 is falsy
const value5 = "" || "default";      // "default" — "" is falsy
```

### Optional Chaining

```js title="Optional chaining operator"
const user = { name: "Alice", address: { city: "NYC" } };

user.address?.city;    // "NYC"
user.phone?.number;    // undefined — doesn't throw error if phone is undefined

// With arrays
const arr = [1, 2, 3];
arr?.[0];              // 1
arr?.[10];             // undefined
```

## Asynchronous Patterns

### Promises

```js title="Promise basics"
const promise = new Promise((resolve, reject) => {
    if (success) {
        resolve(value);  // Success
    } else {
        reject(error);   // Failure
    }
});

promise
    .then(result => {
        // Handle success
    })
    .catch(error => {
        // Handle error
    })
    .finally(() => {
        // Always runs
    });
```

### Async/Await

```js title="Async await syntax"
async function fetchData() {
    try {
        const response = await fetch(url); // Waits for promise to resolve
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Parallel execution
async function fetchMultiple() {
    const [data1, data2] = await Promise.all([
        fetch(url1).then(r => r.json()),
        fetch(url2).then(r => r.json())
    ]); // Waits for both to complete
}
```

## Common DSA Patterns

### Two Pointers

```js title="Two pointer technique"
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return [-1, -1];
}
```

### Sliding Window

```js title="Sliding window technique"
function maxSumSubarray(arr, k) {
    let maxSum = 0, windowSum = 0;
    
    // Initial window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k]; // Add new, remove old
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
```

### Frequency Counter

```js title="Frequency counter pattern"
function charFrequency(s) {
    const freq = {};
    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1; // Increment or initialize to 1
    }
    return freq;
}

// Using Map
function charFrequencyMap(s) {
    const freq = new Map();
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    return freq;
}
```

## Math and Number Operations

### Common Math Functions

```js title="Math operations in JavaScript"
Math.abs(-5);          // 5
Math.max(1, 2, 3);     // 3
Math.min(1, 2, 3);     // 1
Math.floor(3.7);       // 3 — rounds down
Math.ceil(3.2);        // 4 — rounds up
Math.round(3.5);       // 4 — rounds to nearest
Math.trunc(3.7);       // 3 — removes decimal part
Math.pow(2, 3);        // 8 — 2^3
Math.sqrt(16);         // 4
Math.random();         // Random number between 0 and 1

// Random integer between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```

### Number Methods

```js title="Number methods"
parseInt("42");        // 42
parseFloat("3.14");    // 3.14
Number("42");          // 42
Number.isInteger(5);   // true
Number.isNaN(NaN);     // true

const num = 3.14159;
num.toFixed(2);        // "3.14" — string with 2 decimal places
num.toPrecision(3);    // "3.14" — string with 3 significant digits
```

## Iteration Patterns

### For Loops

```js title="Loop variations in JavaScript"
const arr = [1, 2, 3, 4, 5];

// Traditional for loop
for (let i = 0; i < arr.length; i++) {
    // arr[i]
}

// For...of (iterate values)
for (const val of arr) {
    // val
}

// For...in (iterate indices/keys — avoid for arrays)
for (const key in obj) {
    // key
}

// forEach (cannot break or return early)
arr.forEach((val, idx) => {
    // val, idx
});
```

## References

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
