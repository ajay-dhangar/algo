---
id: typescript-cheatsheet
title: "TypeScript Cheatsheet"
sidebar_label: "TypeScript Cheatsheet"
sidebar_position: 5
description: "A fast, practical TypeScript reference for DSA and competitive programming."
tags: [typescript, cheatsheet, dsa]
---

This page is a quick reference for TypeScript patterns that show up constantly in DSA and competitive programming. TypeScript adds static typing to JavaScript, catching errors at compile time. If you're just starting out, don't worry, every snippet here is explained line by line 😊

## Type Annotations

### Basic Types

```ts title="Basic type annotations in TypeScript"
let num: number = 42;           // Number type
let str: string = "hello";      // String type
let bool: boolean = true;       // Boolean type
let nothing: null = null;       // Null type
let undef: undefined = undefined; // Undefined type

// Type inference (TypeScript infers type automatically)
let x = 5;                      // x is inferred as number
let y = "text";                 // y is inferred as string
```

### Arrays and Tuples

```ts title="Array and tuple types"
let nums: number[] = [1, 2, 3];         // Array of numbers
let strs: Array<string> = ["a", "b"];   // Alternative syntax

// Tuple — fixed-length array with specific types
let pair: [number, string] = [1, "one"];
let triple: [number, number, number] = [1, 2, 3];

// Array of tuples
let pairs: [number, string][] = [[1, "one"], [2, "two"]];
```

### Objects

```ts title="Object type annotations"
// Inline object type
let point: { x: number; y: number } = { x: 10, y: 20 };

// Optional properties
let user: { name: string; age?: number } = { name: "Alice" }; // age is optional

// Readonly properties
let config: { readonly apiKey: string } = { apiKey: "secret" };
// config.apiKey = "new"; // Error — cannot modify readonly property
```

## Interfaces and Type Aliases

### Interfaces

```ts title="Interface definitions"
interface Point {
    x: number;
    y: number;
}

const p: Point = { x: 5, y: 10 };

// Optional properties
interface User {
    name: string;
    age?: number;        // Optional
    readonly id: number; // Readonly
}

// Extending interfaces
interface Shape {
    area(): number;
}

interface Circle extends Shape {
    radius: number;
}

const circle: Circle = {
    radius: 5,
    area() {
        return Math.PI * this.radius ** 2;
    }
};
```

### Type Aliases

```ts title="Type alias definitions"
type ID = number | string;      // Union type
type Point = { x: number; y: number };

let userId: ID = 123;           // Can be number
userId = "abc";                 // Or string

// Function type
type BinaryOp = (a: number, b: number) => number;

const add: BinaryOp = (a, b) => a + b;
const multiply: BinaryOp = (a, b) => a * b;
```

### Interface vs Type Alias

```ts title="When to use interface vs type"
// Use interface for object shapes (can be extended)
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Use type for unions, intersections, primitives
type Status = "pending" | "success" | "error"; // Union
type Coordinate = [number, number];            // Tuple
type Nullable<T> = T | null;                   // Generic
```

## Union and Intersection Types

### Union Types

```ts title="Union type examples"
// Variable can be one of multiple types
let value: number | string;
value = 42;        // Valid
value = "hello";   // Valid
// value = true;   // Error

// Array of mixed types
let mixed: (number | string)[] = [1, "two", 3, "four"];

// Function with union parameter
function print(val: number | string): void {
    console.log(val);
}
```

### Intersection Types

```ts title="Intersection type examples"
// Combines multiple types
type Person = { name: string };
type Employee = { id: number };

type Worker = Person & Employee; // Must have both name and id

const worker: Worker = {
    name: "Alice",
    id: 123
};
```

## Type Guards

### Narrowing Types

