---
id: collections-and-streams
sidebar_position: 14
title: "Collections and Streams in Java"
sidebar_label: "Collections and Streams in Java"
description: "Java Collections Framework & Stream API complete reference — ArrayList, HashMap, PriorityQueue, TreeMap, and all Stream operations with code examples for beginners and DSA prep."
tags: [java, Collections, Streams, ArrayList, LinkedList, HashSet, LinkedHashSet, HashMap, LinkedHashMap, TreeMap, PriorityQueue, Set, List, Queue, Deque, Stack, Map, Stream API]
---

:::info Who is this for?
Absolute beginners who want a single, deep-dive document covering every common data structure and stream operation used in real Java code and DSA problems. Every section includes *what it is*, *when to use it*, *how to create it*, *all key methods with examples*, and *gotchas to avoid*.
:::

---

### 1. Collections Framework Overview

The Java Collections Framework is a unified architecture for storing and manipulating groups of objects. Every structure in this document lives under `java.util`.

```
Iterable
 └── Collection
      ├── List          → ordered, index-based, duplicates allowed
      │    ├── ArrayList
      │    └── LinkedList
      ├── Set           → no duplicates
      │    ├── HashSet
      │    ├── LinkedHashSet
      │    └── TreeSet
      └── Queue         → FIFO ordering
           ├── LinkedList
           ├── ArrayDeque
           └── PriorityQueue

Map (NOT a Collection, but part of the framework)
 ├── HashMap
 ├── LinkedHashMap
 └── TreeMap
```

**Key interfaces to know:**
- `List<E>` — ordered sequence, access by index
- `Set<E>` — unique elements only
- `Queue<E>` — FIFO; poll from front, add to rear
- `Deque<E>` — double-ended queue; use as stack or queue
- `Map<K,V>` — key-value pairs, keys are unique

---

### 2. ArrayList

#### What is it?
A **resizable array** backed by a plain `Object[]` under the hood. When the array fills up, Java creates a new array 1.5× the old size and copies everything over.

#### When to use it?
- You need **fast random access** by index (`O(1)`).
- You mostly **add/read** elements, not insert in the middle.
- Most common List you'll use in DSA (adjacency lists, storing results, etc.).

#### How to create

```java
import java.util.ArrayList;
import java.util.List;

// Empty list
ArrayList<Integer> list = new ArrayList<>();

// With initial capacity (avoids resizing early — good for performance)
ArrayList<Integer> list2 = new ArrayList<>(100);

// From an existing collection
ArrayList<Integer> list3 = new ArrayList<>(List.of(1, 2, 3, 4, 5));

// Using the interface type (best practice)
List<String> names = new ArrayList<>();
```

#### Key Methods

##### Adding Elements

```java
List<String> fruits = new ArrayList<>();

fruits.add("Apple");            // adds to end → ["Apple"]
fruits.add("Banana");           // → ["Apple", "Banana"]
fruits.add(0, "Mango");         // insert at index 0 → ["Mango", "Apple", "Banana"]

fruits.addAll(List.of("Kiwi", "Grape")); // add entire collection at end
fruits.addAll(1, List.of("Peach"));      // add collection at index 1
```

##### Accessing Elements

```java
String first = fruits.get(0);   // "Mango" — O(1)
int size = fruits.size();        // total number of elements

// Iterate with for-each
for (String f : fruits) {
    System.out.println(f);
}

// Iterate with index
for (int i = 0; i < fruits.size(); i++) {
    System.out.println(i + ": " + fruits.get(i));
}

// forEach with lambda
fruits.forEach(f -> System.out.println(f));
```

##### Searching

```java
boolean has = fruits.contains("Apple");      // true — O(n)
int idx = fruits.indexOf("Apple");           // first occurrence index, or -1
int lastIdx = fruits.lastIndexOf("Apple");   // last occurrence index, or -1
```

##### Modifying

```java
fruits.set(0, "Papaya");   // replace element at index 0 — O(1)
```

##### Removing Elements

```java
fruits.remove(0);              // remove by index — O(n) due to shifting
fruits.remove("Banana");       // remove by value (first occurrence) — O(n)
fruits.removeAll(List.of("Kiwi", "Grape")); // remove all matching
fruits.retainAll(List.of("Apple", "Mango")); // keep ONLY these
fruits.clear();                // remove everything
```

##### Sorting

```java
List<Integer> nums = new ArrayList<>(List.of(5, 2, 8, 1));

Collections.sort(nums);                           // natural order → [1, 2, 5, 8]
Collections.sort(nums, Collections.reverseOrder()); // reverse → [8, 5, 2, 1]
nums.sort(Comparator.naturalOrder());             // same as Collections.sort
nums.sort(Comparator.reverseOrder());
nums.sort((a, b) -> a - b);                      // custom lambda comparator
```

##### Sublist & Conversion

```java
List<Integer> sub = nums.subList(1, 3);  // [index 1, index 3) — view, not copy!

// List → Array
Integer[] arr = nums.toArray(new Integer[0]);

// Array → List (fixed size!)
List<Integer> fromArr = Arrays.asList(1, 2, 3);  // cannot add/remove
// Mutable version:
List<Integer> mutable = new ArrayList<>(Arrays.asList(1, 2, 3));
```

#### Complexity

| Operation | Time |
|-----------|------|
| `get(i)` | O(1) |
| `add(e)` at end | O(1) amortized |
| `add(i, e)` in middle | O(n) |
| `remove(i)` | O(n) |
| `contains(e)` | O(n) |

#### Common Gotchas

```java
// Removing by int vs Integer!
List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
list.remove(1);       // removes by INDEX → list is [1, 3]
list.remove((Integer) 1); // removes by VALUE → list is [2, 3]

// ConcurrentModificationException — never modify while iterating
for (Integer n : list) {
    list.remove(n);  // CRASH! Use Iterator or removeIf instead
}
list.removeIf(n -> n % 2 == 0);  // safe removal
```

---

### 3. LinkedList

#### What is it?
A **doubly-linked list** where each node holds a value plus pointers to the previous and next node. It implements both `List` and `Deque`.

#### When to use it?
- Frequent **insertions/deletions at the beginning or middle** — `O(1)` once you have the position.
- You need a **queue or deque** (it implements `Deque`).
- **Avoid** when you need random access — `get(i)` is `O(n)`.

#### How to create

