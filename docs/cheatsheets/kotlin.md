\---

id: kotlin-cheatsheet

title: Kotlin Cheatsheet

sidebar\_label: Kotlin Cheatsheet

sidebar\_position: 2

description: "A fast, practical Kotlin reference for DSA and competitive programming."

tags: \[kotlin, cheatsheet, dsa]

\---



This page is a quick reference for Kotlin patterns that show up constantly in DSA and competitive programming. If you're just starting out, don't worry, every snippet here is explained line by line.



\## Basic Syntax



\### Data Types



```kotlin title="Basic data type syntax in Kotlin"

val a: Int = 1 // 32-bit integer

val b: Long = 1\_000\_000\_000L // 64-bit integer

val d: Double = 3.14 // 64-bit decimal

val ok: Boolean = true // true or false only

val c: Char = 'A' // Unicode character

val s: String = "hello" // Sequence of characters

```



\### Operators and Control Flow



```kotlin title="Control flow syntax in Kotlin"

// if, else if and else

if (a > 0) {

&#x20;   // ...

} else if (a == 0) {

&#x20;   // ...

} else {

&#x20;   // ...

}



for (i in 0 until n) {} // Value of i -> 0,1,2...n-1

while (n-- > 0) {} // Value of n -> n,n-1,n-2,...1

```



\### Arrays



```kotlin title="Array syntax in Kotlin"

val arr = IntArray(n) // 1D Primitive Integer Array of size n

val grid = Array(r) { IntArray(c) } // 2D Primitive Integer Array/Grid of r - rows, c - columns

arr.fill(-1) // Fills the entire array with -1 instead of 0

```



\## Strings and StringBuilder



```kotlin title="String and StringBuilder syntax in Kotlin"

val s = "abc"

val ch = s\[1] // Returns character at index 1, i.e ch = 'b'

val len = s.length // Returns length of the string s, i.e len = 3

val has = s.contains("b") // Returns true iff "b" exists in s, i.e has = true

val t = s.substring(0, 2) // t = "ab"

val sb = StringBuilder(s) // Special Class used for String Manipulation, s is the original string

sb.append("a").append(123) // abca123

val out = sb.toString() // out = "abca123"

```



\## Collections



```kotlin title="Kotlin collections import"

import java.util.\* // Has most data structures commonly used in DSA

```



\### List



```kotlin title="List syntax in Kotlin"

val a = mutableListOf<Int>() // Dynamic array, O(1) random access, best for most use cases

val b: LinkedList<Int> = LinkedList() // Doubly linked list

a.add(10) // Appends 10 to the end of the list

val x = a\[0] // Returns element at index 0, i.e x = 10

```



\### Map / Set



```kotlin title="Map and Set syntax in Kotlin"

val hm = HashMap<String, Int>() // Key-Value pairs, O(1) average get/put, unordered

val hs = HashSet<Int>() // Unique elements only, O(1) average add/contains, unordered

hm\["k"] = 1 // Maps "k" -> 1

hm.putIfAbsent("k", 2) // "k" already exists, so map remains "k" -> 1

val v = hm.getOrDefault("missing", 0) // v = 0

hs.add(5) // Adds 5 to the set

val exists = hs.contains(5) // exists = true

```



\### Ordered (TreeMap / TreeSet)



```kotlin title="TreeMap and TreeSet syntax in Kotlin"

val tm = TreeMap<Int, String>() // Sorted by key in ascending order, O(log n) get/put

val ts = TreeSet<Int>() // Unique elements, sorted ascending, O(log n) add/contains

tm\[2] = "b" // tm = {2 -> "b"}

tm\[1] = "a" // tm = {1 -> "a", 2 -> "b"}

val firstKey = tm.firstKey() // Returns the smallest key, i.e firstKey = 1

```



\### Stack / Queue / Deque



```kotlin title="Stack Queue and Deque syntax in Kotlin"

val stack = Stack<Int>() // LIFO — Last In First Out

stack.push(1) // stack = \[1]

val top = stack.peek() // Returns top without removing, i.e top = 1

stack.pop() // Removes top, stack = \[]

val q: Queue<Int> = LinkedList() // FIFO — First In First Out

q.add(1) // q = \[1]

q.poll() // Removes and returns front element, q = \[]

val dq: Deque<Int> = ArrayDeque() // Double-ended queue

dq.addFirst(1) // dq = \[1]

dq.addLast(2) // dq = \[1, 2]

dq.addFirst(0) // dq = \[0, 1, 2]

val front = dq.peekFirst() // front = 0

val back = dq.peekLast() // back = 2

dq.pollFirst() // dq = \[1, 2]

dq.pollLast() // dq = \[1]

```



\### PriorityQueue/Heap



\#### Default -> Min-Heap



```kotlin title="PriorityQueue or Heap syntax in Kotlin"

val pq = PriorityQueue<Int>() // Min-heap: smallest element always at front

pq.add(5) // pq = \[5]

pq.add(1) // pq = \[1, 5]

val min = pq.poll() // Removes and returns smallest, i.e min = 1

// Max-heap:

val maxpq = PriorityQueue<Int>(compareByDescending { it }) // Largest element at front

```



\## Common Operations



\### Sorting



