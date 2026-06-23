---
id: java-streams-and-lambdas
sidebar_position: 13
title: "Java Streams API and Lambda Expressions"
sidebar_label: "Streams & Lambdas"
description: "Complete beginner-friendly guide to Java Lambda Expressions and the Streams API — syntax, filtering, mapping, functional interfaces, method references, and practical code examples."
tags: [java, Streams, Lambda, Functional Programming, filter, map, reduce, collect]
---

:::info Who is this for?
Developers who know basic Java (loops, collections) and want to write cleaner, modern code using **lambda expressions** and the **Streams API**. This guide focuses on functional-style programming with hands-on examples. For the full Collections reference, see [Collections and Streams in Java](./collections-and-streams).
:::

# Java Streams API and Lambda Expressions

Java 8 introduced two features that fundamentally changed how we write everyday Java code:

* **Lambda expressions** — Compact ways to pass behavior (functions) as arguments.
* **Streams API** — A pipeline for processing collections in a declarative, functional style.

Together, they let you express **what** you want to do with data instead of **how** to loop over it step-by-step.

## Why Use Lambdas and Streams?

### Before (Imperative Style)

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evensDoubled = new ArrayList<>();

for (int n : numbers) {
    if (n % 2 == 0) {
        evensDoubled.add(n * 2);
    }
}

```

### After (Functional Style)

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
| --- | --- |
| `x -> x * 2` | One parameter, returns `x * 2` |
| `(a, b) -> a + b` | Two parameters, returns their sum |
| `() -> 42` | No parameters, returns `42` |
| `s -> { System.out.println(s); return s.length(); }` | Multiple statements with explicit return |

```java
// Runnable — no parameters, no return value
Runnable task = () -> System.out.println("Hello from a lambda!");
task.run();

// Comparator — two parameters, returns int
String prefix = "Hello, ";
Comparator<String> byLength = (a, b) -> Integer.compare(a.length(), b.length());

// Custom logic using Built-in Functional Interface
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

| Interface | Method | Use Case |
| --- | --- | --- |
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

| Syntax | Example | Equivalent Lambda |
| --- | --- | --- |
| `Class::staticMethod` | `Integer::parseInt` | `s -> Integer.parseInt(s)` |
| `object::instanceMethod` | `prefix::concat` | `s -> prefix.concat(s)` |
| `Class::instanceMethod` | `String::toUpperCase` | `s -> s.toUpperCase()` |
| `Class::new` | `ArrayList::new` | `() -> new ArrayList<>()` |

---

## Streams API Overview

A **Stream** is a sequence of elements supporting functional-style operations. Think of it as a pipeline:

```text
Source  →  [Filter, Map, Sorted, ...]  →  Terminal Operation
 List       Intermediate (Lazy)            collect, reduce, forEach

```

### Key Properties

* **Lazy** — Intermediate operations run only when a terminal operation is called.
* **Non-reusable** — Once consumed, a stream cannot be used or traversed again.
* **Does not modify the source** — The original collection stays entirely unchanged.

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

Intermediate operations return a new `Stream` and are lazy. No processing happens until a terminal operation triggers the pipeline.

#### filter — Keep elements that match a condition

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// Output: [2, 4, 6, 8]

// Chain multiple filters
List<Integer> inRange = numbers.stream()
    .filter(n -> n > 2)
    .filter(n -> n < 7)
    .collect(Collectors.toList());
// Output: [3, 4, 5, 6]

```

#### map — Transform each element

```java
List<String> words = List.of("hello", "world", "java");

List<String> upper = words.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
// Output: ["HELLO", "WORLD", "JAVA"]

List<Integer> lengths = words.stream()
    .map(String::length)
    .collect(Collectors.toList());
// Output: [5, 5, 4]

```

#### flatMap — Map and flatten one level

Useful when each element maps to *multiple* elements (e.g., nested lists, splitting sentences into individual words).

```java
List<List<Integer>> nested = List.of(
    List.of(1, 2, 3),
    List.of(4, 5),
    List.of(6, 7, 8)
);

List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

List<String> sentences = List.of("hello world", "java streams");
List<String> allWords = sentences.stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))
    .collect(Collectors.toList());
// Output: ["hello", "world", "java", "streams"]

```

#### Other useful intermediate operations

```java
List<Integer> nums = List.of(5, 2, 8, 2, 1, 9, 3);

// distinct — remove duplicates
List<Integer> unique = nums.stream().distinct().collect(Collectors.toList());
// Output: [5, 2, 8, 1, 9, 3]

// sorted — natural or custom order
List<Integer> sorted = nums.stream().sorted().collect(Collectors.toList());
// Output: [1, 2, 2, 3, 5, 8, 9]

// limit & skip — pagination
List<Integer> page = nums.stream().skip(2).limit(3).collect(Collectors.toList());
// Output: [8, 2, 1]

```

### Terminal Operations

Terminal operations trigger the stream pipeline execution and produce a final, non-stream result.

#### collect — Gather results into a collection

```java
List<Integer> list = Stream.of(1, 2, 3).collect(Collectors.toList());
Set<Integer> set = Stream.of(1, 2, 2, 3).collect(Collectors.toSet());