```java
import java.util.LinkedList;

LinkedList<Integer> ll = new LinkedList<>();
LinkedList<String> ll2 = new LinkedList<>(List.of("a", "b", "c"));
```

#### Key Methods

```java
LinkedList<String> ll = new LinkedList<>();

// Adding
ll.add("B");         // adds to end
ll.addFirst("A");    // adds to front → ["A", "B"]
ll.addLast("C");     // adds to end   → ["A", "B", "C"]
ll.add(1, "X");      // insert at index 1

// Accessing
String first = ll.getFirst();  // "A" — throws if empty
String last = ll.getLast();    // "C"
String elem = ll.get(1);       // "X" — O(n)

// Peeking (returns null if empty, does NOT throw)
String peekF = ll.peekFirst(); // look at front without removing
String peekL = ll.peekLast();  // look at back without removing

// Removing
ll.removeFirst();          // removes & returns front
ll.removeLast();           // removes & returns back
ll.remove(1);              // remove by index
ll.remove("B");            // remove by value

// Poll (returns null if empty, does NOT throw)
String polled = ll.pollFirst();
String polledL = ll.pollLast();

// Queue operations (uses the Queue interface)
ll.offer("Z");    // same as addLast
ll.poll();        // same as removeFirst
ll.peek();        // same as peekFirst
```

#### LinkedList as Stack

```java
LinkedList<Integer> stack = new LinkedList<>();
stack.push(10);   // addFirst
stack.push(20);   // addFirst → [20, 10]
stack.pop();      // removeFirst → returns 20
stack.peek();     // peekFirst → returns 10
```

---

### 4. Stack

#### What is it?
A **last-in, first-out (LIFO)** data structure. In Java, `Stack` extends `Vector` (legacy). For new code, prefer `ArrayDeque` as a stack (it's faster and not synchronized).

#### When to use it?
- Implementing DFS (explicitly)
- Undo/redo features
- Balanced parentheses problems
- Expression evaluation

#### Using Stack (legacy class)

```java
import java.util.Stack;

Stack<Integer> stack = new Stack<>();

stack.push(1);    // [1]
stack.push(2);    // [1, 2]
stack.push(3);    // [1, 2, 3]

int top = stack.peek();  // 3 — look without removing
int popped = stack.pop(); // 3 — remove and return
boolean empty = stack.isEmpty(); // false
int size = stack.size();  // 2
boolean has = stack.contains(1); // true
int searchIdx = stack.search(2); // 1-based position from top
```

#### Using ArrayDeque as Stack (preferred)

```java
import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> stack = new ArrayDeque<>();

stack.push(1);        // addFirst
stack.push(2);        // addFirst → top is 2
int top = stack.peek();  // 2
stack.pop();          // removes 2
```

---

### 5. Queue & Deque (ArrayDeque)

#### What is it?
- `Queue` — **first-in, first-out (FIFO)**. Add to rear, remove from front.
- `Deque` (double-ended queue) — can add/remove from **both ends**. Can be used as both a stack and a queue.
- `ArrayDeque` is the go-to implementation — backed by a resizable array, faster than `LinkedList`.

#### When to use it?
- BFS (Breadth-First Search) — uses Queue
- Sliding window problems — uses Deque
- Monotonic queue — uses Deque
- Implementing LRU cache logic

#### Queue operations

```java
import java.util.ArrayDeque;
import java.util.Queue;

Queue<String> queue = new ArrayDeque<>();

// Adding to rear
queue.add("A");      // throws NoSuchElementException if capacity exceeded
queue.offer("B");    // returns false if capacity exceeded (safer)
queue.offer("C");
// queue: [A, B, C] — front is A

// Peeking at front
String front = queue.peek();    // "A" — returns null if empty
String front2 = queue.element(); // "A" — throws if empty

// Removing from front
String removed = queue.poll();  // "A" — returns null if empty
String removed2 = queue.remove(); // "B" — throws if empty

queue.isEmpty();  // false
queue.size();     // 1
```

#### Deque operations

```java
import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> dq = new ArrayDeque<>();

// Adding
dq.addFirst(1);   // [1]
dq.addLast(2);    // [1, 2]
dq.offerFirst(0); // [0, 1, 2]
dq.offerLast(3);  // [0, 1, 2, 3]

// Peeking
dq.peekFirst();   // 0 — null if empty
dq.peekLast();    // 3 — null if empty

// Removing
dq.pollFirst();   // 0
dq.pollLast();    // 3
dq.removeFirst(); // 1 — throws if empty
dq.removeLast();  // 2 — throws if empty

// Size check
dq.isEmpty();
dq.size();
```

#### Deque as Monotonic Queue (DSA Pattern)

```java
// Sliding window maximum — classic DSA problem
int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
int k = 3;
int[] result = new int[nums.length - k + 1];
Deque<Integer> dq = new ArrayDeque<>();  // stores indices

for (int i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (!dq.isEmpty() && dq.peekFirst() < i - k + 1)
        dq.pollFirst();
    // Remove smaller elements from back (they're useless)
    while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i])
        dq.pollLast();
    dq.offerLast(i);
    if (i >= k - 1)
        result[i - k + 1] = nums[dq.peekFirst()];
}
```

---

### 6. PriorityQueue (Heap)

#### What is it?
A **min-heap by default** — `poll()` always returns the smallest element. Backed by a binary heap. Does **not** maintain insertion order.

#### When to use it?
- Dijkstra's algorithm
- Finding top-K elements
- Merge K sorted lists
- Any problem requiring repeated access to the min or max element

#### How to create

```java
import java.util.PriorityQueue;

// Min-heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// Max-heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
// OR
PriorityQueue<Integer> maxHeap2 = new PriorityQueue<>((a, b) -> b - a);

// With initial capacity
PriorityQueue<Integer> pq = new PriorityQueue<>(100);

// Custom object heap (by second element of int[] pair)
PriorityQueue<int[]> pqCustom = new PriorityQueue<>((a, b) -> a[1] - b[1]);
```

#### Key Methods

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

// Adding — O(log n)
pq.add(5);
pq.offer(1);
pq.add(3);
// Internal heap: [1, 5, 3] (heap order, not sorted!)

// Peek — O(1), does NOT remove
int min = pq.peek();  // 1 — returns null if empty
int min2 = pq.element(); // 1 — throws if empty

// Remove — O(log n)
int removed = pq.poll();   // 1 — returns null if empty
int removed2 = pq.remove(); // next min — throws if empty

// Size & check
pq.size();
pq.isEmpty();
pq.contains(3);    // O(n) — heap doesn't support fast search

// Iterate (NOT in sorted order!)
for (int n : pq) {
    System.out.println(n); // heap order, not guaranteed sorted
}

// To get sorted: keep polling
while (!pq.isEmpty()) {
    System.out.println(pq.poll()); // this IS sorted
}
```

#### DSA Pattern — Top K Frequent Elements

```java
// Keep a min-heap of size K; poll when size exceeds K
int[] nums = {1, 1, 1, 2, 2, 3};
int k = 2;

Map<Integer, Integer> freq = new HashMap<>();
for (int n : nums) freq.merge(n, 1, Integer::sum);

// Min-heap by frequency
PriorityQueue<Integer> pq = new PriorityQueue<>(
    (a, b) -> freq.get(a) - freq.get(b)
);

for (int key : freq.keySet()) {
    pq.offer(key);
    if (pq.size() > k) pq.poll(); // remove least frequent
}
// pq now contains top K frequent elements
```

#### Complexity

| Operation | Time |
|-----------|------|
| `offer` / `add` | O(log n) |
| `peek` | O(1) |
| `poll` | O(log n) |
| `contains` | O(n) |
| `remove(Object)` | O(n) |

---

### 7. HashMap

#### What is it?
A **key-value store** backed by a hash table. Keys are hashed to bucket indices. On collision (two keys hash to the same bucket), entries are stored in a linked list (or red-black tree if the list gets long).

#### When to use it?
- Frequency counting
- Two-sum type problems
- Caching/memoization
- Grouping/anagram detection
- Any O(1) average key lookup

#### How to create

```java
import java.util.HashMap;
import java.util.Map;

HashMap<String, Integer> map = new HashMap<>();
HashMap<String, Integer> map2 = new HashMap<>(initialCapacity, loadFactor);
Map<String, Integer> map3 = new HashMap<>(Map.of("a", 1, "b", 2)); // copy
```

#### Key Methods

##### Putting and Getting

```java
Map<String, Integer> map = new HashMap<>();

map.put("apple", 3);       // insert or update
map.put("banana", 5);
map.put("apple", 10);      // overwrites previous value

int val = map.get("apple");          // 10
int def = map.getOrDefault("cherry", 0);  // 0 — key doesn't exist
```

##### Checking Membership

```java
map.containsKey("apple");    // true — O(1) average
map.containsValue(10);       // true — O(n)
map.isEmpty();
map.size();
```

##### Removing

```java
map.remove("banana");             // remove entry, returns old value
map.remove("apple", 10);          // remove ONLY if key maps to this exact value
```

##### Iterating

```java
// Over entries (most common)
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}