```ts title="Type guard patterns"
function process(val: number | string) {
    if (typeof val === "string") {
        // TypeScript knows val is string here
        console.log(val.toUpperCase());
    } else {
        // TypeScript knows val is number here
        console.log(val.toFixed(2));
    }
}

// Array type guard
function sum(arr: number[] | string) {
    if (Array.isArray(arr)) {
        return arr.reduce((a, b) => a + b, 0);
    }
    return parseInt(arr);
}

// Null/undefined check
function getLength(s: string | null): number {
    if (s === null) return 0;
    return s.length; // TypeScript knows s is string here
}
```

### Custom Type Guards

```ts title="Custom type guard functions"
interface Cat {
    meow(): void;
}

interface Dog {
    bark(): void;
}

// Type predicate
function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
    if (isCat(animal)) {
        animal.meow(); // TypeScript knows it's Cat
    } else {
        animal.bark(); // TypeScript knows it's Dog
    }
}
```

## Generics

### Generic Functions

```ts title="Generic function examples"
// Generic identity function
function identity<T>(arg: T): T {
    return arg;
}

let num = identity<number>(42);     // Explicit type
let str = identity("hello");        // Type inferred

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // Type is string
const age = getProperty(person, "age");   // Type is number
```

### Generic Interfaces and Classes

```ts title="Generic interfaces and classes"
// Generic interface
interface Box<T> {
    value: T;
}

const numBox: Box<number> = { value: 42 };
const strBox: Box<string> = { value: "hello" };

// Generic class
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
```

### Generic Constraints

```ts title="Generic constraints"
// Constraint: T must have length property
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(arg: T): void {
    console.log(arg.length);
}

logLength("hello");      // Valid — string has length
logLength([1, 2, 3]);    // Valid — array has length
// logLength(42);        // Error — number doesn't have length
```

## Utility Types

### Common Built-in Utility Types

```ts title="TypeScript utility types"
interface User {
    id: number;
    name: string;
    email: string;
}

// Partial — makes all properties optional
type PartialUser = Partial<User>;
const user1: PartialUser = { name: "Alice" }; // Valid

// Required — makes all properties required
type RequiredUser = Required<PartialUser>;

// Readonly — makes all properties readonly
type ReadonlyUser = Readonly<User>;
const user2: ReadonlyUser = { id: 1, name: "Bob", email: "bob@example.com" };
// user2.name = "Alice"; // Error — readonly

// Pick — select specific properties
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "Alice" };

// Omit — exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
const user3: UserWithoutEmail = { id: 1, name: "Alice" };

// Record — create object type with specific keys and value type
type Scores = Record<string, number>;
const scores: Scores = { math: 90, english: 85 };
```

## Function Types

### Function Signatures

```ts title="Function type annotations"
// Function declaration
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}`;
}

// Default parameters
function power(base: number, exponent: number = 2): number {
    return base ** exponent;
}

// Rest parameters
function sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0);
}
```

### Function Overloads

```ts title="Function overloading"
// Overload signatures
function process(x: number): number;
function process(x: string): string;
function process(x: number[]): number;

// Implementation signature
function process(x: number | string | number[]): number | string {
    if (typeof x === "number") {
        return x * 2;
    } else if (typeof x === "string") {
        return x.toUpperCase();
    } else {
        return x.reduce((a, b) => a + b, 0);
    }
}