String joined = Stream.of("Java", "Streams", "API")
    .collect(Collectors.joining(", "));
// Output: "Java, Streams, API"

```

#### reduce — Fold elements into a single value

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);
// Output: 15

int product = numbers.stream()
    .reduce(1, (a, b) -> a * b);
// Output: 120

Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);
// Output: Optional[5]

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
// Output: Optional[6]

```

---

## Putting It All Together

Here is a complete runnable example showcasing a complete processing pipeline:

```java title="StreamsDemo.java"
import java.util.*;
import java.util.stream.*;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = List.of(
            "Alice", "bob", "Charlie", "diana", "Eve"
        );

        List<String> result = names.stream()
            .filter(name -> name.length() > 3)       // Keep names longer than 3 chars
            .map(String::toUpperCase)                 // Convert to uppercase
            .sorted()                                 // Sort alphabetically
            .collect(Collectors.toList());

        System.out.println(result);
        // Output: [ALICE, CHARLIE, DIANA]
    }
}

```

### Step-by-Step Breakdown

1. `stream()` initializes a stream configuration from the source list.
2. `filter(...)` isolates values meeting the conditional parameter.
3. `map(...)` applies object mutations sequentially.
4. `sorted()` triggers natural comparison reorganization.
5. `collect(...)` terminates the stream, generating a concrete output list.

---

## DSA-Style Examples

### Find All Primes in a Range

```java
static boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

List<Integer> primes = IntStream.rangeClosed(1, 50)
    .filter(StreamsDemo::isPrime)
    .boxed() // Converts IntStream to Stream<Integer>
    .collect(Collectors.toList());
// Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

```

### Sum of Squares of Even Numbers

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

int sumOfSquares = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .reduce(0, Integer::sum);
// 4 + 16 + 36 + 64 + 100 = 220

```

### Group Anagrams

```java
List<String> words = List.of("eat", "tea", "tan", "ate", "nat", "bat");

Map<String, List<String>> anagrams = words.stream()
    .collect(Collectors.groupingBy(w -> {
        char[] chars = w.toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }));
// Output: {aet=[eat, tea, ate], ant=[tan, nat], abt=[bat]}

```

### Frequency Count

```java
List<String> fruits = List.of("apple", "banana", "apple", "cherry", "banana", "apple");

Map<String, Long> frequency = fruits.stream()
    .collect(Collectors.groupingBy(f -> f, Collectors.counting()));
// Output: {apple=3, banana=2, cherry=1}

```

---

## Best Practices and Gotchas

### Do

* **Prioritize Readability:** Use streams when transformations or complex object updates look confusing inside nested loops.
* **Leverage Method References:** When a lambda purely executes an explicit target method, replace `s -> s.toLowerCase()` with `String::toLowerCase`.
* **Avoid Unnecessary Boxing:** Use optimized primitive streams (`IntStream`, `LongStream`, `DoubleStream`) along with specialized maps like `mapToInt()` to eliminate object reference allocation overhead.
* **Order Operations Wisely:** Apply `filter()` clauses early in pipelines to drop redundant records before executing expensive operations like `map()` or `sorted()`.

### Avoid

* **Reusing a Stream Object:** Attempting a subsequent operation on an already evaluated stream triggers an error.
```java
Stream<Integer> stream = List.of(1, 2, 3).stream();
stream.forEach(System.out::println); // OK
stream.count(); // Throws IllegalStateException

```


* **Modifying the Underlying Source:** Mutating the original data structure mid-stream leads to runtime unpredictability or `ConcurrentModificationException`.
* **Performance Bottlenecks in Tight DSA Loops:** Pure imperative `for` loops have significantly lower stack overhead and execute faster. In time-critical competitive programming loops, avoid streams. See the [Java Code Style Guide](./java-code-style-guide.md).
* **Side-Effects in Parallel Operations:** Avoid using non-thread-safe state collections inside `.parallelStream()` blocks.

---

## Quick Reference

| Operation | Type | Description |
| --- | --- | --- |
| `filter(predicate)` | Intermediate | Keep elements matching a condition |
| `map(function)` | Intermediate | Transform each element type or value |
| `flatMap(function)` | Intermediate | Flatten nested structural streams into a single list |
| `distinct()` | Intermediate | Remove identical objects from the pipeline |
| `sorted()` | Intermediate | Reorder items natively or via a `Comparator` |
| `limit(n)` | Intermediate | Truncate data evaluation after *n* elements |
| `skip(n)` | Intermediate | Ignore the first *n* elements in the stream |
| `collect(collector)` | Terminal | Gather resulting stream contents into concrete formats |
| `reduce(init, accumulator)` | Terminal | Compute sequence down to a singular wrapped object |
| `forEach(action)` | Terminal | Apply a safe consumer logic on elements without returning a value |
| `count()` | Terminal | Return a primitive long total of stream items |
| `findFirst()` | Terminal | Return an `Optional` containing the initial valid pipeline value |
| `anyMatch(predicate)` | Terminal | Check if **at least one** element matches a condition |
| `allMatch(predicate)` | Terminal | Check if **every** element matches a condition |
| `noneMatch(predicate)` | Terminal | Check if **no** elements match a condition |
