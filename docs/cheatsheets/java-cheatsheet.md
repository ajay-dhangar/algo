---

id: java-cheatsheet
title: Java Cheatsheet
sidebar_label: Java Cheatsheet
sidebar_position: 2
description: "A fast, practical Java reference for DSA and competitive programming."
tags: [java, cheatsheet, dsa]

This page is a quick reference for Java patterns that show up constantly in DSA and competitive programming. If you're just starting out, don't worry — every snippet here is explained line by line 😊

Common Time Complexities

| Complexity | Meaning | Example |
| :--- | :--- | :--- |
| O(1) | Constant Time | Array access |
| O(log n) | Logarithmic Time | Binary Search |
| O(n) | Linear Time | Array traversal |
| O(n log n) | Efficient sorting | Merge Sort |
| O(n²) | Quadratic Time | Nested loops |



---

## Basic Syntax

Data Types

int a = 1;               // 32-bit integer  
long b = 1_000_000_000L; // 64-bit integer  
double d = 3.14;         // 64-bit decimal  
boolean ok = true;       // true or false only  
char c = 'A';            // 16-bit Unicode character  
String s = "hello";      // Sequence of characters

Operators and Control Flow

// if, else if and else  
if (a > 0) {  
  // ...  
} else if (a == 0) {  
  // ...  
} else {  
  // ...  
}  
  
for (int i = 0; i < n; i++) {}  
// Runs n times -> O(n)  
  
while (n-- > 0) {}  
// Runs n times while decrementing n -> O(n)

Arrays

int[] arr = new int[n];  
// 1D Primitive Integer Array of size n  
// Access -> O(1)  
  
int[][] grid = new int[r][c];  
// 2D Primitive Integer Array/Grid  
  
Arrays.fill(arr, -1);  
// Fills the entire array with -1  
// Time Complexity -> O(n)


---

Strings and StringBuilder

String s = "abc";  
  
char ch = s.charAt(1);  
// Returns character at index 1  
// Time Complexity -> O(1)  
  
int len = s.length();  
// Returns the length of the string  
// Time Complexity -> O(1)  
  
boolean has = s.contains("b");  
// Returns true iff substring "b" exists in s  
// Time Complexity -> O(n)  
  
String t = s.substring(0, 2);  
// s.substring(start index, end index)  
// t = "ab"  
// Time Complexity -> O(n)  
  
StringBuilder sb = new StringBuilder(s);  
// Mutable string class used for efficient string manipulation  
  
sb.append("a").append(123);  
// Appends data at the end  
// Amortized Time Complexity -> O(1)  
  
String out = sb.toString();  
// Converts StringBuilder back to String  
// Time Complexity -> O(n)


---

Collections

import java.util.*;  
// Considered the protagonist of beginner Java code  
// Contains most commonly used data structures

Java Collection Complexities

Data Structure	Access	Search	Insert	Delete

ArrayList	O(1)	O(n)	O(1)* (end)	O(n)
LinkedList	O(n)	O(n)	O(1)	O(1)**
HashMap	-	O(1)	O(1)	O(1)
TreeMap	-	O(log n)	O(log n)	O(log n)
PriorityQueue	-	O(n)	O(log n)	O(log n)


* = Amortized, end insertion only. Inserting at a specific index is O(n).
** = O(1) only when a direct node reference is held (e.g. head/tail). Deleting by index requires O(n) traversal first.


---

List

List<Integer> a = new ArrayList<>();  
// Dynamic array  
// get(index) -> O(1)  
// add() at end -> Amortized O(1)  
  
List<Integer> b = new LinkedList<>();  
// Doubly linked list  
// Insert/Delete at ends -> O(1)  
// Random access -> O(n)  
  
a.add(10);  
// Appends 10 to the end  
// Time Complexity -> O(1) amortized  
  
int x = a.get(0);  
// Returns element at index 0  
// Time Complexity -> O(1)


---

Map / Set

Map<String, Integer> hm = new HashMap<>();  
// Key-Value pairs  
// put/get/remove -> O(1) average  
  
Set<Integer> hs = new HashSet<>();  
// Unique elements only  
// add/contains/remove -> O(1) average  
  
hm.put("k", 1);  
// Maps "k" -> 1  
  
hm.putIfAbsent("k", 2);  
// Inserts only if key doesn't exist  
  
int v = hm.getOrDefault("missing", 0);  
// Returns default value if key doesn't exist  
  
hs.add(5);  
// Adds 5 to the set  
  
boolean exists = hs.contains(5);  
// Returns true if 5 exists in the set


---

Ordered (TreeMap / TreeSet)

TreeMap<Integer, String> tm = new TreeMap<>();  
// Sorted key-value pairs  
// get/put/remove -> O(log n)  
  
TreeSet<Integer> ts = new TreeSet<>();  
// Sorted unique elements  
// add/contains/remove -> O(log n)  
  
tm.put(2, "b");  
  
tm.put(1, "a");  
// Automatically sorted by key  
  
int firstKey = tm.firstKey();  
// Returns the smallest key  
// Time Complexity -> O(log n)


---

Stack / Queue / Deque

// Stack using ArrayDeque (preferred over Stack class)  
Deque<Integer> stack = new ArrayDeque<>();  
  
stack.push(1);  
// O(1)  
  
int top = stack.peek();  
// Returns top without removing  
// O(1)  
  
stack.pop();  
// Removes top  
// O(1)  
  
Queue<Integer> q = new LinkedList<>();  
  
q.add(1);  
// Inserts element  
// O(1)  
  
q.poll();  
// Removes and returns front element  
// O(1)  
  
Deque<Integer> dq = new ArrayDeque<>();  
// Double-ended queue  
// Insert/remove at both ends -> O(1)  
  
