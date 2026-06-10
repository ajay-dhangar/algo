---
id: kotlin-cheatsheet
title: Kotlin Cheatsheet
sidebar_label: Kotlin Cheatsheet
sidebar_position: 2
description: "A fast, production-ready Kotlin reference optimized for DSA, LeetCode, and competitive programming."
tags: [kotlin, cheatsheet, dsa]
---

This guide is a fast, practical reference for Kotlin patterns that show up constantly in Data Structures, Algorithms, and competitive programming. Every snippet is structured to be optimized for execution speed and clean readability.

## Basic Syntax & Control Flow

### Data Types

Kotlin handles type inference beautifully, but when dealing with large constraints in competitive programming, knowing your explicit data sizes is crucial.

```kotlin title="Primitive Data Types"
val explicitInt: Int = 1           // 32-bit signed integer (Standard for counts/indices)
val largeValue: Long = 1_000_000_000L // 64-bit signed integer (Use for sums that exceed 2*10^9)
val preciseDecimal: Double = 3.14  // 64-bit floating point
val isFound: Boolean = true        // Logical true or false
val character: Char = 'A'          // Single 16-bit Unicode character
val greeting: String = "hello"     // Immutable sequence of characters

```

### Operators & Control Flow

Standard conditional statements and highly optimized loop structures for traversing spaces or handling time limits.

```kotlin title="Control Flow Mechanics"
// 1. Conditional Logic
if (a > 0) {
    // Positive block
} else if (a == 0) {
    // Zero block
} else {
    // Negative block
}

// 2. Range Loops (Highly idiomatic in Kotlin)
for (i in 0 until n) {
    // Iterates from 0 up to n - 1 (O based indexing traversal)
}

for (i in 0..n) {
    // Iterates from 0 directly up to n (Inclusive)
}

for (i in n downTo 0 step 2) {
    // Iterates backwards from n down to 0, skipping every second element
}

// 3. While Loop Execution
var steps = n
while (steps-- > 0) {
    // Runs exactly n times efficiently
}

```

## Primitive Arrays & Strings

### Arrays (1D and 2D)

For DSA, prefer primitive array classes like `IntArray` over object arrays like `Array<Int>` to bypass auto-boxing overhead and save memory.

```kotlin title="Array Configurations"
val n = 5
val r = 3
val c = 4

// Initialize a 1D Primitive Integer Array of size n (Defaults to 0)
val arr = IntArray(n) 

// Initialize a 2D Grid (r rows by c columns) initialized with 0
val grid = Array(r) { IntArray(c) } 

// Fast fill utility (Useful for clearing memoization tables)
arr.fill(-1) 

```

### Strings & StringBuilder

Strings in Kotlin are immutable. For heavy manipulations, transformations, or reversals, wrap them in a `StringBuilder`.

```kotlin title="String Operations"
val s = "abc"

val ch = s[1]              // Directly index characters -> 'b'
val len = s.length         // String length -> 3
val hasChar = s.contains("b") // Substring/char lookups -> true
val sub = s.substring(0, 2) // Extracts from index 0 up to 1 -> "ab"

// Efficient modification via StringBuilder
val sb = StringBuilder(s)
sb.append("a").append(123) // Appends values directly without generating new instances

val out = sb.toString()    // Casts back to standard String -> "abca123"

```

## Java-Backed Collections Framework

```kotlin title="Core Collections Import"
// Import Java utility structures to access low-level high-performance DSA collections
import java.util.*

```

### Dynamic Lists

```kotlin title="Lists & Linked Lists"
// Mutable Arraylist: O(1) random access, amortized O(1) insertions
val list = mutableListOf<Int>() 

// Standard Doubly Linked List
val linkedList: LinkedList<Int> = LinkedList() 

list.add(10)      // Appends element to end
val element = list[0] // Quick item fetch at index 0

```

### HashMaps & HashSets

Used for immediate $O(1)$ average-time lookups and tracking frequencies.

```kotlin title="Hash Tables"
val hashMap = HashMap<String, Int>()
val hashSet = HashSet<Int>()

hashMap["key"] = 1 // Inserts key-value mapping

// Safely inserts a value only if the key does not already exist
hashMap.putIfAbsent("key", 2) 

// Fetch value safely with a fallback default value to eliminate NullPointerException
val value = hashMap.getOrDefault("missing_key", 0) 

hashSet.add(5)                   // Deduplicates and adds item
val exists = hashSet.contains(5) // Fast existence check -> true

```

### Sorted Collections (Balanced BSTs)

Backed by Red-Black trees under the hood. Provides operations in $O(\log n)$ time.

```kotlin title="Tree Maps & Sets"
val treeMap = TreeMap<Int, String>() // Keeps keys ordered in ascending order
val treeSet = TreeSet<Int>()         // Keeps items distinct and sorted ascending

treeMap[2] = "b"
treeMap[1] = "a"

val lowestKey = treeMap.firstKey()  // Fetches minimum key -> 1
val highestKey = treeMap.lastKey()  // Fetches maximum key -> 2

```

### Stacks, Queues & Double-Ended Queues (Deques)

Essential components for graph traversals like Breadth-First Search (BFS) and Depth-First Search (DFS).

```kotlin title="Linear Data Structures"
// 1. Stack (LIFO)
val stack = Stack<Int>()
stack.push(1)
val topElement = stack.peek() // Looks at top without removing
stack.pop()                  // Removes and returns top element

// 2. Queue (FIFO)
val queue: Queue<Int> = LinkedList()
queue.add(1)
val frontElement = queue.poll() // Removes and returns front element safely

// 3. Deque (Double-Ended Queue)
val deque: Deque<Int> = ArrayDeque()
deque.addFirst(1)  // Insert at front
deque.addLast(2)   // Insert at rear
deque.peekFirst()  // Inspect front
deque.pollLast()   // Evict from rear

```