// Over keys only
for (String key : map.keySet()) {
    System.out.println(key);
}

// Over values only
for (int value : map.values()) {
    System.out.println(value);
}

// forEach lambda
map.forEach((key, value) -> System.out.println(key + ": " + value));
```

##### Power Methods (Java 8+)

```java
// putIfAbsent — only inserts if key NOT already present
map.putIfAbsent("cherry", 7);

// getOrDefault — return default if key missing (read-only)
int count = map.getOrDefault("fig", 0);

// computeIfAbsent — compute & insert if absent (great for grouping)
Map<Character, List<String>> groups = new HashMap<>();
groups.computeIfAbsent('a', k -> new ArrayList<>()).add("apple");
groups.computeIfAbsent('a', k -> new ArrayList<>()).add("avocado");
// groups: {'a': ["apple", "avocado"]}

// compute — always recomputes
map.compute("apple", (key, oldVal) -> oldVal == null ? 1 : oldVal + 1);

// merge — BEST for frequency counting
String[] words = {"a", "b", "a", "c", "b", "a"};
Map<String, Integer> freq = new HashMap<>();
for (String w : words) {
    freq.merge(w, 1, Integer::sum);
    // If w not present: put w→1; if present: apply Integer::sum(old, 1)
}
// freq: {a=3, b=2, c=1}

// replaceAll — transform all values
map.replaceAll((key, oldVal) -> oldVal * 2);
```

#### Frequency Counting — 3 Ways Compared

```java
String[] arr = {"cat", "dog", "cat", "bird", "dog", "cat"};
Map<String, Integer> freq = new HashMap<>();

// Way 1 — traditional
for (String s : arr) {
    freq.put(s, freq.getOrDefault(s, 0) + 1);
}

// Way 2 — merge (cleanest)
for (String s : arr) {
    freq.merge(s, 1, Integer::sum);
}

// Way 3 — compute
for (String s : arr) {
    freq.compute(s, (k, v) -> v == null ? 1 : v + 1);
}
```

#### Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| `put` | O(1) | O(n) |
| `get` | O(1) | O(n) |
| `remove` | O(1) | O(n) |
| `containsKey` | O(1) | O(n) |

> Worst case `O(n)` occurs with hash collisions. In practice with good hash functions, it's O(1).

---

### 8. LinkedHashMap

#### What is it?
A `HashMap` + a **doubly-linked list** that maintains **insertion order** (or access order if configured).

#### When to use it?
- You need Map behavior but want **predictable iteration order**.
- Implementing an **LRU Cache** (use access-order mode).
- Preserving insertion order for output.

```java
import java.util.LinkedHashMap;

// Insertion order (default)
Map<String, Integer> map = new LinkedHashMap<>();
map.put("banana", 2);
map.put("apple", 5);
map.put("cherry", 1);
// Iteration order: banana, apple, cherry (insertion order)

// Access-order (for LRU Cache)
// Constructor: (initialCapacity, loadFactor, accessOrder)
LinkedHashMap<Integer, Integer> lru = new LinkedHashMap<>(16, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > 3; // max 3 entries
    }
};
lru.put(1, 10);
lru.put(2, 20);
lru.put(3, 30);
lru.get(1);     // 1 becomes most recently used
lru.put(4, 40); // 2 is evicted (least recently used)
System.out.println(lru.keySet()); // [3, 1, 4]
```

---

### 9. TreeMap

### What is it?
A **sorted Map** backed by a Red-Black Tree. Keys are always in **natural sorted order** (or custom Comparator order). All operations are `O(log n)`.

#### When to use it?
- You need sorted key iteration.
- Range queries (find all keys between X and Y).
- Floor/ceiling operations (closest key).

```java
import java.util.TreeMap;

