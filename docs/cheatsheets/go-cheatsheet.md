---
id: go-cheatsheet
title: Go (Golang) Cheatsheet
sidebar_label: Go (Golang)
sidebar_position: 6
description: A concise Go (Golang) cheatsheet covering syntax, data types, slices, maps, structs, pointers, and DSA-relevant patterns for interview preparation.
tags: [go, golang, cheatsheet, dsa, programming]
---

# Go (Golang) Cheatsheet

A quick reference for Go syntax and patterns commonly used in Data Structures and Algorithms.

---

## Hello World

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

---

## Variables & Constants

```go
// Explicit declaration
var name string = "Algo"
var age int = 21

// Short declaration (inside functions)
score := 100
isActive := true

// Multiple variables
var x, y int = 10, 20

// Constants
const PI = 3.14159
const MaxSize = 1000
```

---

## Data Types

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer | `42` |
| `float64` | Floating point | `3.14` |
| `string` | String | `"hello"` |
| `bool` | Boolean | `true` |
| `byte` | Alias for uint8 | `'A'` |
| `rune` | Alias for int32 (Unicode) | `'✓'` |

---

## Control Flow

```go
// if-else
if x > 0 {
    fmt.Println("positive")
} else if x < 0 {
    fmt.Println("negative")
} else {
    fmt.Println("zero")
}

// for loop (only loop in Go)
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// while-style loop
n := 1
for n < 100 {
    n *= 2
}

// infinite loop
for {
    break
}

// switch
switch day {
case "Mon", "Tue", "Wed", "Thu", "Fri":
    fmt.Println("Weekday")
case "Sat", "Sun":
    fmt.Println("Weekend")
default:
    fmt.Println("Unknown")
}
```

---

## Arrays & Slices

```go
// Array (fixed size)
var arr [5]int
arr[0] = 10
nums := [3]int{1, 2, 3}

// Slice (dynamic size — used most in DSA)
s := []int{1, 2, 3, 4, 5}

// make a slice
s2 := make([]int, 5)       // len=5, cap=5
s3 := make([]int, 3, 10)   // len=3, cap=10

// append
s = append(s, 6, 7)

// slicing
sub := s[1:4]   // elements at index 1, 2, 3

// length and capacity
fmt.Println(len(s), cap(s))

// 2D slice (useful for DP)
dp := make([][]int, m)
for i := range dp {
    dp[i] = make([]int, n)
}

// iterate
for i, v := range s {
    fmt.Println(i, v)
}
```

---

## Maps

```go
// declare and initialize
m := map[string]int{
    "apple":  5,
    "banana": 3,
}

// make
freq := make(map[int]int)

// insert / update
m["cherry"] = 8

// access
val := m["apple"]

// check existence
val, ok := m["grape"]
if !ok {
    fmt.Println("key not found")
}

// delete
delete(m, "banana")

// iterate
for key, value := range m {
    fmt.Println(key, value)
}
```

---

## Strings

```go
import "strings"

s := "hello world"

strings.ToUpper(s)            // "HELLO WORLD"
strings.ToLower(s)            // "hello world"
strings.Contains(s, "world") // true
strings.HasPrefix(s, "hel")  // true
strings.HasSuffix(s, "rld")  // true
strings.Split(s, " ")        // ["hello", "world"]
strings.Join([]string{"a","b"}, "-") // "a-b"
strings.TrimSpace("  hi  ")  // "hi"
strings.Replace(s, "world", "Go", 1) // returns "hello Go" (s is immutable)

// string to []byte (useful for in-place manipulation)
b := []byte(s)
b[0] = 'H'
s2 := string(b)

// iterate over runes (i is the byte index, ch is the rune)
for i, ch := range s {
    fmt.Println(i, string(ch))
}

// string length (bytes)
len(s)
```

---

## Structs

```go
// define
type Node struct {
    Val  int
    Next *Node
}

// initialize
node := Node{Val: 10, Next: nil}
nodePtr := &Node{Val: 20}

// access fields
fmt.Println(node.Val)

// methods on struct
type Stack struct {
    items []int
}

func (s *Stack) Push(val int) {
    s.items = append(s.items, val)
}

func (s *Stack) Pop() int {
    n := len(s.items)
    val := s.items[n-1]
    s.items = s.items[:n-1]
    return val
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}
```