```kotlin title="Sorting syntax in Kotlin"

val arr = intArrayOf(3, 1, 2)

arr.sort() // arr = \[1, 2, 3], in-place ascending sort

val pairs = mutableListOf<IntArray>()

pairs.sortBy { it\[0] } // Sort pairs by first element ascending

// Sort by second element desc, then first element asc

pairs.sortWith(compareByDescending<IntArray> { it\[1] }

&#x20;   .thenBy { it\[0] })

```



\### Searching



```kotlin title="Binary search syntax in Kotlin"

val idx = arr.binarySearch(target) // Returns index of target in sorted array, negative if not found

```



\### Iterating



```kotlin title="Iteration syntax in Kotlin"

for (x in arr) {} // Enhanced for-loop over array elements

// Method 1: Iterate over key-value pairs

for ((k, v) in hm) {

&#x20;   // use k and v

}

// Method 2: Iterate over keys only

for (k in hm.keys) {

&#x20;   // use k

}

// Method 3: Iterate over values only

for (v in hm.values) {

&#x20;   // use v

}

```



\### Collection Operations (Quick Patterns)



```kotlin title="Collection syntax in Kotlin"

val sum = arr.sum() // Returns sum of all elements in arr

val sorted = arr.sortedArray() // Returns a new sorted array, original unchanged

val max = arr.maxOrNull() // Largest element or null if empty

val min = arr.minOrNull() // Smallest element or null if empty

```



\## OOP (Object Oriented Programming)



\### Classes and Interfaces



```kotlin title="Class and interface syntax in Kotlin"

class Point(val x: Int, val y: Int)

val p = Point(3, 4)

val px = p.x // Access property directly, i.e px = 3

interface Solver {

&#x20;   fun solve(): Int // Any class implementing Solver must define solve()

}

```



\### Inheritance and Abstract Classes



```kotlin title="Inheritance and abstract class syntax in Kotlin"

abstract class Shape {

&#x20;   abstract fun area(): Double

}

class Circle(private val r: Double) : Shape() {

&#x20;   override fun area(): Double = Math.PI \* r \* r

}

val c = Circle(5.0)

val a = c.area() // a = 78.53...

```



\### Enums



```kotlin title="Enum syntax in Kotlin"

enum class Dir {

&#x20;   UP, DOWN, LEFT, RIGHT

}

val d = Dir.UP

```



\## Exception Handling



```kotlin title="Exception handling syntax in Kotlin"

try {

&#x20;   val x = "42".toInt()

} catch (e: NumberFormatException) {

&#x20;   // handle

} finally {

&#x20;   // Always executes regardless of exception — used for cleanup

}

```



\### Custom Exceptions



```kotlin title="Custom exception syntax in Kotlin"

class BadInputException(message: String) : RuntimeException(message)

throw BadInputException("Invalid input")

```



\## Common Class Design Patterns



\### Singleton



```kotlin title="Singleton pattern in Kotlin"

object Singleton {

&#x20;   fun hello() {}

}

Singleton.hello()

```



\### Builder



```kotlin title="Builder pattern in Kotlin"

class User private constructor(

&#x20;   val name: String,

&#x20;   val age: Int

) {

&#x20;   class Builder {

&#x20;       private var name = ""

&#x20;       private var age = 0

&#x20;       fun name(n: String) = apply { name = n }

&#x20;       fun age(a: Int) = apply { age = a }

&#x20;       fun build() = User(name, age)

&#x20;   }

}

val u = User.Builder()

&#x20;   .name("Harish")

&#x20;   .age(20)

&#x20;   .build()

val name = u.name // name = "Harish"

```



\### Factory



```kotlin title="Factory pattern in Kotlin"

interface Shape {

&#x20;   fun area(): Double

}

class Square(private val s: Double) : Shape {

&#x20;   override fun area() = s \* s

}

class Circle2(private val r: Double) : Shape {

&#x20;   override fun area() = Math.PI \* r \* r

}

object ShapeFactory {

&#x20;   fun square(s: Double): Shape = Square(s)

&#x20;   fun circle(r: Double): Shape = Circle2(r)

}

val sq = ShapeFactory.square(4.0)

val area = sq.area() // area = 16.0

```



\## Competitive Programming Fast I/O



```kotlin title="Fast input syntax in Kotlin"

private class FastScanner {

&#x20;   private val br = System.`in`

&#x20;   private val buffer = ByteArray(1 shl 16)

&#x20;   private var len = 0

&#x20;   private var ptr = 0

&#x20;   private fun readByte(): Int {

&#x20;       if (ptr >= len) {

&#x20;           len = br.read(buffer)

&#x20;           ptr = 0

&#x20;           if (len <= 0) return -1

&#x20;       }

&#x20;       return buffer\[ptr++].toInt()

&#x20;   }

&#x20;   fun nextInt(): Int {

&#x20;       var c = readByte()

&#x20;       while (c <= 32) c = readByte()

&#x20;       var sign = 1

&#x20;       if (c == '-'.code) {

&#x20;           sign = -1

&#x20;           c = readByte()

&#x20;       }

&#x20;       var res = 0

&#x20;       while (c > 32) {

&#x20;           res = res \* 10 + c - '0'.code

&#x20;           c = readByte()

&#x20;       }

&#x20;       return res \* sign

&#x20;   }

}

val fs = FastScanner()

val n = fs.nextInt()

```



\## References



\* Kotlin Official Documentation: https://kotlinlang.org/docs/

\* Kotlin Standard Library API: https://kotlinlang.org/api/latest/jvm/stdlib/

\* Kotlin Collections Overview: https://kotlinlang.org/docs/collections-overview.html