TreeMap<Integer, String> tmap = new TreeMap<>();
tmap.put(5, "five");
tmap.put(1, "one");
tmap.put(3, "three");
tmap.put(7, "seven");
// Internal order: 1, 3, 5, 7

// Navigation methods
tmap.firstKey();        // 1 — smallest key
tmap.lastKey();         // 7 — largest key
tmap.floorKey(4);       // 3 — largest key ≤ 4
tmap.ceilingKey(4);     // 5 — smallest key ≥ 4
tmap.lowerKey(3);       // 1 — strictly < 3
tmap.higherKey(3);      // 5 — strictly > 3

// Submap views (from=inclusive, to=exclusive)
tmap.subMap(1, 5);      // {1=one, 3=three}
tmap.headMap(4);        // {1=one, 3=three} — keys < 4
tmap.tailMap(3);        // {3=three, 5=five, 7=seven} — keys ≥ 3

// Remove extremes
tmap.pollFirstEntry();  // removes & returns {1=one}
tmap.pollLastEntry();   // removes & returns {7=seven}
```

---

### 10. HashSet

#### What is it?
A collection of **unique elements** backed by a `HashMap` (elements are the keys; a dummy value is stored as the map value). No duplicate elements, no guaranteed order.

#### When to use it?
- Removing duplicates from a list.
- Checking if an element has been seen before — `O(1)`.
- Two-pointer / sliding window uniqueness checks.

```java
import java.util.HashSet;
import java.util.Set;

Set<Integer> set = new HashSet<>();

set.add(1);
set.add(2);
set.add(2);   // ignored — duplicate
set.add(3);
// set: {1, 2, 3} (order not guaranteed)

set.contains(2);   // true — O(1)
set.remove(2);     // true if removed
set.size();        // 2
set.isEmpty();

// Bulk operations
Set<Integer> a = new HashSet<>(List.of(1, 2, 3, 4));
Set<Integer> b = new HashSet<>(List.of(3, 4, 5, 6));

// Union (modifies a)
a.addAll(b);        // a = {1, 2, 3, 4, 5, 6}

// Intersection (modifies a)
a.retainAll(b);     // a = {3, 4, 5, 6}

// Difference (modifies a)
a.removeAll(b);     // removes b's elements from a

// Iterate
for (int n : set) {
    System.out.println(n);
}
set.forEach(System.out::println);
```

---

### 11. LinkedHashSet

#### What is it?
A `HashSet` that maintains **insertion order**. Backed by a `LinkedHashMap`.

```java
Set<String> lhs = new LinkedHashSet<>();
lhs.add("banana");
lhs.add("apple");
lhs.add("cherry");
lhs.add("apple");   // ignored

// Iterates in insertion order: banana, apple, cherry
for (String s : lhs) System.out.println(s);
```

Same methods as `HashSet` — just add/contains/remove — but order is preserved.

---

### 12. TreeSet

#### What is it?
A **sorted Set** backed by a Red-Black Tree. All elements are kept in natural sorted order (or custom Comparator). All operations `O(log n)`.

#### When to use it?
- Sorted unique elements.
- Floor/ceiling queries.
- Finding the next/previous element efficiently.

```java
import java.util.TreeSet;

TreeSet<Integer> ts = new TreeSet<>();
ts.add(5);
ts.add(1);
ts.add(8);
ts.add(3);
// ts: [1, 3, 5, 8]

ts.first();         // 1 — smallest
ts.last();          // 8 — largest
ts.floor(4);        // 3 — largest element ≤ 4
ts.ceiling(4);      // 5 — smallest element ≥ 4
ts.lower(5);        // 3 — strictly < 5
ts.higher(5);       // 8 — strictly > 5

ts.headSet(5);      // [1, 3] — elements < 5
ts.tailSet(5);      // [5, 8] — elements ≥ 5
ts.subSet(1, 6);    // [1, 3, 5] — 1 ≤ x < 6

ts.pollFirst();     // removes & returns 1
ts.pollLast();      // removes & returns 8

// Descending view
ts.descendingSet();  // NavigableSet in reverse order
```

---

### 13. Collections Utility Class

`java.util.Collections` has static helper methods for List, Set, and Map operations.

```java
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

List<Integer> list = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9, 2, 6));

// Sorting
Collections.sort(list);                           // [1, 1, 2, 3, 4, 5, 6, 9]
Collections.sort(list, Collections.reverseOrder()); // descending

// Min / Max
Collections.min(list);   // 1
Collections.max(list);   // 9

// Reverse
Collections.reverse(list);

// Shuffle
Collections.shuffle(list);            // random order
Collections.shuffle(list, new Random(42)); // with seed (reproducible)

// Binary Search (list must be sorted first!)
Collections.sort(list);
int idx = Collections.binarySearch(list, 5); // index of 5, or negative if absent

// Frequency count
Collections.frequency(list, 1);   // how many times 1 appears

// Fill — replace all elements with one value
Collections.fill(list, 0);

// Copy — copies src into dest (dest must be at least as large)
List<Integer> dest = new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0));
Collections.copy(dest, list);

// nCopies — immutable list of n copies of a value
List<String> repeated = Collections.nCopies(5, "hello"); // ["hello", "hello", ...]

// disjoint — true if two collections share no elements
Collections.disjoint(List.of(1,2,3), List.of(4,5,6)); // true

// Unmodifiable wrappers
List<Integer> immutable = Collections.unmodifiableList(list);
// immutable.add(1); // throws UnsupportedOperationException

// Synchronized wrappers (thread-safe)
List<Integer> synced = Collections.synchronizedList(list);

// Swap
Collections.swap(list, 0, list.size() - 1); // swap first and last

// Rotate
Collections.rotate(list, 2); // shift right by 2 positions
```

---

### 14. Stream API Overview

Streams are a **functional-style pipeline** for processing sequences of elements. Introduced in Java 8.

```
Source  →  [Intermediate ops]  →  Terminal op
List      filter, map, sorted    collect, reduce, forEach
Array     distinct, limit        count, sum, findFirst
File      flatMap, peek          toList, min, max
```

**Key properties:**
- **Lazy** — intermediate operations don't run until a terminal operation is called.
- **Non-reusable** — a stream can only be consumed once.
- **Does not modify the source** — creates a new stream with processed elements.

```java
import java.util.stream.*;
import java.util.*;
```

---

### 15. Creating Streams

```java
// From a Collection
List<String> names = List.of("Alice", "Bob", "Charlie");
Stream<String> s1 = names.stream();