### Priority Queues (Heaps)

Crucial for greedy algorithms, Huffman coding, and Dijkstra’s shortest-path algorithm.

```kotlin title="Min-Heap & Max-Heap"
// Default configuration initialization constructs a Min-Heap
val minHeap = PriorityQueue<Int>()
minHeap.add(5)
minHeap.add(1)
val small = minHeap.poll() // Returns smallest element first -> 1

// Construct a Max-Heap by passing an inversion comparator
val maxHeap = PriorityQueue<Int>(compareByDescending { it })

```

## Sorting, Searching, & Iteration

### Custom Sorting

```kotlin title="Sorting Algorithms"
val primitives = intArrayOf(3, 1, 2)
primitives.sort() // Sorts in-place in ascending order -> [1, 2, 3]

// Sorting structural matrix rows/coordinates
val intervals = mutableListOf<IntArray>()

// Sort objects based on their initial index item ascending
intervals.sortBy { it[0] } 

// Complex Multi-Criteria Sort: Sort by index 1 descending, then break ties with index 0 ascending
intervals.sortWith(compareByDescending<IntArray> { it[1] }.thenBy { it[0] })

```

### Searching

```kotlin title="Binary Search"
// Binary search requires a pre-sorted array structure. 
// Returns target position index, or a negative value if it does not exist.
val positionIndex = primitives.binarySearch(2) 

```

### Fast Traversals

```kotlin title="Iteration Patterns"
// Array Element Loop
for (element in primitives) { /* ... */ }

// Map Entry Expansion Loop
for ((key, value) in hashMap) {
    // Directly leverage destructured key and value bindings
}

// Individual Dimension Extractions
for (k in hashMap.keys) { /* Loop keys only */ }
for (v in hashMap.values) { /* Loop values only */ }

```

### Quick Math Extensions

```kotlin title="Functional Helpers"
val totalSum = primitives.sum()
val nonMutatedSorted = primitives.sortedArray() // Creates an entirely new sorted clone
val maxElement = primitives.maxOrNull()        // Returns item or null if empty container

```

## Object-Oriented Paradigm

### Data Classes & Standard Objects

```kotlin title="OOP Foundations"
// Data classes automatically provide equals(), hashCode(), and toString() configurations
data class Coordinate(val x: Int, val y: Int)

val point = Coordinate(3, 4)
val currentX = point.x // Read properties directly

interface Solver {
    fun process(): Int // Structural contract method
}

```

### Abstracts & Inheritance

```kotlin title="Abstract Implementation"
abstract class TemplateShape {
    abstract fun calculateArea(): Double
}

class RadialCircle(private val radius: Double) : TemplateShape() {
    override fun calculateArea(): Double = Math.PI * radius * radius
}

```

## Exception Handling

```kotlin title="Try-Catch-Finally Execution"
try {
    val operationalNumber = "42".toInt()
} catch (error: NumberFormatException) {
    // Logic fallback to address processing failures
} finally {
    // Guarantees execution regardless of exceptions for memory or resource tracking cleanup
}

```

---

## Common Structural Design Patterns

### Singleton Pattern

Useful for building global configuration hubs or shared graph states across execution scopes.

```kotlin title="Object Pattern"
object AlgorithmConfig {
    val moduloBase = 1_000_000_007
    fun printIdentity() = println("Global Configuration active.")
}

```

### Builder Pattern

```kotlin title="Safe Builder Realization"
class Competitor private constructor(val handle: String, val rating: Int) {
    class Builder {
        private var handle = ""
        private var rating = 0
        
        fun setHandle(h: String) = apply { this.handle = h }
        fun setRating(r: Int) = apply { this.rating = r }
        fun build() = Competitor(handle, rating)
    }
}

val profile = Competitor.Builder().setHandle("Master").setRating(2400).build()

```

## Competitive Programming Fast I/O Template

Standard `Scanner` operations use heavy regex matching, which can slow things down and cause Time Limit Exceeded (TLE) errors. This low-level `FastScanner` implementation reads byte streams directly from raw input buffers.

```kotlin title="Fast I/O Implementation"
import java.io.InputStream

private class FastScanner(private val stream: InputStream = System.`in`) {
    private val buffer = ByteArray(1 shl 16) // 64KB Buffer Window
    private var headPointer = 0
    private var bytesReadLength = 0

    private fun readNextByte(): Int {
        if (headPointer >= bytesReadLength) {
            bytesReadLength = stream.read(buffer, 0, buffer.size)
            headPointer = 0
            if (bytesReadLength <= 0) return -1
        }
        return buffer[headPointer++].toInt()
    }

    fun nextInt(): Int {
        var byteChar = readNextByte()
        while (byteChar <= 32) {
            if (byteChar == -1) return 0
            byteChar = readNextByte()
        }
        var structuralSign = 1
        if (byteChar == '-'.code) {
            structuralSign = -1
            byteChar = readNextByte()
        }
        var parsingResult = 0
        while (byteChar > 32) {
            if (byteChar < '0'.code || byteChar > '9'.code) {
                // Address unexpected character faults
                break
            }
            parsingResult = parsingResult * 10 + (byteChar - '0'.code)
            byteChar = readNextByte()
        }
        return parsingResult * structuralSign
    }
}

// Execution initialization entry point pattern
fun main() {
    val scanner = FastScanner()
    val numberOfElements = scanner.nextInt()
}

```

## References

* [Kotlin Official Language Documentation](https://kotlinlang.org/docs/)
* [Kotlin Standard Library Core API](https://kotlinlang.org/api/latest/jvm/stdlib/)
* [Kotlin Collections Paradigm Guide](https://kotlinlang.org/docs/collections-overview.html)
