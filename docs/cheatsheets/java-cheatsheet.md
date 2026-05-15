---
id: java-cheatsheet
title: Java Cheatsheet
sidebar_label: Java Cheatsheet
sidebar_position: 2
description: "A fast, practical Java reference for DSA and competitive programming."
tags: [java, cheatsheet, dsa]
---

This page is a quick reference for Java patterns that show up constantly in DSA and competitive programming. If you're just starting out, don't worry, every snippet here is explained line by line 😊

## Basic Syntax

### Data Types

```java title="Basic data type syntax in Java"
int a = 1;               // 32-bit integer
long b = 1_000_000_000L; // 64-bit integer
double d = 3.14;         // 64-bit decimal
boolean ok = true;       // true or false only
char c = 'A';            // 16-bit Unicode character
String s = "hello";      // Sequence of characters
```

### Operators and Control Flow

```java title="Control flow syntax in Java"
// if,else if and else 
if (a > 0) {
  // ...
} else if (a == 0) {
  // ...
} else {
  // ...
}

for (int i = 0; i < n; i++) {} // Value of i -> 0,1,2...n-1
while (n-- > 0) {} // Value of n -> n,n-1,n-2,...1
```

### Arrays

```java title="Array syntax in Java"
int[] arr = new int[n]; // 1D Primitive Integer Array of size n
int[][] grid = new int[r][c]; // 2D Primitive Integer Array/Grid of r - rows, c - columns
Arrays.fill(arr, -1); // Fills the entire array with -1 instead of 0
```

## Strings and `StringBuilder`

```java title="String and StringBuilder syntax in Java"
String s = "abc";
char ch = s.charAt(1); //Returns character at index 1, i.e ch = 'b'
int len = s.length(); //Returns Length of the string s, i.e len = 3
boolean has = s.contains("b"); // Returns true iff "b" exists in s, else returns false, i.e has = true
String t = s.substring(0, 2);  // s.substring(start index, end index),i.e t = "ab"

StringBuilder sb = new StringBuilder(s); // Special Class used for String Manipulation, s is the original string
sb.append("a").append(123); // abca123
String out = sb.toString(); // out = "abca123"
```

## Collections 

```java title="Java collections import"
import java.util.*; // Considered the protaganist of beginner Java code, has most data structures.
```

### List

```java title="List syntax in Java"
List<Integer> a = new ArrayList<>(); // Dynamic array, O(1) random access, best for most use cases
List<Integer> b = new LinkedList<>(); // Doubly linked list, O(1) insert/delete at ends, O(n) random access
a.add(10); // Appends 10 to the end of the list
int x = a.get(0); // Returns element at index 0, i.e x = 10
```

### Map / Set

```java title="Map and Set syntax in Java"
Map<String, Integer> hm = new HashMap<>(); // Key-Value pairs, O(1) average get/put, unordered
Set<Integer> hs = new HashSet<>(); // Unique elements only, O(1) average add/contains, unordered

hm.put("k", 1); // Maps "k" -> 1
hm.putIfAbsent("k", 2); // "k" already exists, so map remains "k" -> 1
int v = hm.getOrDefault("missing", 0); // "missing" key doesn't exist, so v = 0

hs.add(5); // Adds 5 to the set
boolean exists = hs.contains(5); // exists = true
```

### Ordered (TreeMap / TreeSet)

```java title="TreeMap and TreeSet syntax in Java"
TreeMap<Integer, String> tm = new TreeMap<>(); // Key-Value pairs, sorted by key in ascending order, O(log n) get/put
TreeSet<Integer> ts = new TreeSet<>(); // Unique elements, sorted in ascending order, O(log n) add/contains
tm.put(2, "b"); // tm = {2 -> "b"}
tm.put(1, "a"); // tm = {1 -> "a", 2 -> "b"} — automatically sorted by key
int firstKey = tm.firstKey(); // Returns the smallest key, i.e firstKey = 1
```

### Stack / Queue / Deque

```java title="Stack Queue and Deque syntax in Java"
Stack<Integer> stack = new Stack<>(); // LIFO — Last In First Out
stack.push(1); // stack = [1]
int top = stack.peek(); // Returns top without removing, i.e top = 1
stack.pop(); // Removes top, stack = []

Queue<Integer> q = new LinkedList<>(); // FIFO — First In First Out
q.add(1); // q = [1]
q.poll(); // Removes and returns front element, q = []

Deque<Integer> dq = new ArrayDeque<>(); // Double-ended queue, O(1) insert/remove at both ends
dq.addFirst(1); // dq = [1]
dq.addLast(2);  // dq = [1, 2]
dq.addFirst(0); // dq = [0, 1, 2]
int front = dq.peekFirst(); // Returns front without removing, i.e front = 0
int back = dq.peekLast();   // Returns back without removing, i.e back = 2
dq.pollFirst(); // Removes front, dq = [1, 2]
dq.pollLast();  // Removes back, dq = [1]
```

### PriorityQueue/Heap
#### Default -> Min-Heap
```java title="PriorityQueue or Heap syntax in Java"
PriorityQueue<Integer> pq = new PriorityQueue<>(); // Min-heap: smallest element always at front
pq.add(5); // pq = [5]
pq.add(1); // pq = [1, 5] — heap reorders internally
int min = pq.poll(); // Removes and returns smallest, i.e min = 1

// Max-heap:
PriorityQueue<Integer> maxpq = new PriorityQueue<>(Collections.reverseOrder()); // Largest element at front
```