// From an Array
String[] arr = {"a", "b", "c"};
Stream<String> s2 = Arrays.stream(arr);
Stream<String> s3 = Stream.of("a", "b", "c");

// From a range of ints (IntStream)
IntStream range = IntStream.range(0, 5);    // 0, 1, 2, 3, 4
IntStream rangeC = IntStream.rangeClosed(1, 5); // 1, 2, 3, 4, 5

// Infinite streams
Stream<Integer> naturals = Stream.iterate(1, n -> n + 1); // 1, 2, 3, ...
Stream<Integer> naturalsV2 = Stream.iterate(1, n -> n <= 100, n -> n + 1); // with condition
Stream<Double> randoms = Stream.generate(Math::random); // infinite random doubles

// Empty stream
Stream<String> empty = Stream.empty();

// From a Map
Map<String, Integer> map = Map.of("a", 1, "b", 2);
Stream<Map.Entry<String, Integer>> entryStream = map.entrySet().stream();
```

---

### 16. Intermediate Operations

These are **lazy** — they return a new Stream and don't execute until a terminal op is called.

#### filter — Keep elements matching a condition

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8);

List<Integer> evens = nums.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
// [2, 4, 6, 8]

// Multiple filters chain cleanly
List<Integer> result = nums.stream()
    .filter(n -> n > 2)
    .filter(n -> n < 7)
    .collect(Collectors.toList());
// [3, 4, 5, 6]
```

#### map — Transform each element

```java
List<String> words = List.of("hello", "world", "java");

// String → uppercase
List<String> upper = words.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());
// ["HELLO", "WORLD", "JAVA"]

// String → length
List<Integer> lengths = words.stream()
    .map(String::length)
    .collect(Collectors.toList());
// [5, 5, 4]

// Object field extraction
record Person(String name, int age) {}
List<Person> people = List.of(new Person("Alice", 30), new Person("Bob", 25));

List<String> namesList = people.stream()
    .map(Person::name)
    .collect(Collectors.toList());
// ["Alice", "Bob"]
```

#### mapToInt, mapToLong, mapToDouble — Map to primitive stream

```java
// Avoids boxing overhead when working with numbers
int[] doubled = IntStream.of(1, 2, 3)
    .map(n -> n * 2)
    .toArray();
// [2, 4, 6]

int sum = List.of(1, 2, 3, 4, 5).stream()
    .mapToInt(Integer::intValue)
    .sum();
// 15

// Or use the shortcut
int sum2 = List.of(1, 2, 3, 4, 5).stream()
    .mapToInt(n -> n)
    .sum();
```

#### flatMap — Map + flatten (one level)

```java
// Each element maps to a stream; results are flattened into one stream
List<List<Integer>> nested = List.of(
    List.of(1, 2, 3),
    List.of(4, 5),
    List.of(6, 7, 8, 9)
);

List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Splitting sentences into words
List<String> sentences = List.of("hello world", "java streams");
List<String> words = sentences.stream()
    .flatMap(s -> Arrays.stream(s.split(" ")))
    .collect(Collectors.toList());
// ["hello", "world", "java", "streams"]
```

#### distinct — Remove duplicates

```java
List<Integer> withDups = List.of(1, 2, 2, 3, 3, 3, 4);

List<Integer> unique = withDups.stream()
    .distinct()
    .collect(Collectors.toList());
// [1, 2, 3, 4]
```

#### sorted — Sort elements

```java
List<Integer> nums = List.of(5, 2, 8, 1, 9, 3);

// Natural order
List<Integer> asc = nums.stream()
    .sorted()
    .collect(Collectors.toList());
// [1, 2, 3, 5, 8, 9]

// Reverse order
List<Integer> desc = nums.stream()
    .sorted(Comparator.reverseOrder())
    .collect(Collectors.toList());

// Custom comparator
List<String> words = List.of("banana", "apple", "kiwi", "mango");
List<String> byLength = words.stream()
    .sorted(Comparator.comparingInt(String::length))
    .collect(Collectors.toList());
// ["kiwi", "apple", "mango", "banana"]

// Chained comparators
List<String> byLengthThenAlpha = words.stream()
    .sorted(Comparator.comparingInt(String::length)
        .thenComparing(Comparator.naturalOrder()))
    .collect(Collectors.toList());
```

#### limit & skip — Pagination / windowing

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// limit — take first N elements
List<Integer> first5 = nums.stream()
    .limit(5)
    .collect(Collectors.toList());
// [1, 2, 3, 4, 5]

// skip — skip first N elements
List<Integer> skip3 = nums.stream()
    .skip(3)
    .collect(Collectors.toList());
// [4, 5, 6, 7, 8, 9, 10]

// Pagination pattern
int page = 2, pageSize = 3;
List<Integer> page2 = nums.stream()
    .skip((long)(page - 1) * pageSize)
    .limit(pageSize)
    .collect(Collectors.toList());
// [4, 5, 6]

// First 5 even numbers from an infinite stream
List<Integer> first5Evens = Stream.iterate(2, n -> n + 2)
    .limit(5)
    .collect(Collectors.toList());
// [2, 4, 6, 8, 10]
```

#### peek — Debug without consuming the stream

```java
// peek is an intermediate op — it observes but doesn't change elements
List<Integer> result = List.of(1, 2, 3, 4, 5).stream()
    .filter(n -> n % 2 == 0)
    .peek(n -> System.out.println("After filter: " + n))
    .map(n -> n * 10)
    .peek(n -> System.out.println("After map: " + n))
    .collect(Collectors.toList());
// Prints: After filter: 2, After map: 20, After filter: 4, After map: 40
// result: [20, 40]
```

#### takeWhile & dropWhile (Java 9+)

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7);

// takeWhile — take elements WHILE condition is true; stop at first false
List<Integer> taken = nums.stream()
    .takeWhile(n -> n < 5)
    .collect(Collectors.toList());
// [1, 2, 3, 4]

// dropWhile — skip elements WHILE condition is true; keep rest
List<Integer> dropped = nums.stream()
    .dropWhile(n -> n < 5)
    .collect(Collectors.toList());
// [5, 6, 7]
```

---

### 17. Terminal Operations

Terminal operations **trigger the pipeline** and produce a result.

#### forEach