process(5);           // Returns number
process("hello");     // Returns string
process([1, 2, 3]);   // Returns number
```

## Classes

### Class Syntax

```ts title="Class definitions in TypeScript"
class Point {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    distance(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

const p = new Point(3, 4);
console.log(p.distance()); // 5
```

### Access Modifiers

```ts title="Access modifiers in classes"
class BankAccount {
    public owner: string;           // Accessible everywhere (default)
    private balance: number;        // Only accessible within class
    protected accountNumber: string; // Accessible in class and subclasses
    
    constructor(owner: string, balance: number, accountNumber: string) {
        this.owner = owner;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
    
    deposit(amount: number): void {
        this.balance += amount;
    }
    
    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount("Alice", 1000, "123");
console.log(account.owner);        // Valid
// console.log(account.balance);   // Error — private
console.log(account.getBalance()); // Valid — public method
```

### Shorthand Constructor

```ts title="Constructor parameter properties"
class Point {
    // Shorthand — declares and initializes properties
    constructor(public x: number, public y: number) {}
    
    distance(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

const p = new Point(3, 4); // x and y are automatically assigned
```

### Abstract Classes

```ts title="Abstract classes in TypeScript"
abstract class Shape {
    abstract area(): number;        // Must be implemented by subclasses
    
    describe(): string {            // Concrete method
        return `Area: ${this.area()}`;
    }
}

class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }
    
    area(): number {
        return Math.PI * this.radius ** 2;
    }
}

const circle = new Circle(5);
console.log(circle.describe()); // "Area: 78.54..."
```

## Enums

### Numeric Enums

```ts title="Numeric enum examples"
enum Direction {
    Up,      // 0
    Down,    // 1
    Left,    // 2
    Right    // 3
}

let dir: Direction = Direction.Up;

// Custom starting value
enum Status {
    Pending = 1,
    Success = 2,
    Error = 3
}
```

### String Enums

```ts title="String enum examples"
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let color: Color = Color.Red;
console.log(color); // "RED"
```

### Const Enums

```ts title="Const enums for performance"
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

let dir = Direction.Up; // Inlined at compile time, no runtime object
```

## Type Assertions

### As Syntax

```ts title="Type assertions in TypeScript"
// Tell TypeScript to treat value as specific type
let value: unknown = "hello";
let length: number = (value as string).length;

// Alternative syntax (not recommended in JSX)
let length2: number = (<string>value).length;

// Non-null assertion
function getElement(id: string): HTMLElement | null {
    return document.getElementById(id);
}

const elem = getElement("myId")!; // Assert it's not null
elem.innerHTML = "Hello";
```

## Async/Await with Types

### Promise Types

```ts title="Typed promises"
// Function returning Promise
async function fetchData(): Promise<string> {
    const response = await fetch("https://api.example.com/data");
    const data = await response.text();
    return data;
}

// Generic Promise
async function fetchJSON<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
}

interface User {
    id: number;
    name: string;
}

const user = await fetchJSON<User>("https://api.example.com/user");
console.log(user.name); // TypeScript knows user has name property
```

## Common DSA Patterns with Types

### Typed Data Structures

```ts title="Type-safe data structures"
// Stack
class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Queue
class Queue<T> {
    private items: T[] = [];
    
    enqueue(item: T): void {
        this.items.push(item);
    }
    
    dequeue(): T | undefined {
        return this.items.shift();
    }
}

// Binary Tree Node
class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}
```

### Graph Representation

```ts title="Typed graph structures"
// Adjacency list with Map
type Graph<T> = Map<T, T[]>;

function createGraph<T>(): Graph<T> {
    return new Map();
}

function addEdge<T>(graph: Graph<T>, from: T, to: T): void {
    if (!graph.has(from)) {
        graph.set(from, []);
    }
    graph.get(from)!.push(to);
}

// Weighted graph
interface Edge<T> {
    to: T;
    weight: number;
}

type WeightedGraph<T> = Map<T, Edge<T>[]>;
```

### Algorithm Return Types

```ts title="Typed algorithm functions"
// Binary search
function binarySearch(arr: number[], target: number): number {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Two sum with tuple return
function twoSum(nums: number[], target: number): [number, number] | null {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return null;
}
```

## Type Narrowing Patterns

### Discriminated Unions

```ts title="Discriminated union pattern"
interface Success {
    type: "success";
    data: string;
}

interface Error {
    type: "error";
    message: string;
}

type Result = Success | Error;

function handleResult(result: Result): void {
    if (result.type === "success") {
        console.log(result.data);    // TypeScript knows it's Success
    } else {
        console.log(result.message); // TypeScript knows it's Error
    }
}
```

## Configuration

### tsconfig.json Essentials

```json title="Recommended tsconfig.json for DSA"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## References

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
