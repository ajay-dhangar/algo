---
id: java-streams-and-lambdas
sidebar_position: 13
title: "Java Streams API and Lambda Expressions"
sidebar_label: "Streams & Lambdas"
description: "Complete beginner-friendly guide to Java Lambda Expressions and the Streams API — syntax, filtering, mapping, functional interfaces, method references, and practical code examples."
tags: [java, Streams, Lambda, Functional Programming, filter, map, reduce, collect]
---

:::info Who is this for?
Developers who know basic Java (loops, collections) and want to write cleaner, modern code using **lambda expressions** and the **Streams API**. This guide focuses on functional-style programming with hands-on examples. For the full Collections reference, see [Collections and Streams in Java](./java-14.md).
:::

# Java Streams API and Lambda Expressions

Java 8 introduced two features that changed how we write everyday Java code:

- **Lambda expressions** — compact ways to pass behavior (functions) as arguments.
- **Streams API** — a pipeline for processing collections in a declarative, functional style.

Together, they let you express *what* you want to do with data instead of *how* to loop over it step by step.

## Table of Contents

- [Why Use Lambdas and Streams?](#why-use-lambdas-and-streams)
- [Lambda Expressions](#lambda-expressions)
  - [Basic Syntax](#basic-syntax)
  - [Functional Interfaces](#functional-interfaces)
  - [Method References](#method-references)
- [Streams API Overview](#streams-api-overview)
  - [Creating Streams](#creating-streams)
  - [Intermediate Operations](#intermediate-operations)
  - [Terminal Operations](#terminal-operations)
- [Putting It Together](#putting-it-all-together)
- [DSA-Style Examples](#dsa-style-examples)
- [Best Practices and Gotchas](#best-practices-and-gotchas)
- [Quick Reference](#quick-reference)

---

## Why Use Lambdas and Streams?

**Before (imperative style):**

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evensDoubled = new ArrayList<>();

for (int n : numbers) {
    if (n % 2 == 0) {
        evensDoubled.add(n * 2);
    }
}
```

**After (functional style):**

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

List<Integer> evensDoubled = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .collect(Collectors.toList());
```

Both produce `[4, 8, 12]`. The stream version reads like a sentence: *filter evens, double each, collect to a list*.

---

## Lambda Expressions

A **lambda expression** is an anonymous function — a block of code you can pass around without declaring a full class or method.

### Basic Syntax

```java
(parameters) -> expression
(parameters) -> { statements; }
```

| Example | Meaning |
|---------|---------|
| `x -> x * 2` | One parameter, return `x * 2` |
| `(a, b) -> a + b` | Two parameters, return their sum |
| `() -> 42` | No parameters, return `42` |
| `s -> { System.out.println(s); return s.length(); }` | Multiple statements |

```java
// Runnable — no parameters, no return value
Runnable task = () -> System.out.println("Hello from a lambda!");
task.run();

// Comparator — two parameters, returns int
Comparator<String> byLength = (a, b) -> a.length() - b.length();

// Custom logic
BiFunction<Integer, Integer, Integer> multiply = (a, b) -> a * b;
System.out.println(multiply.apply(3, 4)); // 12
```

### Functional Interfaces

A **functional interface** has exactly one abstract method. Lambdas implement that method implicitly.

```java
import java.util.function.*;

// Predicate<T>  →  boolean test(T t)
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4));  // true
System.out.println(isEven.test(7));  // false

// Function<T, R>  →  R apply(T t)
Function<String, Integer> length = s -> s.length();
System.out.println(length.apply("hello")); // 5

// Consumer<T>  →  void accept(T t)
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Streams are cool!");

// Supplier<T>  →  T get()
Supplier<Double> random = () -> Math.random();
```

Common interfaces from `java.util.function`:

| Interface | Method | Use case |
|-----------|--------|----------|
| `Predicate<T>` | `test(T)` | Filter conditions |
| `Function<T, R>` | `apply(T)` | Transform values |
| `Consumer<T>` | `accept(T)` | Side effects (print, log) |
| `Supplier<T>` | `get()` | Lazy value creation |
| `BiFunction<T, U, R>` | `apply(T, U)` | Combine two inputs |

### Method References

When a lambda only calls an existing method, use a **method reference** (`::`) for cleaner syntax.

```java
List<String> words = List.of("java", "streams", "lambda");

// Lambda form
words.forEach(s -> System.out.println(s));

// Method reference form
words.forEach(System.out::println);

// Static method reference
Function<String, Integer> parse = Integer::parseInt;

// Instance method reference on a specific object
String prefix = "Hello, ";
Function<String, String> greet = prefix::concat;

// Constructor reference
Supplier<List<String>> listFactory = ArrayList::new;
```

| Syntax | Example | Equivalent lambda |
|--------|---------|---------------------|
| `Class::staticMethod` | `Integer::parseInt` | `s -> Integer.parseInt(s)` |
| `object::instanceMethod` | `prefix::concat` | `s -> prefix.concat(s)` |
| `Class::instanceMethod` | `String::toUpperCase` | `s -> s.toUpperCase()` |
| `Class::new` | `ArrayList::new` | `() -> new ArrayList<>()` |

---

## Streams API Overview

A **Stream** is a sequence of elements supporting functional-style operations. Think of it as a pipeline:

```
Source  →  [filter, map, sorted, ...]  →  Terminal operation
List        intermediate (lazy)            collect, reduce, forEach
```

**Key properties:**

- **Lazy** — intermediate operations run only when a terminal operation is called.
- **Non-reusable** — once consumed, a stream cannot be used again.
- **Does not modify the source** — the original collection stays unchanged.

```java
import java.util.*;
import java.util.stream.*;
```

### Creating Streams

```java
// From a List
List<Integer> nums = List.of(1, 2, 3, 4, 5);
Stream<Integer> fromList = nums.stream();

// From an array
int[] arr = {10, 20, 30};
IntStream fromArray = Arrays.stream(arr);

// Direct values
Stream<String> direct = Stream.of("a", "b", "c");

// Range of integers (very useful in DSA)
IntStream range = IntStream.range(0, 5);         // 0, 1, 2, 3, 4
IntStream closed = IntStream.rangeClosed(1, 5);  // 1, 2, 3, 4, 5

// From a Map
Map<String, Integer> scores = Map.of("Alice", 90, "Bob", 75);
Stream<Map.Entry<String, Integer>> entries = scores.entrySet().stream();
```

### Intermediate Operations

Intermediate operations return a new `Stream` and are **lazy** — nothing runs until you call a terminal operation.

#### filter — Keep elements that match a condition

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// [2, 4, 6, 8]

// Chain multiple filters
List<Integer> inRange = numbers.stream()
    .filter(n -> n > 2)
    .filter(n -> n < 7)
    .collect(Collectors.toList());
// [3, 4, 5, 6]
```

#### map — Transform each element

```java
List<String> words = List.of("hello", "world", "java");

List<String> upper = words.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
// ["HELLO", "WORLD", "JAVA"]

List<Integer> lengths = words.stream()
    .map(String::length)
    .collect(Collectors.toList());
// [5, 5, 4]
```

#### flatMap — Map and flatten one level

Useful when each element maps to *multiple* elements (e.g., nested lists, splitting strings).

```java
List<List<Integer>> nested = List.of(
    List.of(1, 2, 3),
    List.of(4, 5),
    List.of(6, 7, 8)
);

List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
// [1, 2, 3, 4, 5, 6, 7, 8]

List<String> sentences = List.of("hello world", "java streams");
List<String> allWords = sentences.stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))
    .collect(Collectors.toList());
// ["hello", "world", "java", "streams"]
```

#### Other useful intermediate operations

```java
List<Integer> nums = List.of(5, 2, 8, 2, 1, 9, 3);

// distinct — remove duplicates
List<Integer> unique = nums.stream().distinct().collect(Collectors.toList());
// [5, 2, 8, 1, 9, 3]

// sorted — natural or custom order
List<Integer> sorted = nums.stream().sorted().collect(Collectors.toList());
// [1, 2, 2, 3, 5, 8, 9]

// limit & skip — pagination
List<Integer> page = nums.stream().skip(2).limit(3).collect(Collectors.toList());
// [8, 2, 1]
```

### Terminal Operations

Terminal operations **trigger the pipeline** and produce a final result. After a terminal op, the stream is consumed.

#### collect — Gather results into a collection

```java
List<Integer> list = Stream.of(1, 2, 3).collect(Collectors.toList());
Set<Integer> set = Stream.of(1, 2, 2, 3).collect(Collectors.toSet());

String joined = Stream.of("Java", "Streams", "API")
    .collect(Collectors.joining(", "));
// "Java, Streams, API"
```

#### reduce — Fold elements to a single value

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
// 15

int product = numbers.stream()
    .reduce(1, (a, b) -> a * b);
// 120

Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);
// Optional[5]
```

#### forEach — Perform an action on each element

```java
List.of("apple", "banana", "cherry")
    .forEach(fruit -> System.out.println(fruit));

// Method reference version
List.of("apple", "banana", "cherry")
    .forEach(System.out::println);
```

#### Matching and finding

```java
List<Integer> nums = List.of(2, 4, 6, 8);

boolean allEven = nums.stream().allMatch(n -> n % 2 == 0);   // true
boolean anyOdd = nums.stream().anyMatch(n -> n % 2 != 0);    // false
boolean noneNegative = nums.stream().noneMatch(n -> n < 0);  // true

Optional<Integer> first = nums.stream().filter(n -> n > 5).findFirst();
// Optional[6]
```

---

## Putting It All Together

Here is a complete runnable example that demonstrates the full pipeline:

```java title="StreamsDemo.java"
import java.util.*;
import java.util.stream.*;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = List.of(
            "Alice", "bob", "Charlie", "diana", "Eve"
        );

        List<String> result = names.stream()
            .filter(name -> name.length() > 3)       // keep names longer than 3 chars
            .map(String::toUpperCase)                 // convert to uppercase
            .sorted()                                 // sort alphabetically
            .collect(Collectors.toList());

        System.out.println(result);
        // [ALICE, CHARLIE, DIANA]
    }
}
```

**Step-by-step:**

1. `stream()` — create a stream from the list.
2. `filter(...)` — keep only names with length > 3.
3. `map(String::toUpperCase)` — transform each name.
4. `sorted()` — sort the result.
5. `collect(Collectors.toList())` — gather into a new `List`.

---

## DSA-Style Examples

### Find all primes in a range

```java
boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

List<Integer> primes = IntStream.rangeClosed(1, 50)
    .filter(StreamsDemo::isPrime)
    .boxed()
    .collect(Collectors.toList());
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

### Sum of squares of even numbers

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

int sumOfSquares = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .reduce(0, Integer::sum);
// 4 + 16 + 36 + 64 = 120
```

### Group anagrams

```java
List<String> words = List.of("eat", "tea", "tan", "ate", "nat", "bat");

Map<String, List<String>> anagrams = words.stream()
    .collect(Collectors.groupingBy(w -> {
        char[] chars = w.toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }));
// {aet=[eat, tea, ate], ant=[tan, nat], abt=[bat]}
```

### Frequency count

```java
List<String> fruits = List.of("apple", "banana", "apple", "cherry", "banana", "apple");

Map<String, Long> frequency = fruits.stream()
    .collect(Collectors.groupingBy(f -> f, Collectors.counting()));
// {apple=3, banana=2, cherry=1}
```

---

## Best Practices and Gotchas

### Do

- Use streams for **readability** when transforming or filtering collections.
- Prefer **method references** when a lambda only delegates to one method.
- Use `mapToInt`, `mapToLong`, or `mapToDouble` for numeric operations to avoid boxing overhead.
- Chain operations in a logical order: `filter` before `map` when possible to process fewer elements.

### Avoid

- **Reusing a stream** — each stream can only be consumed once.

```java
Stream<Integer> stream = List.of(1, 2, 3).stream();
stream.forEach(System.out::println); // OK
stream.count(); // IllegalStateException: stream has already been operated upon
```

- **Modifying the source** during stream processing — unpredictable behavior.

- **Using streams in tight competitive-programming loops** where a simple `for` loop is faster. For DSA interviews, loops are often preferred for performance-critical code. See the [Java Code Style Guide](./java-code-style-guide.md).

- **Side effects in parallel streams** — use thread-safe collectors or avoid parallel streams when mutating shared state.

---

## Quick Reference

| Operation | Type | Description |
|-----------|------|-------------|
| `filter(pred)` | Intermediate | Keep elements matching a condition |
| `map(fn)` | Intermediate | Transform each element |
| `flatMap(fn)` | Intermediate | Map and flatten one level |
| `distinct()` | Intermediate | Remove duplicates |
| `sorted()` | Intermediate | Sort elements |
| `limit(n)` | Intermediate | Take first *n* elements |
| `skip(n)` | Intermediate | Skip first *n* elements |
| `collect(collector)` | Terminal | Gather into a collection |
| `reduce(identity, acc)` | Terminal | Fold to a single value |
| `forEach(action)` | Terminal | Perform action on each element |
| `count()` | Terminal | Count elements |
| `findFirst()` | Terminal | First element (`Optional`) |
| `anyMatch(pred)` | Terminal | Any element matches? |
| `allMatch(pred)` | Terminal | All elements match? |
| `noneMatch(pred)` | Terminal | No element matches? |

---

## Next Steps

- [Functional Programming in Java](./java-12.md) — immutability, pure functions, and higher-order functions.
- [Collections and Streams in Java](./java-14.md) — full Collections Framework reference with advanced stream operations, collectors, `Optional`, and parallel streams.
- [Java Code Style Guide](./java-code-style-guide.md) — coding standards for DSA problems in this repository.