```java
List.of(1, 2, 3).stream()
    .forEach(System.out::println);  // prints 1, 2, 3

// forEachOrdered — guarantees order even in parallel streams
List.of(1, 2, 3).parallelStream()
    .forEachOrdered(System.out::println);
```

#### collect

```java
// toList (Java 16+, immutable)
List<Integer> list = Stream.of(1, 2, 3).collect(Collectors.toList());

// toSet
Set<Integer> set = Stream.of(1, 2, 2, 3).collect(Collectors.toSet());

// joining — String concatenation
String joined = Stream.of("a", "b", "c")
    .collect(Collectors.joining(", ", "[", "]"));
// "[a, b, c]"
```

> Full coverage of collectors is in [Section 18](#18-collectors).

#### count

```java
long count = List.of(1, 2, 3, 4, 5).stream()
    .filter(n -> n > 2)
    .count();
// 3
```

#### min & max

```java
Optional<Integer> max = List.of(3, 1, 4, 1, 5, 9).stream()
    .max(Comparator.naturalOrder());

max.ifPresent(System.out::println); // 9

Optional<String> shortest = List.of("apple", "kiwi", "banana").stream()
    .min(Comparator.comparingInt(String::length));
// Optional["kiwi"]
```

#### findFirst & findAny

```java
// findFirst — returns the first matching element (deterministic)
Optional<Integer> first = List.of(1, 2, 3, 4).stream()
    .filter(n -> n > 2)
    .findFirst();
// Optional[3]

// findAny — returns any element (faster in parallel, non-deterministic)
Optional<Integer> any = List.of(1, 2, 3, 4).stream()
    .filter(n -> n > 2)
    .findAny();
```

#### anyMatch, allMatch, noneMatch

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5);

// anyMatch — true if AT LEAST ONE matches
boolean anyEven = nums.stream().anyMatch(n -> n % 2 == 0); // true

// allMatch — true if ALL match
boolean allPositive = nums.stream().allMatch(n -> n > 0);  // true
boolean allEven = nums.stream().allMatch(n -> n % 2 == 0); // false

// noneMatch — true if NO element matches
boolean noneNeg = nums.stream().noneMatch(n -> n < 0);     // true
```

#### reduce — Aggregate to a single value

```java
// reduce(identity, accumulator)
int sum = Stream.of(1, 2, 3, 4, 5)
    .reduce(0, Integer::sum);         // 15
int product = Stream.of(1, 2, 3, 4, 5)
    .reduce(1, (a, b) -> a * b);     // 120
int max = Stream.of(3, 1, 4, 1, 5)
    .reduce(Integer.MIN_VALUE, Integer::max); // 5

// reduce without identity — returns Optional (stream might be empty)
Optional<Integer> optSum = Stream.of(1, 2, 3)
    .reduce((a, b) -> a + b);
// Optional[6]

// String concatenation with reduce
String concat = Stream.of("a", "b", "c")
    .reduce("", (a, b) -> a + b);
// "abc" — but use joining() for this, it's faster
```

#### toArray

```java
Object[] arr = Stream.of(1, 2, 3).toArray();

Integer[] typedArr = Stream.of(1, 2, 3)
    .toArray(Integer[]::new);
```

---

### 18. Collectors

`Collectors` is a utility class with factory methods for common collection operations. Used as argument to `stream.collect(...)`.

#### toList, toSet, toUnmodifiableList

```java
import java.util.stream.Collectors;

List<Integer> list = stream.collect(Collectors.toList());
Set<Integer> set = stream.collect(Collectors.toSet());
List<Integer> immutable = stream.collect(Collectors.toUnmodifiableList());
```

#### toMap

```java
// Map each string to its length
Map<String, Integer> wordLength = Stream.of("apple", "banana", "kiwi")
    .collect(Collectors.toMap(
        s -> s,          // key extractor
        String::length   // value extractor
    ));
// {apple=5, banana=6, kiwi=4}

// With merge function — handles duplicate keys
List<String> words = List.of("apple", "ant", "banana", "bear", "avocado");
Map<Character, String> firstLetterMap = words.stream()
    .collect(Collectors.toMap(
        s -> s.charAt(0),
        s -> s,
        (existing, replacement) -> existing + ", " + replacement
    ));
// {a=apple, ant, avocado, b=banana, bear}

// With a specific map type
Map<String, Integer> linkedMap = Stream.of("apple", "banana")
    .collect(Collectors.toMap(
        s -> s,
        String::length,
        (e, r) -> e,
        LinkedHashMap::new
    ));
```

#### joining

```java
// Simple join
String simple = Stream.of("a", "b", "c")
    .collect(Collectors.joining());
// "abc"

// With delimiter
String delimited = Stream.of("a", "b", "c")
    .collect(Collectors.joining(", "));
// "a, b, c"

// With delimiter, prefix, suffix
String full = Stream.of("a", "b", "c")
    .collect(Collectors.joining(", ", "[", "]"));
// "[a, b, c]"
```

#### groupingBy — Group elements by a classifier

```java
List<String> words = List.of("apple", "ant", "avocado", "banana", "bear", "cherry");

// Group by first character
Map<Character, List<String>> grouped = words.stream()
    .collect(Collectors.groupingBy(s -> s.charAt(0)));
// {a=[apple, ant, avocado], b=[banana, bear], c=[cherry]}

// Group and count
Map<Character, Long> countByFirstChar = words.stream()
    .collect(Collectors.groupingBy(
        s -> s.charAt(0),
        Collectors.counting()
    ));
// {a=3, b=2, c=1}

// Group and get lengths
Map<Character, List<Integer>> lengths = words.stream()
    .collect(Collectors.groupingBy(
        s -> s.charAt(0),
        Collectors.mapping(String::length, Collectors.toList())
    ));

// Group by length
Map<Integer, List<String>> byLength = words.stream()
    .collect(Collectors.groupingBy(String::length));

// Frequency map (very common in DSA)
int[] arr = {1, 2, 2, 3, 3, 3, 4};
Map<Integer, Long> freq = Arrays.stream(arr)
    .boxed()
    .collect(Collectors.groupingBy(n -> n, Collectors.counting()));
// {1=1, 2=2, 3=3, 4=1}
```

#### partitioningBy — Split into true/false groups

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8);

Map<Boolean, List<Integer>> evenOdd = nums.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));
// {true=[2, 4, 6, 8], false=[1, 3, 5, 7]}

// Partition and count
Map<Boolean, Long> counts = nums.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0, Collectors.counting()));
// {true=4, false=4}
```