## Common Operations

### Sorting

```java title="Sorting syntax in Java"
int[] arr = {3, 1, 2};
Arrays.sort(arr); // arr = [1, 2, 3], in-place ascending sort

List<int[]> pairs = new ArrayList<>();
pairs.sort(Comparator.comparingInt(p -> p[0])); // Sort pairs by first element ascending

// Sort by second element desc, then first element asc
pairs.sort((p1, p2) -> {
  if (p1[1] != p2[1]) return Integer.compare(p2[1], p1[1]); // descending by second
  return Integer.compare(p1[0], p2[0]); // ascending by first if second is equal
});
```

### Searching

```java title="Binary search syntax in Java"
int idx = Arrays.binarySearch(arr, target); // Returns index of target in sorted array, negative if not found
```

### Iterating

```java title="Iteration syntax in Java"
for (int x : arr) {} // Enhanced for-loop over array elements

// Method 1: Iterate over key-value pairs
for (Map.Entry<String, Integer> e : hm.entrySet()) {
  String k = e.getKey();   // Retrieves the key
  int v = e.getValue();    // Retrieves the value
}

// Method 2: Iterate over keys only
for (String k : hm.keySet()) {
  // use k
}

// Method 3: Iterate over values only
for (int v : hm.values()) {
  // use v
}
```

### Streams (Quick Patterns)

```java title="Stream syntax in Java"
int sum = Arrays.stream(arr).sum(); // Returns sum of all elements in arr
int[] sorted = Arrays.stream(arr).sorted().toArray(); // Returns a new sorted array, original unchanged
```

## OOP (Object Oriented Programming)

### Classes and Interfaces

```java title="Class and interface syntax in Java"
class Point {
  int x, y;
  Point(int x, int y) { this.x = x; this.y = y; } // Constructor — initializes x and y
}

Point p = new Point(3, 4); // Create a Point object
int px = p.x; // Access field directly, i.e px = 3

interface Solver {
  int solve(); // Any class implementing Solver must define solve()
}
```

### Inheritance and Abstract Classes

```java title="Inheritance and abstract class syntax in Java"
abstract class Shape {
  abstract double area(); // Subclasses must implement area()
}

class Circle extends Shape {
  double r;
  Circle(double r) { this.r = r; } // Constructor
  @Override double area() { return Math.PI * r * r; } // Concrete implementation of area()
}

Circle c = new Circle(5.0); // Create a Circle object
double a = c.area(); // Calls the overridden area(), i.e a = 78.53...
```

### Enums

```java title="Enum syntax in Java"
enum Dir { UP, DOWN, LEFT, RIGHT } // Fixed set of named constants

Dir d = Dir.UP; // Access enum constant
```

## Exception Handling

```java title="Exception handling syntax in Java"
try {
  int x = Integer.parseInt("42"); // Parses string to int, throws NumberFormatException if invalid
} catch (NumberFormatException e) {
  // handle
} finally {
  // Always executes regardless of exception — used for cleanup
}
```

### Custom Exceptions

```java title="Custom exception syntax in Java"
class BadInputException extends RuntimeException {
  BadInputException(String msg) { super(msg); } // Passes message to RuntimeException
}

throw new BadInputException("Invalid input"); // Throw the custom exception
```

## Common Class Design Patterns 

### Singleton

```java title="Singleton pattern in Java"
class Singleton {
  private static final Singleton INSTANCE = new Singleton(); // Single instance created at class load
  private Singleton() {} // Private constructor prevents external instantiation
  static Singleton getInstance() { return INSTANCE; } // Global access point
}

Singleton s = Singleton.getInstance(); // Retrieve the single instance
```

### Builder

```java title="Builder pattern in Java"
class User {
  final String name;
  final int age;
  private User(Builder b) { this.name = b.name; this.age = b.age; } // Built from Builder state

  static class Builder {
    String name;
    int age;
    Builder name(String n) { this.name = n; return this; } // Returns this for method chaining
    Builder age(int a) { this.age = a; return this; }      // Returns this for method chaining
    User build() { return new User(this); } // Constructs the final User object
  }
}

User u = new User.Builder().name("Harish").age(20).build(); // Build a User object
String name = u.name; // Access field, i.e name = "Harish"
```

### Factory

```java title="Factory pattern in Java"
interface Shape {
  double area();
}

class Square implements Shape {
  double s;
  Square(double s) { this.s = s; }
  public double area() { return s * s; }
}

class Circle2 implements Shape {
  double r;
  Circle2(double r) { this.r = r; }
  public double area() { return Math.PI * r * r; }
}

class ShapeFactory {
  static Shape square(double s) { return new Square(s); }  // Creates a Square instance
  static Shape circle(double r) { return new Circle2(r); } // Creates a Circle instance
}
Shape sq = ShapeFactory.square(4.0); // Create a Square via factory
double area = sq.area(); // i.e area = 16.0
```

## References

- [Oracle Java Tutorials](https://docs.oracle.com/javase/tutorial/)
- [Java SE API Documentation](https://docs.oracle.com/en/java/javase/21/docs/api/index.html)
- [Java Collections Framework](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html)