dq.addFirst(1);  
  
dq.addLast(2);  
  
dq.addFirst(0);  
  
int front = dq.peekFirst();  
// O(1)  
  
int back = dq.peekLast();  
// O(1)  
  
dq.pollFirst();  
// O(1)  
  
dq.pollLast();  
// O(1)


---

PriorityQueue / Heap

Default: Min-Heap

PriorityQueue<Integer> pq = new PriorityQueue<>();  
// Min-heap  
// Smallest element always stays at the front  
  
pq.add(5);  
// O(log n)  
  
pq.add(1);  
// Heap reorganizes internally  
// O(log n)  
  
int min = pq.poll();  
// Removes and returns smallest element  
// O(log n)  
  
int top = pq.peek();  
// Returns smallest element without removing  
// O(1)  
  
// Max-heap  
PriorityQueue<Integer> maxpq =  
    new PriorityQueue<>(Collections.reverseOrder());


---

Common Operations

Sorting

int[] arr = {3, 1, 2};  
  
Arrays.sort(arr);  
// In-place ascending sort  
// Time Complexity -> O(n log n)  
  
List<int[]> pairs = new ArrayList<>();  
  
pairs.sort(Comparator.comparingInt(p -> p[0]));  
// Sort pairs by first element ascending  
// Time Complexity -> O(n log n)  
  
// Sort by second element descending,  
// then first element ascending  
pairs.sort((p1, p2) -> {  
  if (p1[1] != p2[1]) {  
    return Integer.compare(p2[1], p1[1]);  
  }  
  return Integer.compare(p1[0], p2[0]);  
});


---

Searching

int idx = Arrays.binarySearch(arr, target);  
// Returns index of target in sorted array  
// If not found, returns -(insertion point) - 1  
// Time Complexity -> O(log n)


---

Iterating

for (int x : arr) {}  
// Enhanced for-loop  
// Time Complexity -> O(n)  
  
// Method 1: Iterate over key-value pairs  
for (Map.Entry<String, Integer> e : hm.entrySet()) {  
  String k = e.getKey();  
  int v = e.getValue();  
}  
  
// Method 2: Iterate over keys only  
for (String k : hm.keySet()) {  
  // use k  
}  
  
// Method 3: Iterate over values only  
for (int v : hm.values()) {  
  // use v  
}


---

Streams (Quick Patterns)

int sum = Arrays.stream(arr).sum();  
// Returns sum of all elements  
// Time Complexity -> O(n)  
  
int[] sorted = Arrays.stream(arr)  
                     .sorted()  
                     .toArray();  
// Returns a new sorted array  
// Original array remains unchanged  
// Time Complexity -> O(n log n)


---

OOP (Object Oriented Programming)

Classes and Interfaces

class Point {  
  int x, y;  
  
  Point(int x, int y) {  
    this.x = x;  
    this.y = y;  
  }  
}  
  
Point p = new Point(3, 4);  
  
int px = p.x;  
  
interface Solver {  
  int solve();  
}


---

Inheritance and Abstract Classes

abstract class Shape {  
  abstract double area();  
}  
  
class Circle extends Shape {  
  double r;  
  
  Circle(double r) {  
    this.r = r;  
  }  
  
  @Override  
  double area() {  
    return Math.PI * r * r;  
  }  
}  
  
Circle c = new Circle(5.0);  
  
double a = c.area();


---

Enums

enum Dir {  
  UP,  
  DOWN,  
  LEFT,  
  RIGHT  
}  
  
Dir d = Dir.UP;


---

Exception Handling

try {  
  int x = Integer.parseInt("42");  
  
} catch (NumberFormatException e) {  
  
  // handle exception  
  
} finally {  
  
  // Always executes  
  // Commonly used for cleanup  
}


---

Custom Exceptions

class BadInputException extends RuntimeException {  
  
  BadInputException(String msg) {  
    super(msg);  
  }  
}  
  
throw new BadInputException("Invalid input");


---

Common Class Design Patterns

Singleton

class Singleton {  
  
  private static final Singleton INSTANCE =  
      new Singleton();  
  
  private Singleton() {}  
  
  static Singleton getInstance() {  
    return INSTANCE;  
  }  
}  
  
Singleton s = Singleton.getInstance();


---

Builder

class User {  
  
  final String name;  
  final int age;  
  
  private User(Builder b) {  
    this.name = b.name;  
    this.age = b.age;  
  }  
  
  static class Builder {  
  
    String name;  
    int age;  
  
    Builder name(String n) {  
      this.name = n;  
      return this;  
    }  
  
    Builder age(int a) {  
      this.age = a;  
      return this;  
    }  
  
    User build() {  
      return new User(this);  
    }  
  }  
}  
  
User u = new User.Builder()  
    .name("Harish")  
    .age(20)  
    .build();  
  
String name = u.name;


---

Factory

interface ShapeType {  
  double area();  
}  
  
class Square implements ShapeType {  
  
  double s;  
  
  Square(double s) {  
    this.s = s;  
  }  
  
  public double area() {  
    return s * s;  
  }  
}  
  
class CircleShape implements ShapeType {  
  
  double r;  
  
  CircleShape(double r) {  
    this.r = r;  
  }  
  
  public double area() {  
    return Math.PI * r * r;  
  }  
}  
  
class ShapeFactory {  
  
  static ShapeType square(double s) {  
    return new Square(s);  
  }  
  
  static ShapeType circle(double r) {  
    return new CircleShape(r);  
  }  
}  
  
ShapeType sq = ShapeFactory.square(4.0);  
  
double area = sq.area();


---

References

Oracle Java Tutorials

Java SE API Documentation

Java Collections Framework