---

## Pointers

```go
x := 42
p := &x        // p holds the address of x
fmt.Println(*p) // dereference: prints 42
*p = 100        // modifies x through pointer
fmt.Println(x)  // 100

// new keyword
q := new(int)
*q = 55
```

---

## Functions

```go
// basic
func add(a, b int) int {
    return a + b
}

// multiple return values (common in Go)
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// variadic function
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// anonymous function / closure
square := func(n int) int {
    return n * n
}
fmt.Println(square(5))
```

---

## Sorting

```go
import "sort"

// sort ints
nums := []int{5, 2, 8, 1, 9}
sort.Ints(nums)

// sort strings
words := []string{"banana", "apple", "cherry"}
sort.Strings(words)

// custom sort (by length)
sort.Slice(words, func(i, j int) bool {
    return len(words[i]) < len(words[j])
})

// sort in descending order
sort.Sort(sort.Reverse(sort.IntSlice(nums)))

// binary search (on sorted slice)
idx := sort.SearchInts(nums, 5) // returns index
```

---

## Math Utilities

```go
import "math"

math.Abs(-5.0)         // 5.0
math.Sqrt(16.0)        // 4.0
math.Pow(2, 10)        // 1024.0
math.Max(3.0, 7.0)     // 7.0
math.Min(3.0, 7.0)     // 3.0
math.Log2(8)           // 3.0

// Max/Min for integers (no built-in, use manually)
func maxInt(a, b int) int {
    if a > b {
        return a
    }
    return b
}

// math.MaxInt and math.MinInt (Go 1.17+)
import "math"
maxVal := math.MaxInt
minVal := math.MinInt
```

---

## Common DSA Patterns

### Stack using slice

```go
stack := []int{}
stack = append(stack, 10)           // push
top := stack[len(stack)-1]          // peek
stack = stack[:len(stack)-1]        // pop
isEmpty := len(stack) == 0
```

### Queue using slice

```go
queue := []int{}
queue = append(queue, 10)           // enqueue
front := queue[0]                   // peek
queue = queue[1:]                   // dequeue
```

### Frequency map

```go
freq := make(map[int]int)
for _, v := range nums {
    freq[v]++
}
```

### Two pointers

```go
left, right := 0, len(nums)-1
for left < right {
    // process
    left++
    right--
}
```

### Binary Search template

```go
func binarySearch(nums []int, target int) int {
    left, right := 0, len(nums)-1
    for left <= right {
        mid := left + (right-left)/2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}
```

### DFS on graph

```go
func dfs(node int, visited map[int]bool, graph map[int][]int) {
    visited[node] = true
    for _, neighbor := range graph[node] {
        if !visited[neighbor] {
            dfs(neighbor, visited, graph)
        }
    }
}
```

### BFS on graph

```go
func bfs(start int, graph map[int][]int) {
    visited := make(map[int]bool)
    queue := []int{start}
    visited[start] = true
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
}
```

---

## Time Complexity Cheat Sheet

| Operation | Slice | Map | Sorted Slice |
|-----------|-------|-----|--------------|
| Access | O(1) | O(1) avg | O(1) |
| Search | O(n) | O(1) avg | O(log n) |
| Insert | O(1) amort. | O(1) avg | O(n) |
| Delete | O(n) | O(1) avg | O(n) |

---

## Useful Standard Library Packages

| Package | Use Case |
|---------|----------|
| `fmt` | Formatted I/O |
| `sort` | Sorting slices and custom types |
| `math` | Math functions |
| `strings` | String manipulation |
| `strconv` | String ↔ int/float conversion |
| `container/heap` | Priority queue / min-max heap |
| `container/list` | Doubly linked list |

---

## References

- [Official Go Documentation](https://go.dev/doc/)
- [A Tour of Go](https://go.dev/tour/)
- [Go Standard Library](https://pkg.go.dev/std)