#### counting, summingInt, averagingInt, summarizingInt

```java
// counting
long count = Stream.of("a", "b", "c")
    .collect(Collectors.counting());
// 3

// summingInt
int total = Stream.of("apple", "banana", "kiwi")
    .collect(Collectors.summingInt(String::length));
// 16

// averagingInt
double avg = Stream.of("apple", "banana", "kiwi")
    .collect(Collectors.averagingInt(String::length));
// 5.333...

// summarizingInt — gives count, sum, min, max, average in one pass
IntSummaryStatistics stats = Stream.of("apple", "banana", "kiwi")
    .collect(Collectors.summarizingInt(String::length));
System.out.println(stats.getMax());    // 6
System.out.println(stats.getMin());    // 4
System.out.println(stats.getSum());    // 16
System.out.println(stats.getAverage()); // 5.333...
System.out.println(stats.getCount());  // 3
```

#### minBy, maxBy

```java
Optional<String> longest = Stream.of("apple", "banana", "kiwi")
    .collect(Collectors.maxBy(Comparator.comparingInt(String::length)));
// Optional["banana"]
```

---

### 19. Optional

`Optional<T>` is a container that may or may not hold a value. It forces you to handle the "absent" case explicitly, eliminating `NullPointerException`.

```java
import java.util.Optional;

// Creating
Optional<String> present = Optional.of("hello");       // value must be non-null
Optional<String> maybe = Optional.ofNullable(null);    // can be null
Optional<String> empty = Optional.empty();

// Checking
present.isPresent();  // true
present.isEmpty();    // false (Java 11+)

// Getting the value
present.get();        // "hello" — throws NoSuchElementException if empty
present.orElse("default");        // "hello" — returns default if empty
present.orElseGet(() -> "computed"); // lazy: only computes if empty
present.orElseThrow();            // throw if empty (Java 10+)
present.orElseThrow(() -> new RuntimeException("Missing!")); // custom exception

// Transforming
Optional<Integer> length = present.map(String::length);    // Optional[5]
Optional<String> upper = present.map(String::toUpperCase); // Optional["HELLO"]

// flatMap — when the mapper returns Optional
Optional<Optional<String>> nested = present.map(s -> Optional.of(s.toUpperCase()));
Optional<String> flat = present.flatMap(s -> Optional.of(s.toUpperCase())); // better

// filter
Optional<String> filtered = present.filter(s -> s.length() > 3); // Optional["hello"]
Optional<String> filtered2 = present.filter(s -> s.length() > 10); // Optional.empty

// ifPresent — execute action only if value present
present.ifPresent(System.out::println); // prints "hello"

// ifPresentOrElse (Java 9+)
present.ifPresentOrElse(
    s -> System.out.println("Found: " + s),
    () -> System.out.println("Not found")
);

// or — return another Optional if empty (Java 9+)
Optional<String> result = empty.or(() -> Optional.of("fallback")); // Optional["fallback"]

// stream — convert to Stream of 0 or 1 elements (Java 9+)
Stream<String> s = present.stream(); // Stream["hello"]
Stream<String> s2 = empty.stream();  // empty Stream
```

**Common pattern — chain from stream:**

```java
// Stream's findFirst returns Optional
Optional<Integer> firstEven = List.of(1, 3, 4, 6).stream()
    .filter(n -> n % 2 == 0)
    .findFirst();

int value = firstEven.orElse(-1); // 4
```

---

### 20. Primitive Streams

`IntStream`, `LongStream`, and `DoubleStream` avoid boxing overhead and have extra numeric methods.

```java
import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.DoubleStream;

// Creating
IntStream is = IntStream.of(1, 2, 3, 4, 5);
IntStream range = IntStream.range(0, 5);        // 0,1,2,3,4
IntStream rangeC = IntStream.rangeClosed(1, 5); // 1,2,3,4,5

// Numeric terminal ops (unique to primitive streams)
IntStream nums = IntStream.of(1, 2, 3, 4, 5);
int sum = nums.sum();           // 15

IntStream nums2 = IntStream.rangeClosed(1, 5);
int min = nums2.min().getAsInt();  // 1

IntStream nums3 = IntStream.rangeClosed(1, 5);
int max = nums3.max().getAsInt();  // 5

IntStream nums4 = IntStream.rangeClosed(1, 5);
double avg = nums4.average().getAsDouble(); // 3.0

IntStream nums5 = IntStream.rangeClosed(1, 5);
IntSummaryStatistics stats = nums5.summaryStatistics();
// count=5, sum=15, min=1, max=5, average=3.0

// toArray
int[] arr = IntStream.rangeClosed(1, 5).toArray(); // [1,2,3,4,5]

// Boxing — convert primitive stream back to Stream<Integer>
Stream<Integer> boxed = IntStream.of(1, 2, 3).boxed();

// Convert Stream<Integer> to IntStream
IntStream unboxed = Stream.of(1, 2, 3).mapToInt(Integer::intValue);

// Common usage — sum of array
int[] data = {3, 1, 4, 1, 5, 9};
int total = Arrays.stream(data).sum();        // 23
int maximum = Arrays.stream(data).max().getAsInt(); // 9
double average = Arrays.stream(data).average().getAsDouble(); // 3.833...

// Filter and count on primitive stream
long evenCount = IntStream.rangeClosed(1, 10)
    .filter(n -> n % 2 == 0)
    .count();
// 5
```

---

### 21. Parallel Streams

Parallel streams split data across multiple threads using the Fork-Join pool. Use them carefully.

```java
List<Integer> bigList = new ArrayList<>();
for (int i = 0; i < 1_000_000; i++) bigList.add(i);

// Sequential
long seqSum = bigList.stream()
    .mapToLong(Integer::longValue)
    .sum();

// Parallel
long parSum = bigList.parallelStream()
    .mapToLong(Integer::longValue)
    .sum();

// Convert to parallel mid-pipeline
long result = bigList.stream()
    .filter(n -> n % 2 == 0)
    .parallel()               // switch to parallel from here
    .mapToLong(Long::valueOf)
    .sum();
```

**When parallel streams HELP:**
- Very large datasets (millions of elements)
- CPU-intensive, stateless operations
- `reduce`, `sum`, `count` — operations that naturally parallelize

**When parallel streams HURT:**
- Small lists (overhead > benefit)
- Operations with side effects or shared mutable state
- Ordering-sensitive operations (use `forEachOrdered` if needed)
- I/O-bound tasks (threads block, giving no speedup)

```java
// WRONG — shared mutable state with parallel stream
List<Integer> result = new ArrayList<>();
Stream.of(1,2,3,4).parallel().forEach(result::add); // data race!

// RIGHT — collect safely
List<Integer> result2 = Stream.of(1,2,3,4)
    .parallel()
    .collect(Collectors.toList()); // thread-safe collect
```

---

### 22. Chaining — Real-world Examples

#### Example 1 — Group anagrams

```java
List<String> words = List.of("eat", "tea", "tan", "ate", "nat", "bat");

Map<String, List<String>> anagrams = words.stream()
    .collect(Collectors.groupingBy(w -> {
        char[] chars = w.toCharArray();
        Arrays.sort(chars);
        return new String(chars); // sorted chars = group key
    }));
// {aet=[eat, tea, ate], ant=[tan, nat], abt=[bat]}
```

#### Example 2 — Top 3 most frequent words

```java
String text = "the quick brown fox jumps over the lazy dog the fox";

List<String> top3 = Arrays.stream(text.split(" "))
    .collect(Collectors.groupingBy(w -> w, Collectors.counting()))
    .entrySet().stream()
    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
    .limit(3)
    .map(Map.Entry::getKey)
    .collect(Collectors.toList());
// [the, fox, quick] (or similar)
```

#### Example 3 — Flatten and deduplicate

```java
List<List<Integer>> matrix = List.of(
    List.of(1, 2, 3),
    List.of(2, 3, 4),
    List.of(4, 5, 6)
);

List<Integer> uniqueSorted = matrix.stream()
    .flatMap(Collection::stream)
    .distinct()
    .sorted()
    .collect(Collectors.toList());
// [1, 2, 3, 4, 5, 6]
```

#### Example 4 — Map transformation

```java
Map<String, Integer> prices = Map.of("apple", 100, "banana", 60, "cherry", 200);

// Get names of items under price 150, sorted alphabetically
List<String> affordable = prices.entrySet().stream()
    .filter(e -> e.getValue() < 150)
    .map(Map.Entry::getKey)
    .sorted()
    .collect(Collectors.toList());
// [apple, banana]
```

#### Example 5 — Statistical summary from records

```java
record Student(String name, int score) {}
List<Student> students = List.of(
    new Student("Alice", 85),
    new Student("Bob", 92),
    new Student("Charlie", 78),
    new Student("Diana", 96),
    new Student("Eve", 88)
);

// Average score
double avg = students.stream()
    .mapToInt(Student::score)
    .average()
    .orElse(0);

// Top scorer
Student top = students.stream()
    .max(Comparator.comparingInt(Student::score))
    .orElseThrow();

// Partition into pass/fail (pass = score >= 80)
Map<Boolean, List<Student>> partition = students.stream()
    .collect(Collectors.partitioningBy(s -> s.score() >= 80));

List<Student> passed = partition.get(true);  // Alice, Bob, Diana, Eve
List<Student> failed = partition.get(false); // Charlie
```

#### Example 6 — Custom sort with multiple fields

```java
record Employee(String dept, String name, double salary) {}
List<Employee> employees = List.of(
    new Employee("Engineering", "Alice", 90000),
    new Employee("Engineering", "Bob", 85000),
    new Employee("Marketing", "Charlie", 75000),
    new Employee("Marketing", "Diana", 80000)
);

// Sort by dept alphabetically, then by salary descending within dept
List<Employee> sorted = employees.stream()
    .sorted(Comparator.comparing(Employee::dept)
        .thenComparingDouble(Employee::salary).reversed())
    .collect(Collectors.toList());
```

#### Example 7 — DSA: Two Sum using Stream

```java
int[] nums = {2, 7, 11, 15};
int target = 9;

// Traditional is faster for DSA, but here's the stream version:
Set<Integer> seen = new HashSet<>();
Optional<int[]> pair = Arrays.stream(nums)
    .boxed()
    .filter(n -> {
        if (seen.contains(target - n)) return true;
        seen.add(n);
        return false;
    })
    .map(n -> new int[]{target - n, n})
    .findFirst();

pair.ifPresent(p -> System.out.println(Arrays.toString(p))); // [2, 7]
```

---

### Quick Reference Cheatsheet

#### Which Collection to pick?

| Need | Use |
|------|-----|
| Ordered list, fast random access | `ArrayList` |
| Fast insert/delete at head | `LinkedList` / `ArrayDeque` |
| LIFO stack | `ArrayDeque` (use `push`/`pop`) |
| FIFO queue | `ArrayDeque` (use `offer`/`poll`) |
| Double-ended queue | `ArrayDeque` |
| Min/max heap | `PriorityQueue` |
| Key-value, O(1) ops | `HashMap` |
| Key-value, insertion order | `LinkedHashMap` |
| Key-value, sorted keys | `TreeMap` |
| Unique elements, fast lookup | `HashSet` |
| Unique elements, insertion order | `LinkedHashSet` |
| Unique elements, sorted | `TreeSet` |

#### Stream operations at a glance

| Operation | Type | What it does |
|-----------|------|--------------|
| `filter(pred)` | Intermediate | Keep matching elements |
| `map(fn)` | Intermediate | Transform each element |
| `flatMap(fn)` | Intermediate | Map + flatten one level |
| `distinct()` | Intermediate | Remove duplicates |
| `sorted()` | Intermediate | Sort elements |
| `limit(n)` | Intermediate | Take first n |
| `skip(n)` | Intermediate | Skip first n |
| `peek(action)` | Intermediate | Side-effect for debugging |
| `takeWhile(pred)` | Intermediate | Take while condition true |
| `dropWhile(pred)` | Intermediate | Drop while condition true |
| `forEach(action)` | Terminal | Consume each element |
| `collect(collector)` | Terminal | Gather into collection |
| `count()` | Terminal | Count elements |
| `min(comp)` | Terminal | Minimum element |
| `max(comp)` | Terminal | Maximum element |
| `reduce(id, acc)` | Terminal | Fold to single value |
| `findFirst()` | Terminal | First element (Optional) |
| `anyMatch(pred)` | Terminal | Any element matches? |
| `allMatch(pred)` | Terminal | All elements match? |
| `noneMatch(pred)` | Terminal | No element matches? |
| `toArray()` | Terminal | Convert to array |

---